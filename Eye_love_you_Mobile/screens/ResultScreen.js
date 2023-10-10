import { useEffect, useRef, useState } from "react";
import React from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Alert, Dimensions, ScrollView, Text, View } from 'react-native';
import { result_style } from '../styles/Css';



const ResultScreen = ({ navigation, route }) => {
    const [userdata, setUserData] = useState('');
    const [infodata, setInfodata] = useState('');
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
            fetch('http://172.30.1.98:8080/info', {
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
                    console.log('안녕', responseData);
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

    const chartConfig = {
        backgroundGradientFrom: 'white', // 배경색을 하얀색으로 설정
        backgroundGradientTo: 'white',   // 배경색을 하얀색으로 설정
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // 막대 색상 설정
        style: {
            borderRadius: 16,
        },
    };

    const data = {
        labels: [userdata.name + '님', '전체 회원 평균'],
        datasets: [
            {
                data: [time, user_time],
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

    return (
        <View style={result_style.container}>
            <Text style={result_style.end_logo}>{userdata.name}님의 눈 깜박임 데이터</Text>
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
                                {userdata.name}님은 프로그램을 총 {time}초 동작하셨어요
                                {'\n'}아이러브유의 다른 사용자들은 평균적으로 {user_time}초만큼 동작하였어요
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
                            총 몇명중 몇명입니다
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ResultScreen;