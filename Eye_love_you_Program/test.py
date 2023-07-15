import cv2, dlib
import numpy as np
import winsound
import pymysql
from imutils import face_utils
from keras.models import load_model
import sys


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

    eye_img = gray[eye_rect[1]:eye_rect[3], eye_rect[0]:eye_rect[2]]

    return eye_img, eye_rect

def db_process(timer, count, warning_check, cycle):
    cycle_avg = sum(cycle)/len(cycle)
    userid = sys.argv[1]
    timer = timer/10
    cycle_avg = cycle_avg/10
    # 21.139.5.188
    conn = pymysql.connect(host='localhost', user='root', password='1234!', db='eyeloveyoudb', charset='utf8')
    insert_query = "INSERT INTO usereyeinfo VALUES (%s, %s, %s, %s, %s)"
    update_query = "UPDATE usereyeinfo SET total_operating_time = %s, total_blink_times = %s, warning_count = %s, warning_count = %s WHERE user_id = %s"
    check_query = "SELECT * FROM usereyeinfo WHERE user_id=%s"

    try:
        with conn.cursor() as cursor:
            cursor = conn.cursor()
            cursor.execute(check_query, (userid))
            result = cursor.fetchone()

            if result:
                cursor.execute(update_query, (timer, count, warning_check, cycle_avg, userid))
            else:
                cursor.execute(insert_query, (userid, timer, count, warning_check, cycle_avg))

    finally:
        conn.commit()
        conn.close()


# main

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
state_l = '0 1.0'
state_r = '0 1.0'
text_count = ''
text_warning = ''
t_timer = ''
text_timer = ''

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FPS, 30)

while cap.isOpened():
    ret, img_ori = cap.read()

    if not ret:
        break

    img_ori = cv2.resize(img_ori, dsize=(0, 0), fx=1, fy=1)

    img = img_ori.copy()
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
        # visualize
        state_l = 'O %.1f' if pred_l > 0.1 else '- %.1f'
        pred_r = model.predict(eye_input_r)

        state_r = 'O %.1f' if pred_r > 0.1 else '- %.1f'

        state_l = state_l % pred_l
        state_r = state_r % pred_r

        cv2.rectangle(img, pt1=tuple(eye_rect_l[0:2]), pt2=tuple(eye_rect_l[2:4]), color=(255, 255, 255), thickness=2)
        cv2.rectangle(img, pt1=tuple(eye_rect_r[0:2]), pt2=tuple(eye_rect_r[2:4]), color=(255, 255, 255), thickness=2)

        cv2.putText(img, state_l, tuple(eye_rect_l[0:2]), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        cv2.putText(img, state_r, tuple(eye_rect_r[0:2]), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        text_count = f"count : {count}"
        text_warning = f"warning : {warning_check}"
        t_timer = int(timer)/10
        text_timer = f"time : {t_timer}"

    if close_flag == 0 :
        cv2.putText(img, text_timer, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (243, 97, 166), 3)
        cv2.putText(img, text_count, (20,80), cv2.FONT_HERSHEY_SIMPLEX, 1, (243, 97, 166), 3)
        cv2.putText(img, text_warning, (20,120), cv2.FONT_HERSHEY_SIMPLEX, 1, (243, 97, 166), 3)
        cv2.putText(img, "quit press 'Q'", (20,460), cv2.FONT_HERSHEY_SIMPLEX, 1, (243, 97, 166), 3)

    if close_flag == 1 :
        cv2.putText(img, "Long-time eye closing detection", (60,200), cv2.FONT_HERSHEY_SIMPLEX, 1, (243, 97, 166), 3)
        cv2.putText(img, "resume press 'R'", (150, 250), cv2.FONT_HERSHEY_SIMPLEX, 1, (243, 97, 166), 3)

    # blink_detect
    if close_flag == 0 :
        if state_l == '0 1.0' or state_r == '- 0.0':
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

        if state_l == '0 1.0' or state_r == '0 1.0':
            count_flag = 0

        if state_l == '- 0.0' or state_r == '- 0.0':
            close_check = close_check + 1.2
        else :
            close_check = 0

        # timer, check = 10 == 1sec
        timer = timer + 1.2
        check = check + 1.2
        cycle_timer = cycle_timer + 1.2

        if check >= 50:
            winsound.PlaySound(r"beep-7.wav", winsound.SND_FILENAME)
            check = 0
            warning_check = warning_check + 1

        if close_check >= 50:
            winsound.PlaySound(r"beep-6.wav", winsound.SND_FILENAME)
            close_flag = 1

    if close_flag == 1 :
        if cv2.waitKey(1) == ord('r'):
            count = count-4
            close_check = 0
            close_flag = 0


    # print('회원 아이디', sys.argv[1])
    # print('총 작동 시간', timer)
    # print('눈 깜박임 횟수 : ', count)
    # print('눈 깜박임 주기 리스트 : ', cycle)
    # print('경고음 송출 횟수 값 : ', warning_check)

    cv2.imshow('i_love_you_prototype', img)

    if cv2.waitKey(1) == ord('q'):
        db_process(timer, count, warning_check, cycle)
        break
