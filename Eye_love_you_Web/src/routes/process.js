import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import warningWAV from '../sounds/warning.wav';
import { Button } from 'react-bootstrap';

function Process() {
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [warningSound, setWarning_Sound] = useState(false)
    const [result, setResult] = useState({ left_eye: '', right_eye: '' });
    const [data, setData] = useState({ time: '', count: '', cycle: '', timer: '', warning_check: '' });
    const videoElement = useRef(null);
    const frameCaptureInterval = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const s = io('127.0.0.1:5000');
        setSocket(s);

        s.on('result', (result) => {
            setResult(result);
        });

        s.on('data', (data) => {
            setData(data);
        });

        s.on('warningSound', (warningSound) => {
            setWarning_Sound(warningSound)
            console.log(warningSound)
        })

        return () => {
            s.disconnect();
        };
    }, []);

    useEffect(() => {
        if (warningSound) {
            audioRef.current.play();
            setWarning_Sound(false)
        }
    }, [warningSound]);

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
            socket.emit('datasave')
            socket.disconnect();
            clearInterval(frameCaptureInterval.current);
        }
    };

    return (
        <div className="container">
            <h1>WebRTC Camera Streaming</h1>
            <div className="row">
                <div className="col-md-6">
                    <video ref={videoElement} autoPlay />
                    <div className="result-container">
                        <h4>Result:</h4>
                        <p>Left Eye: {result.left_eye}</p>
                        <p>Right Eye: {result.right_eye}</p>
                    </div>
                    <Button variant="primary" onClick={startVideoStream}>Start Camera</Button>
                    <Button variant="danger" onClick={stopVideoStream}>Stop Camera</Button>
                </div>
                <div className="col-md-6">
                    <div className="info-container">
                        <p>Current time: {data.time}</p>
                        <p>Current count: {data.count}</p>
                        <p>Current cycle: {data.cycle}</p>
                        <p>Current timer: {data.timer}</p>
                        <p>Current warning_check: {data.warning_check}</p>
                        <audio ref={audioRef} src={warningWAV} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Process;
