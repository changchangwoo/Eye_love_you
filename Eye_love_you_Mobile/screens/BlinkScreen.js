import { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { blink_style } from '../styles/Css.js';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import CustomButton from '../styles/CustomButton.js';
import { Audio } from 'expo-av';

const BlinkScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isLeftEyeClosed, setIsLeftEyeClosed] = useState(false);
  const [isRightEyeClosed, setIsRightEyeClosed] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [backgroundColorAnim] = useState(new Animated.Value(0)); // 초기값 0으로 설정
  const [prevBackgroundColor, setPrevBackgroundColor] = useState('#FBE3F0'); // 이전 배경색 저장

  // 눈 깜박임 동작변수(눈 깜박임 직접적인 데이터)
  const [warningCount, setWarningCount] = useState(0); // 경고음 감지
  const [blinkCount, setBlinkCount] = useState(0); // 눈 깜박임 감지
  const [blinkDelay, setBlinkDelay] = useState(0); // 눈 깜박임 감지 딜레이

  // 타이머 변수(눈 깜박임을 체크하는 데이터)
  const [timer, setTimer] = useState(0); // 진짜 그냥 타이머
  const [warningTimer, setWarningTimer] = useState(0);
  const [isWarningTimerActive, setIsWarningTimerActive] = useState(false);
  const [isBlinkDelayActive, setIsBlinkDelayActive] = useState(false);

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
    setIsLeftEyeClosed(hasFace ? face.leftEyeOpenProbability < 0.5 : false);
    setIsRightEyeClosed(hasFace ? face.rightEyeOpenProbability < 0.5 : false);
    setTimer(timer + 1);

    if (setIsBlinkDelayActive) { // 눈 깜박임 딜레이
      setBlinkDelay(blinkDelay + 1)
      if (blinkDelay >= 10) {
        setIsBlinkDelayActive(false)
      }
    }

    if (isLeftEyeClosed && isRightEyeClosed) { // 눈 깜박임
      if (!isBlinkDelayActive) {
        setBlinkCount(blinkCount + 1);
        setIsBlinkDelayActive(true)
        setBlinkDelay(0)
      }
    }

    if (!isLeftEyeClosed && !isRightEyeClosed) { // 경고음 감지
      if (!isWarningTimerActive) {
        setIsWarningTimerActive(true);
        setWarningTimer(0);
      }
      if (isWarningTimerActive) {
        setWarningTimer(warningTimer + 1);

        if (warningTimer >= 50) {
          setIsWarningTimerActive(false);
          setWarningCount(warningCount + 1);

          // 현재 배경색 저장
          setPrevBackgroundColor(prevBackgroundColor => prevBackgroundColor === '#FBE3F0' ? '#F15F5F' : '#FBE3F0');

          // 배경색 변경
          Animated.timing(backgroundColorAnim, {
            toValue: 1, // 1로 변경하여 애니메이션 적용
            duration: 1000, // 1초 동안 애니메이션 적용
            useNativeDriver: false, // Expo에서는 네이티브 드라이버를 사용하지 않아야 함
          }).start(() => {
            // 애니메이션 완료 후에 배경색 복구
            setPrevBackgroundColor(prevBackgroundColor => prevBackgroundColor === '#FBE3F0' ? '#F15F5F' : '#FBE3F0');
            Animated.timing(backgroundColorAnim, {
              toValue: 0, // 0으로 변경하여 애니메이션 적용
              duration: 1000, // 1초 동안 애니메이션 적용
              useNativeDriver: false, // Expo에서는 네이티브 드라이버를 사용하지 않아야 함
            }).start();
          });
        }
      }
    } else {
      setIsWarningTimerActive(false);
    }
    if (!hasFace) return;
  }

  const startCamera = () => {
    setIsCameraActive(true);
  };

  // 카메라 정지 함수
  const stopCamera = () => {
    setIsCameraActive(false);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission?.granted) {
    return null;
  }

  return (
    <Animated.View style={[blink_style.container, {
      backgroundColor: backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FBE3F0', prevBackgroundColor], // 이전 색상으로 복구
      })
    }]}>
      {isCameraActive ? (
        <>
          <Text style={blink_style.processcheck}> 기능이 정상적으로 동작중입니다 </Text>
          <Camera
            style={{ ...blink_style.camera, width: '80%' }} // 카메라를 화면의 80%로 설정
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
          <Text>동작 시간: {timer / 10}초</Text>
          <Text>좌측 눈  {isLeftEyeClosed ? 'X' : 'O'} 우측 눈 {isRightEyeClosed ? 'X' : 'O'}</Text>
          <Text>경고음 출력 횟수: {warningCount}</Text>
          <Text>눈 깜박임 횟수: {blinkCount}</Text>
        </>
      ) : (
        <>
          <View style={blink_style.notify_view}>
            <View style={blink_style.main_logo}>
              <Text style={blink_style.logoText}> 잠깐! </Text>
              <Text style={blink_style.logoSubText}> 모바일 눈 깜박임 감지 기능 사용은 다음을 유의해주세요 </Text>
            </View>
            <View style={blink_style.textBox}>
              <Text style={blink_style.notify_text}>
                카메라 권한의 허용을 확인하세요
              </Text>
              <Text style={blink_style.notify_text}>
                기능 동작시 카메라에 사용자의 얼굴이 전부 나오도록 확인하세요
              </Text>
              <Text style={blink_style.notify_text}>
                정확한 눈 깜박임 데이터 측정을 위하여 미 측정시 정지버튼을 클릭하세요
              </Text>
            </View>
            <CustomButton
              title="기능 시작"
              style={blink_style.address_button}
              textStyle={blink_style.address_button_text}
              onPress={startCamera}
            />
          </View>
        </>
      )}
    </Animated.View>
  );
}

export default BlinkScreen;