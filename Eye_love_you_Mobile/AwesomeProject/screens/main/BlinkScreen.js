import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

const warningWAV = require('../../assets/sounds/warning.wav');

const Process = () => {
    const [socket, setSocket] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
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
            const socket = io('http://127.0.0.1:5000'); // Update the server URL
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
            audioRef.current.loadAsync(warningWAV).then(() => {
                audioRef.current.playAsync().then(() => {
                    setWarningSound(false);
                });
            });
        }
    }, [warningSound]);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);

    const startVideoStream = async () => {
        if (hasPermission) {
            cameraRef.current.resumePreview();
        }
    };

    const stopVideoStream = () => {
        if (hasPermission) {
            cameraRef.current.pausePreview();
            socket.emit('datasave');
            socket.disconnect();
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Expo Camera Streaming</Text>
            <View style={{ flex: 1, width: '100%' }}>
                {hasPermission ? (
                    <Camera
                        style={{ flex: 1, width: '100%' }}
                        type={cameraType}
                        ref={cameraRef}
                    />
                ) : (
                    <Text>Camera permission not granted</Text>
                )}
            </View>
            <Button title="Start Camera" onPress={startVideoStream} disabled={!hasPermission} />
            <Button title="Stop Camera" onPress={stopVideoStream} disabled={!hasPermission} />
            <Button
                title="Switch Camera"
                onPress={() => setCameraType(
                    cameraType === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                )}
                disabled={!hasPermission}
            />
            <Button title="Play Warning Sound" onPress={() => setWarningSound(true)} />
        </View>
    );
};

export default Process;
