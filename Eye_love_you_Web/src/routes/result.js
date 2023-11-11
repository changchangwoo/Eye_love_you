import React, { useEffect, useState } from 'react';
import { BarChart, PieChart, Pie, Cell, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import low_result_smile from '../imgs/low_result_smile.png'
import normal_result_smile from '../imgs/normal_result_smile.png'
import high_result_smile from '../imgs/high_result_smile.png'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Result() {
    const [userdata, setuserData] = useState('');
    const [username, setUsername] = useState('');
    const [percent, setPercent] = useState(0);
    const [imgSrc, setImgSrc] = useState('');
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [altText, setAltText] = useState('');

    // 유저 전체 평균
    const time = userdata.timeAvg;
    const blink_count = userdata.allBTpM;
    const warning_count = userdata.allWCpM;
    const blink_cycle = userdata.cycleAvg;

    // 사용자 평균 데이터
    const user_time = userdata.userTot;
    const user_bc = userdata.userBc;
    const user_wc = userdata.userWCpM;
    const user_userTbts = userdata.userBTpM;
    const blink_ratio = userdata.blinkRatio;
    const warning_ratio = userdata.warningRatio;

    // 사용자 및 등수
    const user_count = userdata.count;
    const user_rank = userdata.userRank;

    const navigate = useNavigate();
    const { Kakao } = window;

    useEffect(() => {
        const userid = sessionStorage.getItem('userinfo');
        const username = sessionStorage.getItem('username');
        console.log(user_userTbts)
        const infoData = async () => {
            const update_userid = userid.replace(/"/g, '');
            const update_username = username.replace(/"/g, '');
            try {
                const response = await axios.post('http://localhost:8080/info', {
                    userId: update_userid
                })
                setuserData(response.data);
                setUsername(update_username);
            } catch (error) {
                alert('눈 깜박임 측정 데이터가 있어야 결과화면을 확인 할 수 있습니다');
                navigate('/')
            }
        }
        if (userid) {
            infoData();
        } else {
            navigate("/login");
            alert('로그인이 필요한 서비스입니다.');
        }
    }, [navigate]);

    useEffect(() => {
        Kakao.cleanup();
        Kakao.init('70a48bb65a66f0db8c8179e585892d00');
        // 카카오 공유하기 init
        const calc_data = (user_rank / user_count) * 100;
        setPercent(calc_data)
        // 내 데이터 퍼센트 측정 변수

    }, [percent, user_count, user_rank, Kakao])

    useEffect(() => {
        if (percent > 70) {
            setMessage('다른 아이 러브 유 회원들 보다 다소 아쉬운 데이터에요');
            setMessage2('안구 건강을 위해고 조금만 더 힘내봐요ㅜ');
            setAltText('30 Points');
            setImgSrc(low_result_smile);
        } else if (percent > 30 && percent < 70) {
            setMessage('다른 아이 러브 유 회원들과 비슷한 데이터에요');
            setMessage2('오늘도 계속해서 나아지고 있어요!');
            setAltText('60 Points');
            setImgSrc(normal_result_smile);
        } else if (percent < 30) {
            setMessage('다른 아이 러브 유 회원들 보다 훨씬 좋은 데이터에요');
            setMessage2('멋져요! 최고의 결과에요');
            setAltText('90 Points');
            setImgSrc(high_result_smile);
        }
    }, [percent]);


    const kakaoShare = () => {
        Kakao.Share.sendCustom({
            templateId: 99204,
            templateArgs: {
                username: `${username}`,
                data1: `${user_time}`,
                data2: `${user_bc}`,
                data3: `${user_wc}`,
                data4: `${user_userTbts}`,
                count: `${user_count}`,
                rank: `${user_rank}`
            },
        });
    };

    const data_time = [
        {
            name: '내 작동 시간',
            count: user_time,
            fill: "#FBE3F0"
        },
        {
            name: '사용자 평균 작동 시간',
            count: time,
            fill: '#f4a3f7'

        },
    ];

    const data_count = [
        {
            name: '내 분당 눈 깜박임 횟수',
            count: user_userTbts,
            fill: "#FBE3F0"
        },
        {
            name: '사용자 평균',
            count: blink_count,
            fill: '#f4a3f7'

        },
        {
            name: '이상적인 분당 깜박임 횟수',
            count: 12,
            fill: '#FAD6FB'


        },
    ];

    const data_warning = [
        {
            name: '내 분당 경고음 출력 횟수',
            count: user_wc,
            fill: "#FBE3F0"
        },
        {
            name: '사용자 평균',
            count: warning_count,
            fill: '#f4a3f7'

        },
        {
            name: '이상적인 경고음 출력 횟수',
            count: 1,
            fill: '#FAD6FB'


        },
    ];

    const data_cycle = [
        {
            name: '내 눈 깜박임 주기',
            count: user_bc,
            fill: "#FBE3F0"
        },
        {
            name: '사용자 평균',
            count: blink_cycle,
            fill: '#f4a3f7'

        },
        {
            name: '이상적인 눈 깜박임 주기',
            count: 5,
            fill: '#FAD6FB'


        },
    ];

    const pieData = [
        { name: '경고음 출력 비율', value: warning_ratio },
        { name: '눈 깜박임 비율', value: blink_ratio },

    ];
    const colors = ['#FAD6FB', '#f4a3f7'];


    return (
        <div className='Result_Content'>
            <div className='Logo_Text_main Text_Medium'>
                {username} 님의
            </div>
            <div className='Logo_Text_sub Text_Large'>
                눈 깜박임 프로그램 결과
            </div>
            <div className='Result_Box'>
                <div className='Chart_Box'>
                    <div className='Chart_Graph'>
                        <BarChart className='Bar_1'
                            width={800}
                            height={400}
                            data={data_time}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#f4a3f7" />
                        </BarChart>
                    </div>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            작동 시간
                        </div>
                        <div className='Text_small'>최근에 아이 러브 유 프로그램을 {user_time}초 동안 동작하셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {time}초만큼 동작하였어요
                        </div>
                    </div>
                </div>
                {/* 차트1 */}
                <div className='Chart_Box'>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            분당 눈 깜박임 횟수
                        </div>
                        <div className='Text_small'>{username}님은 1분에 {user_userTbts}번만큼 눈을 깜박이셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {blink_count}번 깜박였네요
                            <br /> 이상적인 눈 깜박임은 분당 12번이에요
                        </div>
                    </div>
                    <div className='Chart_Graph'>
                        <BarChart className='Bar_1'
                            width={800}
                            height={400}
                            data={data_count}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#f4a3f7" />
                        </BarChart>
                    </div>
                </div>
                {/* 차트2 */}
                <div className='Chart_Box'>
                    <div className='Chart_Graph'>
                        <BarChart className='Bar_1'
                            width={800}
                            height={400}
                            data={data_warning}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#f4a3f7" />
                        </BarChart>
                    </div>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            분당 경고음 출력 횟수
                        </div>
                        <div className='Text_small'>{username}님은 1분에 {user_wc}번만큼 경고를 받으셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {warning_count}번 경고를 받으셨네요
                        </div>
                    </div>
                </div>
                {/* 차트3 */}
                <div className='Chart_Box'>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            눈 깜박임 주기
                        </div>
                        <div className='Text_small'>{username}님은 {user_bc}초 주기로 눈을 깜박이셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {blink_cycle}초 주기로 눈을 깜박여요
                            <br /> 이상적인 눈 깜박임 주기는 5초 정도에요
                        </div>
                    </div>
                    <div className='Chart_Graph'>
                        <BarChart className='Bar_1'
                            width={800}
                            height={400}
                            data={data_cycle}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#f4a3f7" />
                        </BarChart>
                    </div>
                </div>
                {/* 차트4 */}
                <div className='Chart_Box'>
                    <div className='Chart_Graph'>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            눈 깜박임/경고음 비율
                        </div>
                        <div className='Text_small'>
                            {username}님의 눈 깜박임 횟수 대 경고음 출력 횟수 비율은 {blink_ratio} : {warning_ratio} 이에요
                            <br /> 눈 깜박임 횟수 부분이 크면 눈 건강을 유지하는 데 노력하고 있다는 것을 의미해요
                        </div>
                    </div>
                </div>
                {/* 차트5 */}
                <div className='Logo_Text_main Text_Medium'>
                    {username} 님은 아이 러브 유 회원
                </div>
                <div className='Logo_Text_sub Text_Large'>
                    총 {user_count}명 중 {user_rank}등 입니다!
                </div>
                <div className='Text_Medium' style={{ textAlign: 'center' }}></div>
                <div>
                    <img className='Result_image' src={imgSrc} alt={altText} />
                    <div className='Text_small' style={{ textAlign: 'center', marginTop: '40px' }}>
                        {message}
                        <br />
                        {message2}
                    </div>
                </div>
                <div className='share_box'>
                    <div className='share_text'>
                        내 측정 결과를 다른사람에게 공유해보세요
                    </div>
                    <Button id="kakaotalk-sharing-btn" variant="light" className='share_Button' onClick={kakaoShare}>카카오톡 공유하기</Button>

                </div>
            </div>
        </div>
    )
}

export default Result;