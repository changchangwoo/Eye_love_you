import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const BlinkScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [faceDetected, setFaceDetected] = useState(false);
  const [isLeftEyeClosed, setIsLeftEyeClosed] = useState(false);
  const [isRightEyeClosed, setIsRightEyeClosed] = useState(false);
  const faceValues = useSharedValue({ width: 0, height: 0, x: 0, y: 0 });

  useEffect(() => {
    navigation.setOptions({
      title: '눈 깜박임 감지',
      headerTitleStyle: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 20,

      },
      headerTitleAlign: 'center', // 가운데 정렬 추가
    });

  }, [navigation]);

  function handleFaceDetection({ faces }) {
    const face = faces[0];
    const hasFace = !!face;

    setFaceDetected(hasFace);
    setIsLeftEyeClosed(hasFace ? face.leftEyeOpenProbability < 0.5 : false);
    setIsRightEyeClosed(hasFace ? face.rightEyeOpenProbability < 0.5 : false);

    if (!hasFace) return;

    const width = face.bounds.size.width;
    const height = face.bounds.size.height;
    const x = face.bounds.origin.x;
    const y = face.bounds.origin.y;

    faceValues.value = {
      width,
      height,
      x,
      y,
    };
  }

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y },
    ],
  }));

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    camera: {
      flex: 1,
    }
  });

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission?.granted) {
    return null; // 권한이 없으면 아무것도 렌더링하지 않음
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{ ...styles.camera, width: '80%' }} // 카메라를 화면의 80%로 설정
        type={CameraType.front}
        onFacesDetected={handleFaceDetection}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      {faceDetected && (
        <Animated.View style={animatedStyle}>
        </Animated.View>
      )}
      <Text>Left Eye Closed: {isLeftEyeClosed ? 'True' : 'False'}</Text>
      <Text>Right Eye Closed: {isRightEyeClosed ? 'True' : 'False'}</Text>
    </View>
  );
}

export default BlinkScreen;
