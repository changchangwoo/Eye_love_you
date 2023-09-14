import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';

const Splashstyle = StyleSheet.create({
    loading_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3F0',
    },
    Logo_sub_text: {
        fontSize: 30,
        fontFamily: 'FONT_LIGHT',
        lineHeight: 70,
    },
    Logo_text: {
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'FONT_BOLD', // 폰트 이름 수정
        lineHeight: 50
    },
});

const SplashScreen = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    async function loadCustomFont() {
        await Font.loadAsync({
            'FONT_LIGHT': require('../assets/fonts/NotoSansKR-Light.ttf'),
            'FONT_MEDIUM': require('../assets/fonts/NotoSansKR-Medium.ttf'),
            'FONT_BOLD': require('../assets/fonts/NotoSansKR-Bold.ttf')
        });
        setFontLoaded(true); // 폰트 로딩이 완료되면 상태 업데이트
    }

    useEffect(() => {
        loadCustomFont();

        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3500);
    }, []);

    // 폰트가 로딩되지 않았을 때 로딩 화면을 보여줄 수 있도록 체크
    if (!fontLoaded) {
        return (
            <View style={Splashstyle.loading_container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // 폰트 로딩이 완료되면 화면을 렌더링
    return (
        <View style={Splashstyle.loading_container}>
            <Text style={Splashstyle.Logo_sub_text}>눈이 아픈 당신을 위해</Text>
            <Text style={Splashstyle.Logo_text}>아이 러브 유</Text>
            <Image
                source={require('../assets/imgs/smile.png')}
                style={{
                    width: 100,
                    height: 100,
                    marginTop: 50,
                }}
            />
        </View>
    );
};

export default SplashScreen;
