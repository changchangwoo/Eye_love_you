import { Image, Text, View } from 'react-native';
import { share_style, result_style } from '../styles/Css';
import { useEffect, useRef, useState } from 'react';

const ShareScreen = ({ navigator, route }) => {
    const userdata = route.params.userdata;
    const percent = route.params.percent;
    const user_count = route.params.user_count;
    const user_rank = route.params.user_rank;
    const user_time = route.params.user_time;
    const user_bc = route.params.user_bc;
    const user_wc = route.params.user_wc;
    const user_userTbts = route.params.user_userTbts;
    const [imgSrc, setImgSrc] = useState('');
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [altText, setAltText] = useState('');

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
    }, []);

    return (
        <View style={share_style.container}>
            <View style={share_style.share_box}>
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
                </View>
                <View style={share_style.share_main}>
                    <View style={share_style.share_main_left_box}>
                        <Text style={share_style.share_main_text}>총 작동 시간</Text>
                        <Text style={share_style.share_main_text}>눈 깜박임 횟수</Text>
                        <Text style={share_style.share_main_text}>경고음 출력 횟수</Text>
                        <Text style={share_style.share_main_text}>눈 깜박임 주기</Text>
                    </View>
                    <View style={share_style.share_main_right_box}>
                        <Text style={share_style.share_main_text_num}>{user_time} 초</Text>
                        <Text style={share_style.share_main_text_num}>{user_bc} 회</Text>
                        <Text style={share_style.share_main_text_num}>{user_wc} 회</Text>
                        <Text style={share_style.share_main_text_num}> {user_userTbts} </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ShareScreen;
