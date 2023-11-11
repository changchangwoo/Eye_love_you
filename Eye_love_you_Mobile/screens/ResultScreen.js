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

    // 유저 전체 평균
    const time = infodata.timeAvg;
    const blink_count = infodata.allBTpM;
    const warning_count = infodata.allWCpM;
    const blink_cycle = infodata.cycleAvg;

    // 사용자 평균 데이터
    const user_time = infodata.userTot;
    const user_bc = infodata.userBTpM; // 주기
    const user_wc = infodata.userWCpM;
    const user_userTbts = infodata.userBTpM;
    const [blink_ratio, setBlinkratio] = useState();
    const [warning_ratio, setWarningratio] = useState();

    // 사용자 및 등수
    const user_count = infodata.count;
    const user_rank = infodata.userRank;

    useEffect(() => {
        try {
            const userdata = route.params.userdata
            setUserData(userdata)
            const userid = userdata.userId
            fetch('https://port-0-eye-love-you-7lk2bloqwhkr1.sel5.cloudtype.app/info', {
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
                    setBlinkratio(responseData.blinkRatio);
                    setWarningratio(responseData.warningRatio);
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
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        legend: {
            enabled: true,
            textSize: 12,
            textColor: 'black',
            position: 'bottom', // legend를 아래로 배치
        },
    };

    const NavShare = () => {
        navigation.navigate('Share', {
            userdata: userdata, percent: percent, user_count: user_count, user_rank: user_rank,
            user_time: user_time, user_bc: user_bc, user_wc: user_wc, user_userTbts: user_userTbts
        })
    }

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
                data: [user_userTbts, blink_count, 12]
            },
        ],
    };

    const data_warning_count = {
        labels: [userdata.name + '님', '전체 회원 평균', '이상적 데이터'],
        datasets: [
            {
                data: [user_wc, warning_count, 1],
            },
        ],
    };

    const data_cycle = {
        labels: [userdata.name + '님', '전체 회원 평균', '이상적 데이터'],
        datasets: [
            {
                data: [user_bc, blink_cycle, 5],
            },
        ],
    };

    const data_ratio = [
        {
            name: "눈 깜박임 횟수",
            population: blink_ratio,
            color: "#FBE3F0",
            legendFontColor: "black",
            legendFontSize: 12
        },
        {
            name: "경고음 횟수",
            population: warning_ratio,
            color: "#2F2E41",
            legendFontColor: "black",
            legendFontSize: 12
        }
    ];

    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffset / windowWidth);
        setCurrentIndex(index);
    };

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
                    contentContainerStyle={{ width: Dimensions.get('window').width * 6 }} // 400% 크기
                >
                    {/* 총 작동 시간 (차트1) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 작동 시간</Text>
                        </View>
                        <View style={result_style.chart_data}>
                            <BarChart
                                data={data}
                                width={Dimensions.get('window').width - 50}
                                height={250}
                                chartConfig={chartConfig}
                            />
                        </View>
                        <View style={result_style.chart_descript}>
                            <Text style={result_style.chart_descript_text}>
                                최근에 아이 러브 유 프로그램을 {user_time}초 동안 동작하셨어요
                                {'\n'}아이러브유의 다른 사용자들은 평균적으로 {time}초만큼 동작하였어요
                            </Text>
                        </View>
                    </View>
                    {/* 눈 깜박임 횟수 (차트2) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 분당 눈 깜박임 횟수</Text>
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
                                {userdata.name}님은 1분에 {user_userTbts}번만큼 눈을 깜박이셨어요
                                {'\n'}아이러브유의 다른 사용자는 평균적으로 {blink_count}번 깜박였네요
                                {'\n'}이상적인 눈 깜박임은 분당 12번이에요
                            </Text>
                        </View>
                    </View>
                    {/* 경고음 출력 횟수 (차트3) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 분당 경고음 출력 횟수</Text>
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
                                {userdata.name}님은 1분에 {user_wc}번만큼 경고를 받으셨어요
                                {'\n'}아이러브유의 다른 사용자는 평균적으로 {warning_count}번 경고를 받았어요
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
                                {userdata.name}님은 {user_bc}초 주기로 눈을 깜박이셨어요
                                {'\n'}아이러브유의 다른 사용자는 평균적으로 {blink_cycle}초 주기로 눈을 깜박여요
                                {'\n'}이상적인 눈 깜박임 주기는 5초 정도에요
                            </Text>
                        </View>
                    </View>
                    {/* 눈 깜박임 대 경고음 출력 비율 (차트5) */}
                    <View style={result_style.data_chart}>
                        <View style={result_style.chart_name}>
                            <Text style={result_style.chart_name_text}> 눈 깜박임/경고음 비율</Text>
                        </View>
                        {blink_ratio && warning_ratio ? (
                            <View style={result_style.chart_data}>
                                <PieChart
                                    data={data_ratio}
                                    width={Dimensions.get('window').width - 70} // 그래프 너비
                                    height={170}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                />
                            </View>
                        ) : (
                            <View style={result_style.chart_descript}>
                                <Text style={result_style.chart_descript_text}>
                                    눈 깜박임 및 경고음 출력 비율 데이터가 없습니다.
                                </Text>
                            </View>
                        )}
                        <View style={result_style.chart_descript}>
                            <Text style={result_style.chart_descript_text}>
                                {userdata.name}님의 눈 깜박임 별 경고음 출력 비율은
                                {'\n'}   {blink_ratio} 대 {warning_ratio} 이에요
                            </Text>
                        </View>
                    </View>
                    {/* 결과 및 등수화면 (차트는 아니지만 6) */}
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
                            title="상세 정보"
                            style={result_style.address_button}
                            textStyle={result_style.address_button_text}
                            onPress={NavShare}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ResultScreen;