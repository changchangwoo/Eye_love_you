import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import BlinkScreen from './main/BlinkScreen';
import MapScreen from './main/MapScreen';
import MypageScreen from './main/MypageScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { main_style, styles } from '../styles/Css';

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: '아이 러브 유',
            headerTitleStyle: {
                fontFamily: 'FONT_LIGHT',
                fontSize: 20,

            },
            headerTitleAlign: 'center', // 가운데 정렬 추가
        });

    }, [navigation]);

    return (
        <Stack.Navigator initialRouteName="Contents">
            <Stack.Screen name="Contents" component={ContentsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Blink" component={BlinkScreen} />
            <Stack.Screen name="MyPage" component={MypageScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    );
};

const ContentsScreen = ({ navigation }) => {
    const [isImageClicked, setImageClicked] = useState(false);
    const animatedValue = new Animated.Value(0);

    const handleImageClick = () => {
        // 이미지 클릭 이벤트 처리
        navigation.replace('Blink');
        setImageClicked(!isImageClicked);

        // 애니메이션
        Animated.timing(animatedValue, {
            toValue: isImageClicked ? 0 : 1, // 이미지 클릭 상태에 따라 변경
            duration: 500, // 애니메이션 지속 시간
            useNativeDriver: false,
        }).start();
    };

    const interpolatedValue = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8], // 채도 얕아지게 설정
    });

    return (
        <View style={main_style.container}>
            <TouchableOpacity onPress={handleImageClick} style={main_style.content_box_1}>
                <Animated.Image
                    source={require('../assets/imgs/eye_il.png')}
                    style={{ ...main_style.image, transform: [{ scale: interpolatedValue }] }}
                />
                <View style={main_style.textContainer}>
                    {isImageClicked && (
                        <Text style={main_style.text}>눈 깜박임 감지</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImageClick} style={main_style.content_box_2}>
                <Animated.Image
                    source={require('../assets/imgs/checking_il.png')}
                    style={{ ...main_style.image, transform: [{ scale: interpolatedValue }] }}
                />
                <View style={main_style.textContainer}>
                    {isImageClicked && (
                        <Text style={main_style.text}>눈 깜박임 감지</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImageClick} style={main_style.content_box_3}>
                <Animated.Image
                    source={require('../assets/imgs/location_il.png')}
                    style={{ ...main_style.image, transform: [{ scale: interpolatedValue }] }}
                />
                <View style={main_style.textContainer}>
                    {isImageClicked && (
                        <Text style={main_style.text}>눈 깜박임 감지</Text>
                    )}
                </View>
            </TouchableOpacity>
            <Text style={styles.footer}>
                {'\n'}
                동양미래대학교 컴퓨터소프트웨어 공학과{'\n'}
                아이 좋아
            </Text>
        </View>

    );
};

export default MainScreen;
