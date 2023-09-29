import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, Dimensions } from 'react-native';
import BlinkScreen from './main/BlinkScreen';
import MapScreen from './main/MapScreen';
import MypageScreen from './main/MypageScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { main_style, styles } from '../styles/Css';
import CustomButton from '../styles/CustomButton';

const Stack = createStackNavigator();

const MainScreen = ({ navigation, route }) => {
    const name = route.params.name
    const address = route.params.address
    console.log(name, address)
    useEffect(() => {
        navigation.setOptions({
            title: '메인화면',
            headerTitleStyle: {
                fontFamily: 'FONT_LIGHT',
                fontSize: 20,

            },
            headerTitleAlign: 'center', // 가운데 정렬 추가
        });

    }, [navigation]);

    return (
        <Stack.Navigator initialRouteName="Contents">
            <Stack.Screen name="Contents" component={ContentsScreen} initialParams={{ name: name, address: address }} options={{ headerShown: false }} />
            <Stack.Screen name="Blink" component={BlinkScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyPage" component={MypageScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    );
};

const ContentsScreen = ({ navigation, route }) => {
    const name = route.params.name
    const address = route.params.address
    const [isImage1Clicked, setImage1Clicked] = useState(false);
    const [isImage2Clicked, setImage2Clicked] = useState(false);
    const [isImage3Clicked, setImage3Clicked] = useState(false);
    const [isImage4Clicked, setImage4Clicked] = useState(false);
    const animatedValue = new Animated.Value(0);
    const [isOpacity1, setisOpacity1] = useState(1.0);
    const [isOpacity2, setisOpacity2] = useState(1.0);
    const [isOpacity3, setisOpacity3] = useState(1.0);
    const [isOpacity4, setisOpacity4] = useState(1.0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;



    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffset / windowWidth);
        setCurrentIndex(index);
    };

    const NavBlink = () => {
        navigation.navigate('Blink');
    }


    const handleImage1Click = () => {
        setImage1Clicked(!isImage1Clicked);
        if (!isImage1Clicked) {
            setisOpacity1(0.2)
        } else {
            setisOpacity1(1.0)
        }

        Animated.timing(animatedValue, {
            toValue: isImage1Clicked ? 0 : 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const handleImage2Click = () => {
        setImage2Clicked(!isImage2Clicked);
        if (!isImage2Clicked) {
            setisOpacity2(0.2)
        } else {
            setisOpacity2(1.0)
        }

        Animated.timing(animatedValue, {
            toValue: isImage2Clicked ? 0 : 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const handleImage3Click = () => {
        setImage3Clicked(!isImage3Clicked);
        if (!isImage3Clicked) {
            setisOpacity3(0.2)
        } else {
            setisOpacity3(1.0)
        }

        Animated.timing(animatedValue, {
            toValue: isImage3Clicked ? 0 : 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const handleImage4Click = () => {
        setImage4Clicked(!isImage4Clicked);
        if (!isImage4Clicked) {
            setisOpacity4(0.2)
        } else {
            setisOpacity4(1.0)
        }

        Animated.timing(animatedValue, {
            toValue: isImage4Clicked ? 0 : 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={main_style.container}>
            <ScrollView style={main_style.scroll_view}>
                <View style={main_style.main_logo}>
                    <Text style={main_style.logoSubText}>오늘도 눈이 좋아지는</Text>
                    <Text style={main_style.logoText}> {name} 님</Text>
                    <Image
                        source={require('../assets/imgs/cat_smile.png')}
                        style={{
                            width: 100,
                            height: 100,
                            marginTop: 50,
                        }}
                    />
                </View>
                <Text style={main_style.description_text}> 터치를 통해 컨텐츠를 확인하시고{'\n'}
                    우측 슬라이드를 통해 바로 이용하세요 </Text>
                <View style={main_style.detail_content}>
                    {/* 1번항목 */}
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            <TouchableOpacity onPress={handleImage1Click} style={[main_style.content_box_1, { width: windowWidth }]}>
                                <Animated.Image
                                    source={require('../assets/imgs/eye_il.png')}
                                    style={{
                                        ...main_style.image,
                                        opacity: isOpacity1
                                    }}
                                />
                                <View style={main_style.textContainer}>
                                    {isImage1Clicked && (
                                        <>
                                            <Text style={main_style.text}>눈 깜박임 감지</Text>
                                            <Text style={main_style.sub_text}>실 시간 눈 깜박임 감지 프로그램으로{'\n'}
                                                눈 깜박임 습관을 검진하세요</Text>
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={[main_style.content_box_1, { width: windowWidth }]}>
                                <Text style={main_style.text}>눈 깜박임 감지</Text>
                                <CustomButton
                                    title="지금 시작하기"
                                    style={main_style.address_button}
                                    textStyle={main_style.address_button_text}
                                    onPress={NavBlink}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    {/* 2번항목 */}
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            <TouchableOpacity onPress={handleImage2Click} style={[main_style.content_box_2, { width: windowWidth }]}>
                                <Animated.Image
                                    source={require('../assets/imgs/checking_il.png')}
                                    style={{
                                        ...main_style.image,
                                        opacity: isOpacity2
                                    }}
                                />
                                <View style={main_style.textContainer}>
                                    {isImage2Clicked && (
                                        <>
                                            <Text style={main_style.text}>식별 데이터 시각화</Text>
                                            <Text style={main_style.sub_text}>눈 깜박임 감지 프로그램을 통해 추출한 데이터를{'\n'}
                                                그래프를 통해 한눈에 확인하고{'\n'}
                                                다른 회원과 비교해보세요 </Text>
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={[main_style.content_box_2, { width: windowWidth }]}>
                                <Text style={main_style.text}>눈 깜박임 감지</Text>
                                <CustomButton
                                    title="지금 시작하기"
                                    style={main_style.address_button}
                                    textStyle={main_style.address_button_text}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    {/* 3번 항목 */}
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            <TouchableOpacity onPress={handleImage3Click} style={[main_style.content_box_3, { width: windowWidth }]}>
                                <Animated.Image
                                    source={require('../assets/imgs/location_il.png')}
                                    style={{
                                        ...main_style.image,
                                        opacity: isOpacity3
                                    }}
                                />
                                <View style={main_style.textContainer}>
                                    {isImage3Clicked && (
                                        <>
                                            <Text style={main_style.text}>주변 안과 검색</Text>
                                            <Text style={main_style.sub_text}>내 데이터를 기반으로 한{'\n'}
                                                주변의 안과를 한 눈에 확인해보세요{'\n'}</Text>
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={[main_style.content_box_3, { width: windowWidth }]}>
                                <Text style={main_style.text}>눈 깜박임 감지</Text>
                                <CustomButton
                                    title="지금 시작하기"
                                    style={main_style.address_button}
                                    textStyle={main_style.address_button_text}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    {/* 4번 항목(공란) */}
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            <TouchableOpacity onPress={handleImage4Click} style={[main_style.content_box_2, { width: windowWidth }]}>
                                <Animated.Image
                                    source={require('../assets/imgs/cat_il.png')}
                                    style={{
                                        ...main_style.image,
                                        opacity: isOpacity4
                                    }}
                                />
                                <View style={main_style.textContainer}>
                                    {isImage4Clicked && (
                                        <>
                                            <Text style={main_style.text}>공란(여유있으면)</Text>
                                            <Text style={main_style.sub_text}>분명 여유가 없겠지만{'\n'}
                                                혹시모르니 항목생성{'\n'}</Text>
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={[main_style.content_box_1, { width: windowWidth }]}>
                                <Text style={main_style.text}>눈 깜박임 감지</Text>
                                <CustomButton
                                    title="지금 시작하기"
                                    style={main_style.address_button}
                                    textStyle={main_style.address_button_text}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <Text style={styles.footer}>
                        {'\n'}
                        동양미래대학교 컴퓨터소프트웨어 공학과{'\n'}
                        아이 좋아
                    </Text>
                </View>
            </ScrollView >
        </View >

    );
};

export default MainScreen;