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
        try {
            const response = await axios.post('http://localhost:8080/signup', {
                userId: inputId,
                password: inputPw,
                name: inputNName,
                email: inputEmail,
                homeAddress: inputAddr
            })
            if (response.data === '성공') {
                alert('회원가입 성공');
                navigate("/login");
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='Register_Content'>
            <div className="Register_Box">
                <div className='Logo_Text_sub Text_Medium'>
                    회원 가입
                    <br /><br />
                </div>
                <p style={{ marginTop: "100px;" }}></p>
                <div className="Input_box">
                    <div className="Input_text Text_small">
                        아이디
                    </div>
                    <div className="Input_Form">
                        <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="아이디 입력"
                            value={inputId}
                            onChange={handleInputId} />
                    </div>
                </div>
                <div className="Input_box">
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
                        style={{ backgroundColor: '#2F2E41', color: 'white', marginBottom: '10px' }}>주소찾기</Button>
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