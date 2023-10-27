import React, { useEffect, useState, Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { splash_style } from '../styles/Css.js';
import MapView, { Marker } from 'react-native-maps';
import { map_style } from '../styles/Css';
import { WebView } from 'react-native-webview';



const REST_API_KEY = '4bc198264e72696845764c4e1d79986c';


const MapScreen = ({ navigation, route }) => {
	const data = route.params
	const useraddress = data.userdata.homeAddress
	const api_x = data.X;
	const api_y = data.Y;
	const x = parseFloat(data.X, 10);
	const y = parseFloat(data.Y, 10);

	const [region, setRegion] = useState(
		{
			latitude: y,
			longitude: x,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,

		}
	)
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [markers, setMarkers] = useState([]); // Marker 정보를 저장하는 상태 변수

	const handleMarkerPress = marker => {
		setSelectedMarker(marker);
	};

	const markerData = async () => {
		try {
			console.log(x, y)
			const response = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&x=${api_x}&query=%EC%95%88%EA%B3%BC&size=10&y=${api_y}`, {
				method: 'GET',
				headers: {
					'Authorization': `KakaoAK ${REST_API_KEY}`,
				},
			});
			const data = await response.json();
			console.log(data)
			const extractedData = data.documents.map(item => {
				return {
					latitude: parseFloat(item.y), // 위도
					longitude: parseFloat(item.x), // 경도
					latitudeDelta: 0.0922, // latitudeDelta
					longitudeDelta: 0.0421, // longitudeDelta
					place_name: item.place_name,
					description: item.place_url
				};
			});
			setMarkers(extractedData); // 추출한 데이터를 상태 변수에 저장
			setRegion({ latitude: y, longitude: x, latitudeDelta: 0.0922, longitudeDelta: 0.0421 })

		} catch (error) {
			console.error('API 요청 중 오류 발생:', error);
		}
	};

	useEffect(() => {
		markerData();
	}, []);

	useEffect(() => {
		navigation.setOptions({
			title: '내 주변 안과',
			headerTitleStyle: {
				fontFamily: 'FONT_LIGHT',
				fontSize: 20,

			},
			headerTitleAlign: 'center', // 가운데 정렬 추가
		});

	}, [navigation]);
	return (
		<View style={map_style.container}>
			<View style={map_style.map_title}>
				<Text style={map_style.map_title_font}> {useraddress}</Text>
			</View>
			<MapView
				style={map_style.map}
				minZoomLevel={14}
				initialRegion={region}
			>
				<Marker coordinate={region} title='내 위치' image={require('../assets/imgs/small_smile.png')} />
				{markers.map((marker, index) => (
					<Marker
						key={index}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
							latitudeDelta: 0.0922, // latitudeDelta
							longitudeDelta: 0.0421, // longitudeDelta
						}}
						title={marker.place_name}
						onPress={() => handleMarkerPress(marker)}
					/>
				))}
			</MapView>
			<View style={map_style.description}>
				{selectedMarker && (
					<WebView
						style={{
							borderWidth: 2, // 테두리 두께 설정
							width: 350,
							height: 350
						}}
						source={{ uri: selectedMarker.description }}
					/>
				)}
			</View>

		</View>
	);
};
export default MapScreen;
