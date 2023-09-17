import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { GLView } from 'expo-gl';
import { Audio } from 'expo-av';
import io from 'socket.io-client';

const warningWAV = require('../../assets/sounds/warning.wav');

const Process = () => {
    const [socket, setSocket] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [warningSound, setWarningSound] = useState(false);
    const [result, setResult] = useState({ left_eye: '', right_eye: '' });
    const [data, setData] = useState({
        time: '',
        count: '',
        cycle: '',
        timer: '',
        warning_check: '',
    });
    const cameraRef = useRef(null);
    const audioRef = useRef(new Audio.Sound());

    useEffect(() => {
        const initializeSocket = async () => {
            const socket = io('http://127.0.0.1:5000');
            setSocket(socket);

            socket.on('result', (result) => {
                setResult(result);
            });

            socket.on('data', (data) => {
                setData(data);
            });

            socket.on('warningSound', () => {
                setWarningSound(true);
            });

            return () => {
                socket.disconnect();
            };
        };

        initializeSocket();
    }, []);

    useEffect(() => {
        if (warningSound) {
            (async () => {
                await audioRef.current.loadAsync(warningWAV);
                await audioRef.current.playAsync();
                setWarningSound(false);
            })();
        }
    }, [warningSound]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const startVideoStream = async () => {
        if (hasCameraPermission) {
            cameraRef.current.resumePreview();
        }
    };

    const stopVideoStream = () => {
        if (hasCameraPermission) {
            cameraRef.current.pausePreview();
            socket.emit('datasave');
            socket.disconnect();
        }
    };

    const captureAndSendFrame = async () => {
        if (hasCameraPermission && cameraRef.current) {
            try {
                const options = {
                    quality: 1,
                    format: 'jpeg',
                };
                const data = await cameraRef.current.takePictureAsync(options);
                const imageData = data.uri;

                // 이미지 데이터를 URL에 포함시켜 GET 요청을 보냅니다.
                const response = await fetch(`http://127.0.0.1:5000/message?frame=${encodeURIComponent(imageData)}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    console.log('프레임 전송 성공');
                } else {
                    console.error('프레임 전송 실패');
                }
            } catch (error) {
                console.error('프레임 캡처 및 전송 중 오류:', error);
            }
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>React Native Camera Streaming</Text>
            <View style={{ flex: 1, width: '100%' }}>
                {hasCameraPermission ? (
                    <Camera style={{ flex: 1, width: '100%' }} type={cameraType} ref={cameraRef} />
                ) : (
                    <Text>Camera permission not granted</Text>
                )}
            </View>
            <Button title="Start Camera" onPress={startVideoStream} disabled={!hasCameraPermission} />
            <Button title="Stop Camera" onPress={stopVideoStream} disabled={!hasCameraPermission} />
            <Button
                title="Switch Camera"
                onPress={() =>
                    setCameraType(
                        cameraType === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    )
                }
                disabled={!hasCameraPermission}
            />
            <Button title="Play Warning Sound" onPress={() => setWarningSound(true)} />
            <Button title="Send Frame to Server" onPress={captureAndSendFrame} />
            <Text>Result:</Text>
            <Text>Left Eye: {result.left_eye}</Text>
            <Text>Right Eye: {result.right_eye}</Text>
            <Text>Current time: {data.time}</Text>
            <Text>Current count: {data.count}</Text>
            <Text>Current cycle: {data.cycle}</Text>
            <Text>Current timer: {data.timer}</Text>
            <Text>Current warning_check: {data.warning_check}</Text>
        </View>
    );
};

export default Process;
