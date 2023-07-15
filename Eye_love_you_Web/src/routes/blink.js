import React from 'react';
import Slider from 'react-slick';
import '../App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import cat_smile_img from '../imgs/cat_smile.png';
import logo_icon from '../imgs/icon.png'
import compare_img from '../imgs/checking_il.png'
import speaker_img from '../imgs/speaker.png'
import webcam_img from '../imgs/webcam.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Blink() {
    const navigate = useNavigate();
    const resultpage = () => {
        navigate("/result");
    };

    const onClickInstaller = async () => {
        try {
            const response = await axios.get('http://localhost:8080/installer', {
                responseType: 'blob',
            });
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'GUI.zip');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('파일 다운로드 중 오류 발생:', error);
        }
    };

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="Blink_Content">
            <Slider {...settings} className='Blink_Slider'>
                <div className='Main_Logo'>
                    <div className='Logo_Text_main Text_Medium'>
                        눈이 아픈 당신을 위해
                    </div>
                    <div className='Logo_Text_sub Text_Large'>
                        눈 깜박임 감지 프로그램
                    </div>
                    <div className='Logo_image'>
                        <img className='Logo_image' src={cat_smile_img} alt="" />
                        <Button variant="light" className='Main_Button' onClick={onClickInstaller}>시작하기</Button>
                        <Button variant="light" className='Main_Button' onClick={resultpage}>결과보기</Button>
                    </div>
                </div>
                {/* 슬라이드1 */}
                <div className='Main_Logo'>
                    <div className='Logo_Text_main Text_Medium'>
                        STEP1
                    </div>
                    <div className='Logo_Text_sub Text_Large'>
                        필요한 디바이스
                    </div>
                    <div className='descript_box'>
                        <div className='descript_box_img'>
                            <img className='des_img' src={speaker_img} alt="" />
                            <img className='des_img' src={webcam_img} alt="" />
                            <br />
                        </div>
                        <div className='descript_box_text Text_small'>
                            아이러브유에서 제공하는 눈깜박임 감지 기능은
                            사용자의 카메라 디바이스를 통해 실시간 눈 깜박임을 감지합니다 <br />
                            눈 깜박임 감지 기능의 원활한 동작을 위해 <br />다음과 같은 디바이스를 요구합니다<br /><br />
                            <p style={{ fontWeight: 'bolder' }}>- 웹 카메라<br /></p>
                            <p style={{ fontWeight: 'bolder' }}>- 사운드 출력장치<br /></p>                        </div>
                    </div>
                </div>
                {/* 슬라이드2 */}
                <div className='Main_Logo'>
                    <div className='Logo_Text_main Text_Medium'>
                        STEP2
                    </div>
                    <div className='Logo_Text_sub Text_Large'>
                        프로그램 설치
                    </div>
                    <div className='descript_box'>
                        <div className='descript_box_text Text_small'>
                            아이 러브 유에서 제공하는 눈깜박임 감지 기능은<br />
                            아이러브유 자체 프로그램 설치를 요구합니다 <br /><br />
                            하단 버튼의 클릭을 통해서 눈 깜박임 감지 프로그램의 <br />
                            설치를 도움받을 수 있습니다<br /><br /><br />
                            <Button variant="light" className='install_button' onClick={onClickInstaller}>설치하기</Button>
                        </div>
                        <div className='descript_box_img'>
                            <img className='descript_img' src={logo_icon} alt="" />
                            <br />
                            [ 눈 깜박임 감지 프로그램 실행 파일 ]
                        </div>
                    </div>
                </div>
                {/* 슬라이드3 */}
                <div className='Main_Logo'>
                    <div className='Logo_Text_main Text_Medium'>
                        STEP3
                    </div>
                    <div className='Logo_Text_sub Text_Large'>
                        제공하는 기능
                    </div>
                    <div className='descript_box'>
                        <div className='descript_box_text2 Text_small'>
                            <div className='des_'>사용시간</div>
                            프로그램의 총 동작시간을 확인할 수 있습니다
                            <div className='des_'>눈 깜박임 횟수 측정</div>
                            사용자의 눈 깜박임을 감지하고 횟수를 제공합니다
                            <div className='des_'>경고음 출력</div>
                            사용자가 일정시간 이상 눈을 깜박이지 않음을 감지하면 경고음을 출력합니다
                        </div>
                        <div className='descript_box_text2 Text_small'>
                            <div className='des_'>눈 깜박임 주기 측정</div>
                            사용자의 눈 깜박임 주기 횟수를 측정합니다
                            <div className='des_'>자동정지</div>
                            사용자가 눈을 감고 있으면 자동으로 측정을 멈춥니다
                            <div className='des_'>경고음 횟수 출력</div>
                            경고음 출력 시 출력 횟수를 저장하여 제공합니다
                        </div>
                    </div>
                </div>
                {/* 슬라이드4 */}
                <div className='Main_Logo'>
                    <div className='Logo_Text_main Text_Medium'>
                        STEP4
                    </div>
                    <div className='Logo_Text_sub Text_Large'>
                        안구 건조 습관 확인
                    </div>
                    <div className='descript_box'>
                        <div className='descript_box_img'>
                            <img className='descript_img' src={compare_img} alt=""
                                style={{ width: '85%', height: '85%', margin: 'auto' }} />
                            <br />
                        </div>
                        <div className='descript_box_text2 Text_small'
                            style={{ marginTop: '100px' }}>
                            측정한 데이터를 시각화 자료와 함께 한눈에 확인하세요<br />
                            <br />
                            이상적인 수치 보다 얼마나 더 눈을 떴을까요?
                            <br />
                            경고음이 이전보다 몇 번 더 출력했을까요?
                            <br />
                            아이 러브 유 회원 사이에서 내 안구 순위는 몇등 일까요?
                            <div className='des_'>내 눈은 어제보다 얼마나 더 나아졌을까요?</div>
                            <Button variant="light" className='install_button'
                                style={{ marginTop: '50px' }} onClick={resultpage}>확인하기</Button>

                        </div>

                    </div>
                </div>
            </Slider >
        </div >
    )
}

export default Blink;