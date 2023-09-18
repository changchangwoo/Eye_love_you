import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import io from 'socket.io-client';

const warningWAV = require('../../assets/sounds/warning.wav');

const Process = () => {
    const [socket, setSocket] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraType] = useState(Camera.Constants.Type.front); // 항상 셀카 모드로 설정
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
                console.log(result)
            });

            socket.on('data', (data) => {
                setData(data);
                console.log(data)
            });

            socket.on('warningSound', () => {
                setWarningSound(true);
            });
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

    // 일정한 간격으로 이미지 캡처 및 전송하는 함수
    const captureAndSendFrameAutomatically = async () => {

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
            console.log('자동 프레임 전송 성공');
        } catch (error) {
            console.error('자동 프레임 캡처 및 전송 중 오류:', error);
        }
    };

    // 타이머를 사용하여 일정한 간격으로 이미지 캡처 및 전송
    useEffect(() => {
        const captureTimer = setInterval(() => {
            captureAndSendFrameAutomatically();
        }, 1000); // 5초 간격으로 이미지 캡처 및 전송
        return () => {
            clearInterval(captureTimer); // 컴포넌트 언마운트 시 타이머 정리
        };
    }, []);

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
            <Button title="Play Warning Sound" onPress={() => setWarningSound(true)} />
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
