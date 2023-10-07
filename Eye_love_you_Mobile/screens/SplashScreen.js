import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { splash_style } from '../styles/Css.js';


const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3500);
    }, []);

    return (
        <View style={splash_style.loadingContainer}>
            <Text style={splash_style.logoSubText}>눈이 아픈 당신을 위해</Text>
            <Text style={splash_style.logoText}>아이 러브 유</Text>
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
