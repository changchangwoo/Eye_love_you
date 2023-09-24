import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import warningWAV from '../sounds/warning.wav';
import resumeWAV from '../sounds/resume.wav';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Process() {
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [result, setResult] = useState({ left_eye: '', right_eye: '' });
    const [data, setData] = useState({ time: '', count: '', cycle: '', timer: '', warning_check: '' });
    const videoElement = useRef(null);
    const frameCaptureInterval = useRef(null);
    const audioRef_warning = useRef(null);
    const audioRef_resume = useRef(null);
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
                play_warningsound();
                console.log(warningSound)
            })

            s.on('status', (status) => {
                console.log(status.status)
                if (status.status === 1) { // 정상 동작
                    document.querySelector(".Status_text").textContent = "현재 프로그램이 정상적으로 동작하고 있어요"
                    document.querySelector(".Status_text").style.color = "green";
                } else if (status.status === 2) { // 얼굴 인식
                    document.querySelector(".Status_text").textContent = "현재 얼굴이 인식 되어지지 않고 있어요"
                    document.querySelector(".Status_text").style.color = "red";
                    play_resumesound();
                } else if (status.status === 3) { // 눈 감은거 인식
                    document.querySelector(".Status_text").textContent = "장시간 눈의 인식이 되어지지 않고 있어요"
                    document.querySelector(".Status_text").style.color = "red";
                    play_resumesound();
                }
            })
            return () => {
                s.disconnect();
            };
        } else {
            navigate("/login");
            alert('로그인이 필요한 서비스입니다.');
        }
    }, [navigate]);

    const play_warningsound = async () => {
        audioRef_warning.current.play();
        document.querySelector('.WebBlink_Logo').style.transition = 'background-color 0.5s ease';
        document.querySelector('.WebBlink_Logo').style.backgroundColor = '#F15F5F';
        setTimeout(() => {
            document.querySelector('.WebBlink_Logo').style.backgroundColor = '#FBE3F0';
        }, 500);
    }

    const play_resumesound = async () => {
        audioRef_resume.current.play();
        document.querySelector('.WebBlink_Logo').style.transition = 'background-color 0.5s ease';
        document.querySelector('.WebBlink_Logo').style.backgroundColor = '#2F2E41';
        setTimeout(() => {
            document.querySelector('.WebBlink_Logo').style.backgroundColor = '#FBE3F0';
        }, 500);
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
            }, 300);
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
                    <Button variant="primary" onClick={startVideoStream}>프로그램 시작</Button>
                    <Button variant="danger" onClick={stopVideoStream}>프로그램 종료</Button>
                </div>
                <div className='Status_text'> 상태값 입력 테스트</div>
                <div className='WebBlink_Box'>
                    <div className='WebBlink_Box_Left'>
                        <video ref={videoElement} autoPlay
                            style={{
                                width: '100%', height: '100%',
                                padding: 30,
                                borderRadius: 50
                            }}
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
                            <audio ref={audioRef_warning} src={warningWAV} />
                            <audio ref={audioRef_resume} src={resumeWAV} />
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