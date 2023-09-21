import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';

// 이미지 리소스
import smile_img from './imgs/smile.png';
import eye_tracking_img from './imgs/eye_tracking.png';
import location_img from './imgs/location.png';
import survey_img from './imgs/survey.png';
import eye_il from './imgs/eye_il.png';
import location_il from './imgs/location_il.png'
import checking_il from './imgs/main_checking_il.png'
import logo_icon from './imgs/icon.png'


// 라우터 경로
import BLINK from './routes/blink.js';
import LOGIN from './routes/login.js';
import REGISTER from './routes/register.js';
import RESULT from './routes/result.js';
import PROCESS from './routes/process.js';
import MAP from './routes/map.js'


function App() {
  const navigate = useNavigate();
  const loginPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    setStyle('')
  }, [])

  const [style, setStyle] = useState(false);

  const handleMouseEnter = () => {
    setStyle('hover');
  };

  const handleMouseLeave = () => {
    setStyle('non_hover');
  };

  return (
    <div className='App'>
      <div
        className={'NavBar ' + style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        s
      >
        <div className='NavLogo'><Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <img className='Logo_icon' src={logo_icon} alt="" />
        </Link></div>
        <ul className='NavContents'>
          <li><Link to="/blink" style={{ textDecoration: "none", color: "black" }}>눈 깜박임 감지</Link></li>
          <li><Link to="/map" style={{ textDecoration: "none", color: "black" }}>주변 안과 찾기</Link></li>
          <li>간편진단</li>
          <li>커뮤니티</li>
        </ul>
        <Button variant="light" className='Nav_login' onClick={loginPage}>로그인</Button>
      </div>
      <Routes>
        <Route path="/" element={<MAIN loginPage={loginPage} />} />
        <Route path="/blink" element={<BLINK />} />
        <Route path="/login" element={<LOGIN />} />
        <Route path='/register' element={<REGISTER />} />
        <Route path='/result' element={<RESULT />} />
        <Route path='/process' element={<PROCESS />} />
        <Route path='/map' element={<MAP />} />


      </Routes>
      <div className='Footer'>
        <div className='Footer_Text Text_Medium'>
          아이 좋아
        </div>
        <div className='Footer_SubText Text_small'>
          동양미래대학교 컴퓨터 소프트 공학과 3학년 YC반 <br /><br />
          이창우 20192662 임성민 20191837 <br />
          박재승 20170710 유영환 20173879
        </div>
      </div>
    </div >
  );
}

function MAIN(props) {
  return (
    <div className='MainContents'>
      <div className='Main_Logo'>
        <div className='Logo_Text_main Text_Medium'>
          눈이 아픈 당신을 위해
        </div>
        <div className='Logo_Text_sub Text_Large'>
          아이 러브 유
        </div>
        <div className='Logo_image'>
          <img className='Logo_image' src={smile_img} alt="" />
          <Button variant="light" className='Main_Button' onClick={props.loginPage}>시작하기</Button>
        </div>
      </div>
      {/* 메인로고 */}
      <div className='Main_Content_1'>
        <div className='Content_title Text_Medium'>
          간단한 클릭으로 진행되는<br />
          나만의 안구 건강 도우미
        </div>
        <div className='Content_subtitle Text_small'>
          아이러브유는 사용자의 안구 건강을 위해 <br />
          다양한 기능을 제공합니다!
        </div>
        <div className='Content_1_content'>
          <div className='Content_1_contentbox'>
            <img className='Content_1_content_icon' src={eye_tracking_img} alt="" />
            <div className='Content_1_content_text Text_Title'>
              눈 깜빡임 측정
              <div className='Text_small'>사용자의 눈 깜빡임을 측정하여
                시각화 자료로 제공합니다</div>
            </div>
            <div className='Content_1_more'> 자세히 >></div>
          </div>
          <div className='Content_1_contentbox' style={{ backgroundColor: '#F8F9FA' }}>
            <img className='Content_1_content_icon' src={location_img} alt="" />
            <div className='Content_1_content_text Text_Title'>
              주변 안과/안경원 탐색
              <div className='Text_small'>사용자의 위치를 기반으로한 안과 및 안경원의 위치를 제공합니다</div>
            </div>
            <div className='Content_1_more'> 자세히 >></div>
          </div>
          <div className='Content_1_contentbox'>
            <img className='Content_1_content_icon' src={survey_img} alt="" />
            <div className='Content_1_content_text Text_Title'>
              간편 6대 안질환 측정
              <div className='Text_small'>간단한 설문조사를 통해 사용자의 6대 안질환 상태진단을 제공합니다</div>
            </div>
            <div className='Content_1_more'> 자세히 >></div>
          </div>
        </div>
      </div>
      {/* 컨텐츠1 */}
      <div className='Main_Content_2'>
        <div className='Content_2_left'>
          <div className='Content_title Text_Medium'>
            Blink Detect 프로그램을 활용한 <br />
            눈 깜박임 측정 기능
          </div>
          <div className='Content_subtitle Text_small'>
            카메라를 통해 자신의 눈 건강 상태를 측정하고
            내 습관을 점검하세요
          </div>
          <div className='Content_Textbox Text_small'>
            사용자의 눈 깜빡임을 지속적으로 감지하여
            데이터로 저장하고, 사용자에게 제공합니다 <br /> <br />
            자신의 안구습관을 점검하고
            평균과 어느 정도의 차이가 있는지 확인하세요<br /><br />
            또한 아이러브유의 다른 회원들과 자신의 안구 습관을 비교해보세요<br />
            <Button variant="light" className='Main_Button'>시작하기</Button>
          </div>
        </div>
        <div className='Content_2_right'>
          <img className="Content_2_img" src={eye_il} alt=''></img>
        </div>
      </div>
      {/* 컨텐츠2 */}
      <div className='Main_Content_3'>
        <div className='Content_3_left'>
          <img className="Content_3_img" src={location_il} alt=''></img>
        </div>
        <div className='Content_3_right'>
          <div className='Content_title Text_Medium'>
            주변 안과 및 안경원 탐색
          </div>
          <div className='Content_subtitle Text_small Cont3_Ctr'>
            입력정보를 기반으로 한 내 주변의 안과와 안경원을
            지금 바로 확인해보세요
          </div>
          <div className='Content_Textbox Text_small'>
            지도 API를 통해 사용자의 데이터를 기반으로 주변 안경원 및 안과 지도를 제공합니다
            <br /><br />
            아이 러브 유를 통해 내 주변의 안과와 안경원의 위치를 한눈에 확인하세요!
            <br />
            <Button variant="light" className='Content_3_Main_Button'>시작하기</Button>
          </div>
        </div>
      </div>
      {/* 컨텐츠3 */}
      <div className='Main_Content_2'>
        <div className='Content_2_left'>
          <div className='Content_title Text_Medium'>
            간편 6대 안질환 측정<br />
          </div>
          <div className='Content_subtitle Text_small'>
            간단한 설문조사를 진행하여 6대 안질환에 대해 점검해보세요
          </div>
          <div className='Content_Textbox Text_small'>
            간단한 설문조사를 통해 6대 안질환에 관련된 위험성 점검을 제공합니다
            <br /> <br />
            아이 러브 유를 통해 클릭을 통해 간단하게 내 안구 습관을 점검하세요!<br />
            <Button variant="light" className='Main_Button'>시작하기</Button>
          </div>
        </div>
        <div className='Content_2_right'>
          <img className="Content_2_img" src={checking_il} alt=''></img>
        </div>
      </div>
      {/* 컨텐츠4 */}
    </div>
  )
}

export default App;
