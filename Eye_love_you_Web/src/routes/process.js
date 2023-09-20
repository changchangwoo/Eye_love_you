import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import warningWAV from '../sounds/warning.wav';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Process() {
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [warningSound, setWarningSound] = useState(false)
    const [result, setResult] = useState({ left_eye: '', right_eye: '' });
    const [data, setData] = useState({ time: '', count: '', cycle: '', timer: '', warning_check: '' });
    const videoElement = useRef(null);
    const frameCaptureInterval = useRef(null);
    const audioRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        const sessionData = sessionStorage.getItem('userinfo');
        if (sessionData) {
            const s = io('127.0.0.1:5000');
            setSocket(s);
            setSessionData(sessionData);

            s.on('result', (result) => {
                setResult(result);
            });

            s.on('data', (data) => {
                setData(data);
            });

            s.on('warningSound', (warningSound) => {
                setWarningSound(warningSound)
                playsound();
                console.log(warningSound)
            })
            return () => {
                s.disconnect();
            };
        } else {
            navigate("/login");
        }
    }, []);

    const playsound = async () => {
        audioRef.current.play();
        document.querySelector('.WebBlink_Logo').style.transition = 'background-color 0.5s ease';
        document.querySelector('.WebBlink_Logo').style.backgroundColor = '#F15F5F';
        setTimeout(() => {
            document.querySelector('.WebBlink_Logo').style.backgroundColor = '#FBE3F0';
        }, 500);
        console.log('동작이 됩니다...')

        setWarningSound(false)
    }

    const startVideoStream = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.current.srcObject = mediaStream;
            setStream(mediaStream);
            const videoTrack = mediaStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(videoTrack);

            frameCaptureInterval.current = setInterval(async () => {
                try {
                    const imageBitmap = await imageCapture.grabFrame();
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = imageBitmap.width;
                    canvas.height = imageBitmap.height;
                    context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
                    const imageData = canvas.toDataURL('image/jpeg');
                    if (socket) {
                        socket.emit('message', imageData);
                    } else {
                        console.error('Socket is not connected.');
                    }
                } catch (error) {
                    console.error('Error capturing frame: ', error);
                }
            }, 200);
        }
    };

    const stopVideoStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            console.log(sessionData)
            socket.emit('datasave', sessionData)
            socket.disconnect();
            clearInterval(frameCaptureInterval.current);
        }
    };

    return (
        <div className="WebBlinkContents">
            <div className='WebBlink_Logo'>
                <div className='WebBlink_Text_main Text_Medium'>
                    눈 깜박임 감지
                </div>
                <div className='Logo_Text_sub Text_Large'>
                    기능 테스트 페이지
                    <br />
                    <Button variant="primary" onClick={startVideoStream}>카메라 시작</Button>
                    <Button variant="danger" onClick={stopVideoStream}>카메라 종료</Button>
                </div>
                <div className='WebBlink_Box'>
                    <div className='WebBlink_Box_Left'>
                        <video ref={videoElement} autoPlay
                            style={{
                                width: '100%', height: '100%',
                                padding: 30,
                                borderRadius: 50
                            }} // 비디오 엘리먼트의 크기를 100%로 설정
                        />
                    </div>
                    <div className='WebBlink_Box_Right'>
                        <div className="info-container">
                            <br />
                            <br />
                            <p>좌측 눈 : {result.left_eye}</p>
                            <p>우측 눈: {result.right_eye}</p>
                            <br />
                            <br />
                            <p>실시간 확인 : {data.time}</p>
                            <p>눈 깜박임 횟수: {data.count}</p>
                            <p>동작 시간: {data.timer}</p>
                            <p>경고음 출력횟수: {data.warning_check}</p>
                            <audio ref={audioRef} src={warningWAV} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="result-container">
                    </div>
                </div>
                <div className="col-md-6">

                </div>
            </div>
        </div >
    );
};
export default Process;