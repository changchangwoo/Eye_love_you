import React, { useState } from 'react';
import '../App.css';
import smile_img from '../imgs/love_il.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const navigate = useNavigate();
    const registerPage = () => {
        navigate("/register");
    };

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onClickLogin = async () => {
        try {
            const response = await axios.post('https://3d20-218-51-29-138.ngrok-free.app/login', {
                userId: inputId,
                password: inputPw,
            })
            if (response.data === '') {
                alert('로그인 실패');
            }
            else { // 로그인 성공
                console.log(response.data)
                sessionStorage.setItem('userinfo', JSON.stringify(response.data.userId));
                sessionStorage.setItem('usermap', JSON.stringify(response.data.homeAddress));
                sessionStorage.setItem('username', JSON.stringify(response.data.name));
                navigate("/");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='Login_Content'>
            <div className='Login_Box'>
                <div className='Login_Box_form'>
                    <div className='Logo_Text_main Text_Medium'>
                        눈이 아픈 당신을 위해
                    </div>
                    <div className='Logo_Text_sub Text_Large'>
                        아이 러브 유
                    </div>
                    <div className='Login_Form'>
                        <Form.Control className='Login_Text' size="lg" type="text" placeholder="아이디"
                            name="input_id"
                            value={inputId}
                            onChange={handleInputId} />
                        <Form.Control className='Login_Text' size="lg" type="password" placeholder="비밀번호"
                            name="input_pw"
                            value={inputPw}
                            onChange={handleInputPw} />
                        <div className='Login_Form_Button'>
                            <Button variant="light" className='Login_Button' onClick={onClickLogin}>로그인</Button>
                            <Button variant="light" className='Register_Button' onClick={registerPage}>혹시 처음이신가요?</Button>
                        </div>
                    </div>
                </div>
                <div className='Login_Box_img'>
                    <img className='Login_img' src={smile_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login;