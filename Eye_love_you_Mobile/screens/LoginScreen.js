import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import CustomButton from '../styles/CustomButton';
import { login_style } from '../styles/Css.js';

const LoginScreen = ({ navigation }) => {
    const [id, setText] = useState('');
    const [pass, setPass] = useState('');

    const handleInputID = (inputText) => {
        setText(inputText);
    }
    const handleInputPass = (inputText) => {
        setPass(inputText);
    }
    const handleRegister = () => {
        navigation.navigate('Register');
    }
    const handleSubmit = async () => {
        if (id == '' || pass == '') {
            Alert.alert('아이디 또는 비밀번호를 입력해주세요');
        } else {
            try {
                const response = await fetch('http://192.168.25.33:8080/login', {
                    // PC작업 http://192.168.25.33:8080/login
                    // 노트북작업 http://192.168.0.7:8080/login

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: id,
                        password: pass
                    }),
                });

                const responseData = await response.json();
                if (!responseData || responseData === '') {
                    Alert.alert('로그인 실패');
                } else {
                    navigation.navigate('Main', { userdata: responseData })
                }
            } catch (error) {
                Alert.alert('로그인 실패');
            }
        }
    };

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
                <View style={login_style.custom_marginTop} />

                <CustomButton title="아이러브유가 처음이신가요?"
                    style={login_style.registerbutton}
                    textStyle={login_style.registerbutton_text}
                    onPress={handleRegister} />
            </View>
        </View>
    );
};

export default LoginScreen;
