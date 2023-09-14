import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Button } from 'react-native';
import * as Font from 'expo-font';
import CustomButton from '../styles/CustomButton';

const login_style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    top_content: {
        width: '100%',
        height: '40%',
        backgroundColor: '#FBE3F0',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detail_content: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
    },
    login_text: {
        fontSize: 40,
        fontFamily: 'FONT_MEDIUM',
        marginVertical: 50, // 수직 여백 조절
    },
    input: {
        width: '60%',
        height: 40,
        fontSize: 12,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10, // 수직 여백 조절
        textAlign: 'center'
    },
    custom_marginTop : {
        marginTop: 20
    },
    button: {
        fontSize: 20,
        marginTop: 10,
        width: '60%',
        height: 50,
        borderRadius: 10
    },
    registerbutton: {
        backgroundColor: '#2F2E41',
        marginTop: 5,
        width: '60%',
        height: 30,
        borderRadius: 10
    },
    button_text: {
        fontFamily: 'FONT_MEDIUM',
        fontSize: 15
    },
    registerbutton_text: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'FONT_LIGHT'
    }
});

const HomeScreen = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [id, setText] = useState('');
    const [pass, setPass] = useState('');

    const handleInputID = (inputText) => {
        setText(inputText);
    }
    const handleInputPass = (inputText) => {
        setPass(inputText);
    }
    const handleRegister = () => {
        navigation.replace('Detail');
    }
    const handleSubmit = () => {
        console.log(`입력된 텍스트: ${id}`);
    }

    async function loadCustomFont() {
        await Font.loadAsync({
            'FONT_LIGHT': require('../assets/fonts/NotoSansKR-Light.ttf'),
            'FONT_MEDIUM': require('../assets/fonts/NotoSansKR-Medium.ttf'),
            'FONT_BOLD': require('../assets/fonts/NotoSansKR-Bold.ttf')
        });
        setFontLoaded(true);
    }

    useEffect(() => {
        loadCustomFont();
    }, []);

    return (
        <View style={login_style.container}>
            <View style={login_style.top_content}>
                <Image
                    source={require('../assets/imgs/love_il.png')}
                    style={login_style.image}
                />
            </View>
            <View style={login_style.detail_content}>
                <Text style={login_style.login_text}>
                    로그인
                </Text>
                <TextInput
                    style={login_style.input}
                    onChangeText={handleInputID}
                    value={id}
                    placeholder="회원 아이디"
                />
                <TextInput
                    style={login_style.input}
                    onChangeText={handleInputPass}
                    value={pass}
                    placeholder="회원 비밀번호"
                />
                <CustomButton title="시작하기" 
                style={login_style.button}
                textStyle={login_style.button_text}
                onPress={handleSubmit} />

                <View style={login_style.custom_marginTop}/>

                <CustomButton title="아이러브유가 처음이신가요?" 
                style={login_style.registerbutton}
                textStyle={login_style.registerbutton_text}
                onPress={handleRegister} />
            </View>
        </View>
    );
};

export default HomeScreen;
