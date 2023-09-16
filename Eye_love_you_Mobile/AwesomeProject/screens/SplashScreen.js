import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3500);
    }, []);

    return (
        <View style={splashStyle.loadingContainer}>
            <Text style={splashStyle.logoSubText}>눈이 아픈 당신을 위해</Text>
            <Text style={splashStyle.logoText}>아이 러브 유</Text>
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

const splashStyle = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3F0',
    },
    logoSubText: {
        fontSize: 30,
        fontFamily: 'FONT_LIGHT',
        lineHeight: 70,
    },
    logoText: {
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'FONT_BOLD',
        lineHeight: 50
    },
});

export default SplashScreen;
