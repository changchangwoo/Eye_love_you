import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputNName, setInputNName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputAddr, setInputAddr] = useState("");
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [idcheck, setIdcheck] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        script.onload = handleScriptLoad;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleScriptLoad = () => {
    };

    const handleComplete = (data) => {
        let addr = '';
        if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
        } else {
            addr = data.jibunAddress;
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setInputAddr(addr)
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById('sample6_address').value = addr;
    };

    const execDaumPostcode = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: handleComplete,
            }).open();
        } else {
            console.error('Daum Postcode script not loaded.');
        }
    };

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const handleInputNName = (e) => {
        setInputNName(e.target.value);
    };

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputAddr = (e) => {
        console.log('동작')
        setInputAddr(e.target.value);
    };


    const onClickRegistser = async () => {
        console.log(inputId, inputPw, inputNName, inputEmail, inputAddr)
        if (idcheck) {
            try {
                const response = await axios.post('http://localhost:8080/signup', {
                    userId: inputId,
                    password: inputPw,
                    name: inputNName,
                    email: inputEmail,
                    homeAddress: inputAddr
                })
                if (response.data === '성공') {
                    alert('아이러브유 회원이 된 것을 환영합니다');
                    navigate("/login");
                } else {
                    alert(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('아이디 중복확인을 체크해주세요');
        }
    };

    const onClickCheckID = async () => {
        try {
            const response = await axios.post('http://localhost:8080/signup/check', {
                userId: inputId,
            })
            console.log(response.data)
            if (response.data === true) {
                document.querySelector(".check_text").textContent = "이미 사용중인 아이디에요"
                document.querySelector(".check_text").style.color = "red";
                setIdcheck(false)
            } else {
                document.querySelector(".check_text").textContent = "사용 가능한 아이디에요"
                document.querySelector(".check_text").style.color = "green";
                setIdcheck(true)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='Register_Content'>
            <div className="Register_Box">
                <p style={{ marginTop: "40px" }}></p>
                <div className='Logo_Text_sub Text_Medium'>
                    회원 가입
                    <br /><br />
                </div>
                <div className="Input_box">
                    <div className="Input_text Text_small">
                        아이디
                    </div>                    <p>　</p>
                    <div className="Input_Form" style={{ marginBottom: "10px" }}>
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="아이디 입력"
                            value={inputId}
                            onChange={handleInputId} />
                    </div>
                    <div style={{ display: 'flex', float: 'left' }}>
                        <Button variant="light" className='Nav_login' onClick={onClickCheckID}
                            style={{ backgroundColor: '#2F2E41', color: 'white', marginBottom: '10px' }}> 중복 확인 </Button>
                        <div className='check_text'> 아이디 중복 확인을 해주세요 </div>

                    </div>
                </div>
                <div className="Input_box" style={{ marginTop: '60px' }}>
                    <div className="Input_text Text_small">
                        비밀번호
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="password" placeholder="비밀번호 입력"
                            value={inputPw}
                            onChange={handleInputPw} />
                    </div>
                </div>
                <div className="Input_box">
                    <div className="Input_text Text_small">
                        비밀번호 확인
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="password" placeholder="비밀번호 재입력" />
                    </div>
                </div>
                <div className="Input_box">
                    <div className="Input_text Text_small">
                        닉네임
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="닉네임 입력"
                            value={inputNName}
                            onChange={handleInputNName} />
                    </div>
                </div>
                <div className="Input_box">
                    <div className="Input_text Text_small">
                        이메일
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="email@example"
                            value={inputEmail}
                            onChange={handleInputEmail} />
                    </div>
                </div>
                <div className="Input_box">
                    <div className="Input_text Text_small">
                        주소
                    </div>
                    <p>　</p>
                    <Button variant="light" className='Nav_login' onClick={execDaumPostcode}
                        style={{ backgroundColor: '#2F2E41', color: 'white', marginBottom: '10px' }}> 주소 검색 </Button>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="우편 번호" id="sample6_postcode"
                            value={postcode} />
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="주소" id="sample6_address"
                            value={address}
                            onChange={handleInputAddr} />
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="상세주소" />
                    </div>
                </div>
                <div className='Register_form_Button'>
                    <Button variant="light" className='R_Register_Button' onClick={onClickRegistser}>아이 러브 유 시작하기</Button>
                </div>
            </div>
        </div>
    )
}

export default Register;