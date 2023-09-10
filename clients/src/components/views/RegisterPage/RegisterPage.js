import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
import './RegisterPage.css'; // CSS 파일을 import

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Confirm_Password, setConfirm_Password] = useState('');
    const [Phone, SetPhone] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirm_PasswordHandler = (event) => {
        setConfirm_Password(event.currentTarget.value);
    };

    const PhoneHandler = (event) => {
        SetPhone(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== Confirm_Password) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
            phone: Phone, // phone 추가
        };

        dispatch(registerUser(body)).then((response) => {
            console.log(response);
            if (response.payload.success) {
                navigate('/login');
            } else {
                alert('Failed!!');
            }
        });
    };

    return (
        <div className="register-page-container">
            <form className="register-form" onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={Confirm_Password}
                    onChange={onConfirm_PasswordHandler}
                />
                <label>Phone</label>
                <input type="tel" value={Phone} onChange={PhoneHandler} />
                <br />
                <button>회원가입</button>
            </form>
        </div>
    );
}

export default Auth(RegisterPage, false);
