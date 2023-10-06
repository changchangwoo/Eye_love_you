import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import low_result_smile from '../imgs/low_result_smile.png'
import normal_result_smile from '../imgs/normal_result_smile.png'
import high_result_smile from '../imgs/high_result_smile.png'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Result() {
    const [userdata, setuserData] = useState('');
    const [username, setUsername] = useState('');
    const [percent, setPercent] = useState(0);
    const time = userdata.timeAvg;
    const blink_count = userdata.count;
    const warning_count = userdata.warningAvg;
    const blink_cycle = userdata.cycleAvg;
    const user_time = userdata.userTot;
    const user_bc = userdata.userBc;
    const user_wc = userdata.userWc;
    const user_userTbts = userdata.userTbts;
    const user_count = userdata.count;
    const user_rank = userdata.userRank;
    const navigate = useNavigate();

    useEffect(() => {
        const userid = sessionStorage.getItem('userinfo');
        const username = sessionStorage.getItem('username');
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
        const calc_data = (user_rank / user_count) * 100;
        setPercent(calc_data)
        console.log(percent)

    }, [percent, user_count, user_rank])

    const data_time = [
        {
            name: '내 데이터',
            count: user_time,
            fill: "#FBE3F0"
        },
        {
            name: '전체 사용자 평균 데이터',
            count: time,
            fill: '#f4a3f7'

        },
    ];

    const data_count = [
        {
            name: '내 데이터',
            count: user_userTbts,
            fill: "#FBE3F0"
        },
        {
            name: '평균 눈 깜박임 횟수 데이터',
            count: blink_count,
            fill: '#f4a3f7'

        },
        {
            name: '이상적인 눈 깜박임 횟수 데이터',
            count: 3,
            fill: '#FAD6FB'


        },
    ];

    const data_warning = [
        {
            name: '내 데이터',
            count: user_wc,
            fill: "#FBE3F0"
        },
        {
            name: '평균 경고음 출력 데이터',
            count: warning_count,
            fill: '#f4a3f7'

        },
        {
            name: '이상적인 경고음 출력 데이터',
            count: 3,
            fill: '#FAD6FB'


        },
    ];

    const data_cycle = [
        {
            name: '내 데이터',
            count: user_bc,
            fill: "#FBE3F0"
        },
        {
            name: '평균 눈 깜박임 주기 데이터',
            count: blink_cycle,
            fill: '#f4a3f7'

        },
        {
            name: '이상적인 눈 깜박임 주기 데이터',
            count: 3,
            fill: '#FAD6FB'


        },
    ];

    let message = '';
    let message2 = '';
    let imageSrc = '';
    let altText = '';

    if (percent > 70) {
        message = '다른 아이 러브 유 회원들 보다 다소 아쉬운 데이터에요';
        message2 = '안구 건강을 위해고 조금만 더 힘내봐요ㅜ'
        altText = '30 Points';
        imageSrc = low_result_smile;
    } else if (percent > 30 && percent < 70) {
        message = '다른 아이 러브 유 회원들과 비슷한 데이터에요';
        message2 = '오늘도 계속해서 나아지고 있어요!';
        altText = '60 Points';
        imageSrc = normal_result_smile;
    } else if (percent < 30) {
        message = '다른 아이 러브 유 회원들 보다 훨씬 좋은 데이터에요'
        message2 = '멋져요! 최고의 결과에요'
        imageSrc = high_result_smile;
    }

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
                            총 작동 시간
                        </div>
                        <div className='Text_small'>아이 러브 유 프로그램을 총 {user_time}초 동작하셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {time}초만큼 동작하였어요
                        </div>
                    </div>
                </div>
                {/* 차트1 */}
                <div className='Chart_Box'>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            눈 깜박임 횟수
                        </div>
                        <div className='Text_small'>프로그램을 실행하면서 총 {user_userTbts}번 눈을 깜박이셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {blink_count}번 깜박였네요
                            <br /> 이상적인 눈 깜박임은 몇번이에요
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
                            경고음 출력 횟수
                        </div>
                        <div className='Text_small'>프로그램을 실행하면서 총 {user_wc}번 경고를 받으셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {warning_count}번 경고를 받으셨네요
                            <br /> 아이 러브 유는</div>
                    </div>
                </div>
                {/* 차트3 */}
                <div className='Chart_Box'>
                    <div className='Chart_Descript'>
                        <div className='Logo_Text_main Text_Medium' style={{ marginTop: '150px' }}>
                            눈 깜박임 주기
                        </div>
                        <div className='Text_small'>프로그램을 실행하면서 보통 {user_wc} 주기로 눈을 깜박이셨어요
                            <br /> 아이러브유의 다른 사용자는 평균적으로 {blink_cycle} 주기로 눈을 깜박여요
                            <br /> 이상적인 눈 깜박임은 몇번이에요
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
                <div className='Logo_Text_main Text_Medium'>
                    {username} 님은 아이 러브 유 회원
                </div>
                <div className='Logo_Text_sub Text_Large'>
                    총 {user_count}명 중 {user_rank}등 입니다!
                </div>
                <div className='Text_Medium' style={{ textAlign: 'center' }}></div>
                <div>
                    <img className='Result_image' src={imageSrc} alt={altText} />
                    <div className='Text_small' style={{ textAlign: 'center', marginTop: '40px' }}>
                        {message}
                        <br />
                        {message2}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result;