import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { blink_style } from '../styles/Css.js';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import CustomButton from '../styles/CustomButton.js';
import { Audio } from 'expo-av';

const BlinkScreen = ({ navigation, route }) => {
  const userdata = route.params.userdata
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isLeftEyeClosed, setIsLeftEyeClosed] = useState(false);
  const [isRightEyeClosed, setIsRightEyeClosed] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPauseActive, setIsPauseActive] = useState(false);
  const [isEndActive, setIsEndActive] = useState(false);
  const [backgroundColorAnim] = useState(new Animated.Value(0)); // 초기값 0으로 설정
  const [prevBackgroundColor, setPrevBackgroundColor] = useState('#FBE3F0'); // 이전 배경색 저장

  // 눈 깜박임 동작변수(눈 깜박임 직접적인 데이터)
  const [warningCount, setWarningCount] = useState(0); // 경고음 감지 - 추출 변수
  const [blinkCount, setBlinkCount] = useState(0); // 눈 깜박임 감지 - 추출 변수
  const [blinkDelay, setBlinkDelay] = useState(0); // 눈 깜박임 감지 딜레이
  const [longblinkCount, setLongCount] = useState(0); // 눈 계속 감은거 감지
  const [faceCount, setFaceCount] = useState(0); // 얼굴 감지 카운트

  // 타이머 변수(눈 깜박임을 체크하는 데이터)
  const [timer, setTimer] = useState(0); // 진짜 그냥 타이머 - 추출 변수
  const [warningTimer, setWarningTimer] = useState(0);
  const [isWarningTimerActive, setIsWarningTimerActive] = useState(false);
  const [isBlinkDelayActive, setIsBlinkDelayActive] = useState(false);

  // 상호작용 변수
  const [pauseMessage, setPauseMessage] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: '눈 깜박임 감지',
      headerTitleStyle: {
        fontFamily: 'FONT_LIGHT',
        fontSize: 20,
      },
      headerTitleAlign: 'center', // 가운데 정렬 추가
    });
    setWarningCount(0);
    setTimer(0);
    setBlinkCount(0);
  }, [navigation]);

  async function playWarningSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/warning.wav'));
    await sound.playAsync();
  }

  async function playResumeSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/resume.wav'));
    await sound.playAsync();
  }

  function handleFaceDetection({ faces }) {
    const face = faces[0];
    const hasFace = !!face;
    setIsLeftEyeClosed(hasFace ? face.leftEyeOpenProbability < 0.5 : false);
    setIsRightEyeClosed(hasFace ? face.rightEyeOpenProbability < 0.5 : false);

    if (faces.length === 0) {
      setFaceCount(faceCount + 1)
      if (faceCount >= 10) { // 얼굴 미식별 정지까지의 시간 값
        setIsPauseActive(true)
        playResumeSound();
        setPauseMessage('일정시간 얼굴 미감지 식별');
      }
      return;
    }
    setFaceCount(0)

    if (!isPauseActive) {
      setTimer(timer + 1);
      if (setIsBlinkDelayActive) {
        setBlinkDelay(blinkDelay + 1)
        if (blinkDelay >= 10) { // 눈 깜박임 딜레이 활성화까지의 시간 값
          setIsBlinkDelayActive(false)
        }
      }

      if (isLeftEyeClosed && isRightEyeClosed) { // 눈을 감은 경우 (눈 깜박임 횟수체크)
        setLongCount(longblinkCount + 1)
        if (!isBlinkDelayActive) {
          setBlinkCount(blinkCount + 1);
          setIsBlinkDelayActive(true)
          setBlinkDelay(0)
        }
      }

      if (longblinkCount >= 30) {
        setIsPauseActive(true)
        playResumeSound();
        setPauseMessage('일정시간 이상 눈 감음 식별');
      }

      if (!isLeftEyeClosed && !isRightEyeClosed) { // 눈을 뜬 경우 (경고음 감지)
        setLongCount(0)
        if (!isWarningTimerActive) {
          setIsWarningTimerActive(true);
          setWarningTimer(0);
        }
        if (isWarningTimerActive) {
          setWarningTimer(warningTimer + 1);

          if (warningTimer >= 50) { // 경고음 출력까지의 시간 값
            setIsWarningTimerActive(false);
            setWarningCount(warningCount + 1);
            playWarningSound();
            setPrevBackgroundColor(prevBackgroundColor => prevBackgroundColor === '#FBE3F0' ? '#F15F5F' : '#FBE3F0');
            Animated.timing(backgroundColorAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: false,
            }).start(() => {
              setPrevBackgroundColor(prevBackgroundColor => prevBackgroundColor === '#FBE3F0' ? '#F15F5F' : '#FBE3F0');
              Animated.timing(backgroundColorAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: false,
              }).start();
            });
          }
        }
      } else {
        setIsWarningTimerActive(false);
      }
    }
    if (!hasFace) return;
  }

  const startCamera = () => {
    setIsCameraActive(true);
  };

  const pauseCamera = () => {
    setIsPauseActive(true);
  };

  const resumeCamera = () => {
    setPauseMessage('');
    setLongCount(0);
    setFaceCount(0);
    setIsPauseActive(false);
  };

  const navMainButton = () => {
    navigation.navigate('Main', { userdata: userdata })

  };

  const stopCamera = async () => {
    setIsCameraActive(false);
    setIsEndActive(true);
    const update_timer = timer / 10
    console.log(userdata.userId, warningCount, blinkCount, update_timer)
    try {
      const response = await fetch('https://port-0-eye-love-you-7lk2bloqwhkr1.sel5.cloudtype.app/save', {
        // PC작업 http://192.168.25.33:8080/save
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userdata.userId,
          totalOperatingTime: update_timer,
          totalBlinkTimes: blinkCount,
          warningCount: warningCount,
          blinkCycle: 1
        }),
      });
      const data = await response.text();
      console.log(data + '성공')
    } catch (error) {
      console.error(error);
    }
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
        outputRange: ['#FBE3F0', prevBackgroundColor],
      })
    }]}>
      {isCameraActive ? (
        <>
          {isPauseActive ? (
            <>
              <Text style={[blink_style.processcheck, { color: 'red' }]}> 기능 정지상태입니다 </Text>
            </>
          ) : (
            <Text style={blink_style.processcheck}> 기능이 정상적으로 동작중입니다 </Text>
          )}
          {isPauseActive ? (
            <>
              <View style={blink_style.pause_container}>
                <Image
                  source={require('../assets/imgs/cat_smile.png')}
                  style={{
                    width: 100,
                    height: 100,
                    marginVertical: 50,
                  }}
                />
                <Text style={blink_style.message}> {pauseMessage}</Text>
                <Text style={[blink_style.description_text]}> 카메라를 일시적으로 정지했어요.{'\n'}
                  기능 재개 버튼을 클릭해 기능을 다시 동작하세요</Text>
              </View>
            </>

          ) : (
            <Camera
              style={{ ...blink_style.camera, width: '80%' }}
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
          )
          }
          <View style={blink_style.data_container}>
            {isLeftEyeClosed ?
              (<View style={[blink_style.data_container_1, { backgroundColor: '#A9DFBF' }]}></View>)
              :
              (<View style={[blink_style.data_container_1, { backgroundColor: '#FFB6C1' }]}></View>)
            }
            <View style={blink_style.data_container_2}>
              <Text style={blink_style.data_text}>동작 시간: {timer / 10}초</Text>
              <Text style={blink_style.data_text}>경고음 출력 횟수: {warningCount}</Text>
              <Text style={blink_style.data_text}>눈 깜박임 횟수: {blinkCount}</Text>
            </View>
            {isRightEyeClosed ?
              (<View style={[blink_style.data_container_3, { backgroundColor: '#A9DFBF' }]}></View>)
              :
              (<View style={[blink_style.data_container_3, { backgroundColor: '#FFB6C1' }]}></View>)
            }
          </View>
          <View style={blink_style.button_container}>
            {isPauseActive ? (
              <CustomButton
                title="기능 재개"
                style={blink_style.resume_button}
                textStyle={blink_style.pause_button_text}
                onPress={resumeCamera}
              />) : (
              <CustomButton
                title="일시 정지"
                style={blink_style.pause_button}
                textStyle={blink_style.pause_button_text}
                onPress={pauseCamera}
              />
            )
            }
            <CustomButton
              title="기능 종료"
              style={blink_style.stop_button}
              textStyle={blink_style.stop_button_text}
              onPress={stopCamera}
            />
          </View>
        </>
      ) : (<>
        {isEndActive ? (
          <>
            <View style={blink_style.end_container}>
              <Text style={blink_style.end_logo}>눈 깜박임 감지 종료</Text>
              <Image
                source={require('../assets/imgs/hip_smile.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginVertical: 50,
                }}
              />
              <Text style={[blink_style.end_text]}>  {userdata.name}  님의 눈 깜박임 감지 동작이{'\n'}
                정상적으로 종료 됐어요{'\n'}{'\n'}
                식별 데이터 시각화 항목에서{'\n'}그래프와 함께 확인하세요
              </Text>
              <CustomButton
                title="메인화면으로"
                style={blink_style.start_button}
                textStyle={blink_style.start_button_text}
                onPress={navMainButton}
              />
            </View>
          </>
        ) : (
          <>
            <View style={blink_style.notify_view}>
              <View style={blink_style.main_logo}>
                <Text style={blink_style.logoText}> 잠깐!</Text>
                <Text style={blink_style.logoSubText}> 모바일 눈 깜박임 감지 기능 사용은 다음을 유의해주세요 </Text>
              </View>
              <View style={blink_style.textBox}>
                <Text style={blink_style.notify_text}>
                  카메라 권한의 허용을 확인하세요
                </Text>
                <Text style={blink_style.notify_text}>
                  기능 동작시 카메라에 사용자의 얼굴이{'\n'}전부 나오도록 확인하세요
                </Text>
                <Text style={blink_style.notify_text}>
                  정확한 눈 깜박임 데이터 측정을 위하여{'\n'}미측정시 정지버튼을 클릭하세요
                </Text>
              </View>
              <CustomButton
                title="기능 시작"
                style={blink_style.start_button}
                textStyle={blink_style.start_button_text}
                onPress={startCamera}
              />
            </View>
          </>
        )}
      </>
      )}
    </Animated.View>
  );
}

export default BlinkScreen;