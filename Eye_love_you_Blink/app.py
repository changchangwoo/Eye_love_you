from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import cv2
import dlib
import numpy as np
from imutils import face_utils
from keras.models import load_model
import base64
import datetime

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

IMG_SIZE = (34, 26)

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

model = load_model('models/2018_12_17_22_58_35.h5')
model.summary()

def crop_eye(img, eye_points):
    x1, y1 = np.amin(eye_points, axis=0)
    x2, y2 = np.amax(eye_points, axis=0)
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2

    w = (x2 - x1) * 1.2
    h = w * IMG_SIZE[1] / IMG_SIZE[0]

    margin_x, margin_y = w / 2, h / 2

    min_x, min_y = int(cx - margin_x), int(cy - margin_y)
    max_x, max_y = int(cx + margin_x), int(cy + margin_y)

    eye_rect = np.rint([min_x, min_y, max_x, max_y]).astype(np.int)

    eye_img = img[eye_rect[1]:eye_rect[3], eye_rect[0]:eye_rect[2]]

    return eye_img, eye_rect

# 웹 소켓 연결 확인 핸들러
@socketio.on('connect')
def handle_connect():
    print('Client connected')

# 메시지 수신 종료, 데이터베이스에 데이터 저장
@socketio.on('datasave')
def handle_connect():
    ## 소켓에서 아이디 입력받아가지고 그거 전송하는 코드 작성하면 되겠다
    print(count, count_flag, delay_flag, cycle_timer, delay_timer, close_check, timer, check, warning_check)



# 웹 소켓 연결 종료 확인 핸들러
@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


# 웹 소켓 메시지 수신 이벤트 핸들러
@socketio.on('message')
def handle_message(image_data):
    # 이미지 데이터 디코드
    global count, count_flag, delay_flag, cycle_timer, delay_timer, close_check, timer, check, warning_check
    img_data = image_data.split(",")[1]
    img_bytes = base64.b64decode(img_data)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print(img)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    for face in faces:
        shapes = predictor(gray, face)
        shapes = face_utils.shape_to_np(shapes)

        eye_img_l, eye_rect_l = crop_eye(gray, eye_points=shapes[36:42])
        eye_img_r, eye_rect_r = crop_eye(gray, eye_points=shapes[42:48])

        eye_img_l = cv2.resize(eye_img_l, dsize=IMG_SIZE)
        eye_img_r = cv2.resize(eye_img_r, dsize=IMG_SIZE)
        eye_img_r = cv2.flip(eye_img_r, flipCode=1)

        eye_input_l = eye_img_l.copy().reshape((1, IMG_SIZE[1], IMG_SIZE[0], 1)).astype(np.float32) / 255.
        eye_input_r = eye_img_r.copy().reshape((1, IMG_SIZE[1], IMG_SIZE[0], 1)).astype(np.float32) / 255.

        pred_l = model.predict(eye_input_l)
        pred_r = model.predict(eye_input_r)

        # 눈 깜박임 상태 확인
        blink_l = 'O %.1f' if pred_l > 0.1 else '- %.1f'
        blink_r = 'O %.1f' if pred_r > 0.1 else '- %.1f'

        blink_l = blink_l % pred_l
        blink_r = blink_r % pred_r

        # blink_detect
        if close_flag == 0: # 눈이 연속적으로 감겨져 있는것을 식별
            if blink_l == '- 0.0' and blink_r == '- 0.0':  # 눈을 깜박이는 경우
                check = 0
                if count_flag == 0 and delay_flag == 0:
                    count = count + 1
                    cycle.append(cycle_timer)
                    cycle_timer = 0
                    delay_flag = 1
                count_flag == 1

            if delay_flag == 1:
                delay_timer = delay_timer + 1
                if delay_timer == 10:
                    delay_flag = 0
                    delay_timer = 0

            if blink_l == '0 1.0' or blink_r == '0 1.0':
                count_flag = 0

            if blink_l == '- 0.0' or blink_r == '- 0.0':
                close_check = close_check + 1.2
            else:
                close_check = 0

            # timer, check = 10 == 1sec
            timer = timer + 1.2
            check = check + 1.2
            cycle_timer = cycle_timer + 1.2

            if check >= 50:
                emit('warningSound', True)
                check = 0
                warning_check = warning_check + 1

        emit('result', {
            'left_eye': blink_l,
            'right_eye': blink_r
        })

        emit('data', {'time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                      'count' : count,
                      'cycle' : cycle,
                      'timer' : timer,
                      'warning_check' : warning_check
                      })
        print(check)

if __name__ == '__main__':
    global timer, check, close_check, close_flag, count_flag, count, delay_flag, delay_timer, warning_check, cycle_timer, cycle, text_count, text_warning, t_timer, text_timer
    timer = 0
    check = 0
    close_check = 0
    close_flag = 0
    count_flag = 0
    count = 0
    delay_flag = 0
    delay_timer = 0
    warning_check = 0
    cycle_timer = 0
    cycle = []
    text_count = ''
    text_warning = ''
    t_timer = ''
    text_timer = ''

    socketio.run(app, port=5000)
    # socketio.run(app, port=5000, allow_unsafe_werkzeu g=True)