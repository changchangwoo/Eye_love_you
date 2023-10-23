import { useEffect, useRef, useState } from "react";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: Failed prop type']);
import React from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Alert, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { result_style } from '../styles/Css';
import CustomButton from "../styles/CustomButton";
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';



const ResultScreen = ({ navigation, route }) => {
    const [userdata, setUserData] = useState('');
    const [infodata, setInfodata] = useState('');
    const [percent, setPercent] = useState(0);
    const [imgSrc, setImgSrc] = useState('');
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [altText, setAltText] = useState('');
    const scrollViewRef = useRef(null);
    const windowWidth = Dimensions.get('window').width;
    const [currentIndex, setCurrentIndex] = useState(0);
    const time = infodata.timeAvg;
    const blink_count = infodata.count;
    const warning_count = infodata.warningAvg;
    const blink_cycle = infodata.cycleAvg;
    const user_time = infodata.userTot;
    const user_bc = infodata.userBc;
    const user_wc = infodata.userWc;
    const user_userTbts = infodata.userTbts;
    const user_count = infodata.count;
    const user_rank = infodata.userRank;


    useEffect(() => {
        try {
            const userdata = route.params.userdata
            setUserData(userdata)
            const userid = userdata.userId
            fetch('http://192.168.25.17:8080/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userid
                }),
            })
                .then(response => response.json())
                .then(responseData => {
                    setInfodata(responseData)
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: '데이터 시각화',
            headerTitleStyle: {
                fontFamily: 'FONT_LIGHT',
                fontSize: 20,
            },
            headerTitleAlign: 'center', // 가운데 정렬 추가
        });
    }, [navigation]);

    useEffect(() => {
        const calc_data = (user_rank / user_count) * 100;
        setPercent(calc_data)
    }, [percent, user_count, user_rank])

    useEffect(() => {
        if (percent > 70) {
            setMessage('다른 아이 러브 유 회원들 보다 다소 아쉬운 데이터에요');
            setMessage2('안구 건강을 위해서 조금만 더 힘내봐요ㅜ');
            setAltText('30 Points');
            setImgSrc(require('../assets/imgs/low_result_smile.png'));
        } else if (percent > 30 && percent < 70) {
            setMessage('다른 아이 러브 유 회원들과 비슷한 데이터에요');
            setMessage2('오늘도 계속해서 나아지고 있어요!');
            setAltText('60 Points');
            setImgSrc(require('../assets/imgs/normal_result_smile.png'));
        } else if (percent < 30) {
            setMessage('다른 아이 러브 유 회원들 보다 훨씬 좋은 데이터에요');
            setMessage2('멋져요! 최고의 결과에요');
            setAltText('90 Points');
            setImgSrc(require('../assets/imgs/high_result_smile.png'));
        }
    }, [percent]);

    const chartConfig = {
        backgroundGradientFrom: 'white', // 배경색을 하얀색으로 설정
        backgroundGradientTo: 'white',   // 배경색을 하얀색으로 설정
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // 막대 색상 설정
        style: {
            borderRadius: 16,
        },
    };

    const handleShare = async () => {
        const image = Asset.fromModule(imgSrc);
        await image.downloadAsync();
        const localImagePath = image.localUri;

        try {
            const result = await Sharing.shareAsync(localImagePath);
        } catch (error) {
            console.error('이미지 공유 중 오류 발생:', error);
        }
    };

    const data = {
        labels: [userdata.name + '님', '전체 회원 평균'],
        datasets: [
            {
                data: [user_time, time],
            },
        ],
    };

    const data_blink_count = {
        labels: [userdata.name + '님', '전체 회원 평균', '이상적 데이터'],
        datasets: [
            {
                data: [user_userTbts, blink_count, 3]
            },
        ],
    };

    const data_warning_count = {
        labels: [userdata.name + '님', '전체 회원 평균', '이상적 데이터'],
        datasets: [
            {
                data: [user_wc, warning_count, 3],
            },
        ],
    };

    const data_cycle = {
        labels: [userdata.name + '님', '전체 회원 평균', '이상적 데이터'],
        datasets: [
            {
                data: [user_bc, blink_cycle, 3],
            },
        ],
    };

    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffset / windowWidth);
        setCurrentIndex(index);
    };

    const handleKakaoShare = () => {
        console.log(hello)

    }

    return (
        <View style={result_style.container}>
            <Text style={result_style.end_logo}> 눈 깜박임 데이터 </Text>
            <Text style={result_style.description_text}>좌우 슬라이드를 통해 결과를 확인하세요{'\n'}</Text>
            <View style={result_style.chart_container}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ width: Dimensions.get('window').width * 5 }} // 400% 크기
                >
                    {/* 총 작동 시간 (차트1) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 총 작동 시간</Text>
                        </View>
                        <View style={result_style.chart_data}>
                            <BarChart
                                data={data}
                                width={Dimensions.get('window').width - 50} // 그래프 너비
                                height={250} // 부모 컴포넌트의 크기를 100%로 설정
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={result_style.chart_descript}>
                            <Text style={result_style.chart_descript_text}>
                                {userdata.name}님은 프로그램을 총 {user_time}초 동작하셨어요
                                {'\n'}아이러브유의 다른 사용자들은 평균적으로 {time}초만큼 동작하였어요
                            </Text>
                        </View>
                    </View>
                    {/* 눈 깜박임 횟수 (차트2) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 눈 깜박임 횟수</Text>
                        </View>
                        <View style={result_style.chart_data}>
                            <BarChart
                                data={data_blink_count}
                                width={Dimensions.get('window').width - 50} // 그래프 너비
                                height={250} // 부모 컴포넌트의 크기를 100%로 설정
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={result_style.chart_descript}>
                            <Text style={result_style.chart_descript_text}>
                                {userdata.name}님은 프로그램을 실행하면서 {user_userTbts}번 눈을 깜박이셨어요
                                {'\n'}아이러브유의 다른 사용자들은 평균적으로 {blink_count}초만큼 깜박였네요
                            </Text>
                        </View>
                    </View>
                    {/* 경고음 출력 횟수 (차트3) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 경고음 출력 횟수</Text>
                        </View>
                        <View style={result_style.chart_data}>
                            <BarChart
                                data={data_warning_count}
                                width={Dimensions.get('window').width - 50} // 그래프 너비
                                height={250} // 부모 컴포넌트의 크기를 100%로 설정
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={result_style.chart_descript}>
                            <Text style={result_style.chart_descript_text}>
                                {userdata.name}님은 프로그램을 실행하면서 {user_wc}번 경고를 받으셨어요
                                {'\n'}아이러브유의 다른 사용자들은 평균적으로 {warning_count}번 경고를 받았어요
                            </Text>
                        </View>
                    </View>
                    {/* 눈 깜박임 주기 (차트4) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 눈 깜박임 주기</Text>
                        </View>
                        <View style={result_style.chart_data}>
                            <BarChart
                                data={data_cycle}
                                width={Dimensions.get('window').width - 50} // 그래프 너비
                                height={250} // 부모 컴포넌트의 크기를 100%로 설정
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={result_style.chart_descript}>
                            <Text style={result_style.chart_descript_text}>
                                {userdata.name}님은 프로그램을 실행하면서 {user_bc}초 주기로 눈을 깜박이셨어요
                                {'\n'}아이러브유의 다른 사용자들은 평균적으로 {blink_cycle} 주기로 눈을 깜박여요
                            </Text>
                        </View>
                    </View>
                    {/* 결과 및 등수화면 (차트는 아니지만 5) */}
                    <View style={result_style.rank_chart}>
                        <Text style={result_style.rank_Text_sub}>
                            {userdata.name} 님은 아이러브유 회원
                        </Text>
                        <Text style={result_style.rank_Text}>
                            총 {user_count}명 중 {user_rank}등 입니다
                        </Text>
                        <View style={result_style.rank_content}>
                            <Image source={imgSrc} style={{ width: 100, height: 100, marginBottom: 30 }} />
                            <Text style={result_style.rank_descript2}>{message2}</Text>
                            <Text style={result_style.rank_descript}>{message}</Text>
                        </View>
                        <CustomButton
                            title="공유하기"
                            style={result_style.address_button}
                            textStyle={result_style.address_button_text}
                            onPress={handleShare}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ResultScreen;