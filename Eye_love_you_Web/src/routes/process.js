import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Button } from 'react-bootstrap';

function Process() {
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [result, setResult] = useState({ leftEye: '', rightEye: '' });
    const [data, setData] = useState({ time: '', count: '', cycle: '', timer: '', warning_check: '' });
    const videoElement = useRef(null);
    const frameCaptureInterval = useRef(null);

    useEffect(() => {
        const s = io('http://localhost:5000');
        setSocket(s);

        s.on('result', (result) => {
            setResult(result);
        });

        s.on('data', (data) => {
            setData(data);
        });

        return () => {
            s.disconnect();
        };
    }, []);

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
                    socket.emit('message', imageData);
                } catch (error) {
                    console.error('Error capturing frame: ', error);
                }
            }, 100);
        }
    };

    const stopVideoStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
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
                        <div>Left Eye: {result.leftEye}</div>
                        <div>Right Eye: {result.rightEye}</div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Process;
