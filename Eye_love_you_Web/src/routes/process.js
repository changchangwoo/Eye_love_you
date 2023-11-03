import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import warningWAV from '../sounds/warning.wav';
import resumeWAV from '../sounds/resume.wav';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import notify_img from '../imgs/notify_il.png';
import hip_img from '../imgs/hip_smile.png';



function Process() {
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [username, setUsername] = useState(null);
    const [result, setResult] = useState({ left_eye: '', right_eye: '' });
    const [data, setData] = useState({ time: '', count: '', cycle: '', timer: '', warning_check: '' });
    const videoElement = useRef(null);
    const frameCaptureInterval = useRef(null);
    const audioRef_warning = useRef(null);
    const audioRef_resume = useRef(null);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(true);
    const [isResultModal, setResultModal] = useState(false);
    const [pauseCheck, setPausecheck] = useState(true);

    useEffect(() => {
        const sessionData = sessionStorage.getItem('userinfo');
        const nameData = sessionStorage.getItem('username');
        if (sessionData) {
            const s = io('127.0.0.1:5000');
            setSocket(s);
            setSessionData(sessionData);
            const update_username = nameData.replace(/"/g, '');
            setUsername(update_username);

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
                    document.querySelector(".Status_text").style.color = "blue";
                    play_resumesound();
                    s.emit('pause');
                    setPausecheck(false)
                } else if (status.status === 3) { // 눈 감은거 인식
                    document.querySelector(".Status_text").textContent = "장시간 눈의 인식이 되어지지 않고 있어요"
                    document.querySelector(".Status_text").style.color = "red";
                    play_resumesound();
                    s.emit('pause');
                    setPausecheck(false)
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

    const resultpage = () => {
        navigate("/result");
    };

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
        setModalOpen(false);

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
            setResultModal(true)
        }
    };

    const pauseVideoStream = () => {
        if (stream) {
            socket.emit('pause');
            setPausecheck(false)
        }
    }

    const resumeVideoStream = () => {
        if (stream) {
            socket.emit('resume');
            setPausecheck(true)
        }
    }

    return (
        <div className="WebBlinkContents">
            <div>
                {isModalOpen && (
                    <div className='modal_container'>
                        <div className="warning_modal">
                            <div className="modal_content">
                                <h2>잠깐!!</h2>
                                <h3>웹 눈 깜박임 감지 기능의 사용은 다음을 유의해주세요</h3>
                                <div className='modal_line'></div>
                                <div className='modal_detail'>
                                    <div className='modal_left'>
                                        <br />
                                        카메라 디바이스와 <br />오디오 출력장치의 연결을 확인하세요
                                        <br />
                                        <br />
                                        프로그램이 동작하면,
                                        <br />
                                        카메라에 얼굴이 전부 인식되도록 확인하세요
                                        <br />
                                        <br />
                                        정확한 데이터 측정을 위해서
                                        <br />
                                        미사용시 정지버튼을 클릭해주세요

                                    </div>
                                    <div className='modal_right'>
                                        <img className='modal_img' src={notify_img} alt="" />
                                    </div>

                                </div>
                            </div>
                            <Button variant="light" className='Modal_start_Button' onClick={startVideoStream}>시작하기</Button>
                        </div>
                    </div>
                )}
                {isResultModal && (
                    <div className='modal_container'>
                        <div className="warning_modal">
                            <div className="modal_content">
                                <h2>눈 깜박임 감지 종료</h2>
                                <div className='modal_line'></div>
                                <br></br>
                                <br></br>
                                <h3>{username} 님의 눈 깜박임 감지 동작이 정상적으로 끝났어요<br />
                                    결과창으로 이동해 시각화 자료와 함께 확인하세요
                                </h3>
                                <img className='result_icon' src={hip_img} alt="" />

                            </div>
                            <Button variant="light" className='Modal_end_Button' onClick={resultpage}>결과창 이동</Button>

                        </div>
                    </div>
                )}
            </div>
            <div className='WebBlink_Logo'>
                <div className='WebBlink_Text_main Text_Medium'>
                    눈 깜박임 감지 <br /><br />
                </div>
                <div className='Status_text'> 프로그램 현재 상태</div>

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
                            {pauseCheck ? (
                                <Button variant="light" className='pause_Button' onClick={pauseVideoStream}>일시 정지</Button>
                            ) : (
                                <Button variant="light" className='resume_Button' onClick={resumeVideoStream}>감지 재개</Button>
                            )}
                            <Button variant="light" className='stop_Button' onClick={stopVideoStream}>감지 종료</Button>
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