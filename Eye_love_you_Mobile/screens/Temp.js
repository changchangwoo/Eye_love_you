import React, { useEffect, useState, Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { splash_style } from '../styles/Css.js';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

const TempScreen = ({ navigation }) => {

	return (
		<View style={splash_style.loadingContainer}>
			<View>
				<WebView style={{ width: 350, height: 100, flex: 1 }}
					source={{ uri: 'http://192.168.25.17:8080' }}
					originWhitelist={['*']}
				/>
			</View>
		</View>
	);
};



export default TempScreen;
