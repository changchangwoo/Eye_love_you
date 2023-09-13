import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { styles } from '../styles/style';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        async function loadCustomFont() {
            await Font.loadAsync({
                'NEXON_FONT': require('../assets/fonts/NEXON Lv2 Gothic Bold.ttf'),
            });
        }
        loadCustomFont();
        setTimeout(() => {
            navigation.replace('Home'); // 'Home'은 다음 화면의 이름
        }, 50000); // 로딩 화면을 보여줄 시간 (예: 2초)
        }, []);

    return (
        <View style={styles.loading_container}>
            <Text style={Splashstyle.medium_text}>눈이 아픈 당신을 위해</Text>
            <Text>아이 러브 유</Text>
            <Text style={Splashstyle.medium_text}>아이 러브 유</Text>
            <Text style={Splashstyle.large_text}>아이 러브 유</Text>


        </View>
    );
};
export default SplashScreen;

export const Splashstyle = StyleSheet.create({
    loading_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3F0'
    },
    medium_text: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'NEXON_FONT'
    },
    large_text: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'NEXON_FONT'
    }
});