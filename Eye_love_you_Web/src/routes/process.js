import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Sound from 'react-native-sound';

const App = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        Sound.setCategory('Playback');
        const warningSound = new Sound('warning.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load the sound', error);
                return;
            }
            setSound(warningSound);
        });

        return () => {
            if (sound) {
                sound.release();
            }
        };
    }, []);

    const startCamera = () => {
        setIsCameraOn(true);
    };

    const stopCamera = () => {
        setIsCameraOn(false);
    };

    const playWarningSound = () => {
        if (sound) {
            sound.play();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isCameraOn ? (
                <RNCamera
                    style={{ flex: 1, width: '100%' }}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                />
            ) : (
                <Text>Camera is off</Text>
            )}
            <Button title="Start Camera" onPress={startCamera} disabled={isCameraOn} />
            <Button title="Stop Camera" onPress={stopCamera} disabled={!isCameraOn} />
            <Button title="Play Warning Sound" onPress={playWarningSound} />
        </View>
    );
};

export default App;
