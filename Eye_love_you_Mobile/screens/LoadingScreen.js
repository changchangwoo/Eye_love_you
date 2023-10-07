import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const LoadingScreen = ({ navigation }) => {

    return (
        <View style={splashStyle.loadingContainer}>
            <Image
                source={require('../assets/imgs/cat_smile.png')}
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
    }
});

export default LoadingScreen;
