import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import io from 'socket.io-client';

const warningWAV = require('../../assets/sounds/warning.wav');

const Process = () => {
    const [socket, setSocket] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraType] = useState(Camera.Constants.Type.back);
    const [warningSound, setWarningSound] = useState(false);
    const [result, setResult] = useState({ left_eye: '', right_eye: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 활성화 여부
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
            const socket = io('http://192.168.25.33:5000');
            setSocket(socket);

            socket.on('result', (result) => {
                setResult(result);
            });
            socket.on('data', (data) => {
                setData(data);
            });

            socket.on('warningSound', () => {
                setWarningSound(true);
                console.log(warningSound)
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
                console.log('으하하' + warningSound)
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

    const convertImageToBase64 = async (imageUri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function (error) {
                reject(error);
            };
            xhr.responseType = 'blob';
            xhr.open('GET', imageUri, true);
            xhr.send(null);
        });
    };
    const captureAndSendFrame = async () => {
        if (hasCameraPermission && cameraRef.current && socket) {
            try {
                const options = {
                    quality: 1,
                    format: 'jpeg',
                };
                const data = await cameraRef.current.takePictureAsync(options);
                const imageData = data.uri;

                // 이미지 데이터를 Base64 문자열로 변환
                const base64Data = await convertImageToBase64(imageData);

                // 소켓을 통해 서버로 이미지 데이터 전송
                socket.emit('message', base64Data);
                console.log('hello')
            } catch (error) {
                console.error('프레임 캡처 및 전송 중 오류:', error);
            }
        }
    };

    const startRepeatedFunction = () => {
        setIsButtonDisabled(true); // 버튼 비활성화
        const interval = setInterval(() => {
            captureAndSendFrame();
        }, 300); // .3초 간격으로 실행
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
            <Button title="감지 기능 시작" onPress={startRepeatedFunction} disabled={isButtonDisabled} />
            <Text>Result:</Text>
            <Text>Left Eye: {result.left_eye}</Text>
            <Text>Right Eye: {result.right_eye}</Text>
            <Text>Current time: {data.time}</Text>
            <Text>Current count: {data.count}</Text>
            <Text>Current timer: {data.timer}</Text>
            <Text>Current warning_check: {data.warning_check}</Text>
        </View>
    );
};

export default Process;