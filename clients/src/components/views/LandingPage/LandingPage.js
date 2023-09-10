import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth"
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import your custom CSS file

function LandingPage() {
    const navigate = useNavigate();

    const [isIdVisible, setIsIdVisible] = useState(false);

    useEffect(() => {
        axios
            .get('/api/users/auth')
            .then(response => {
                if (response.data.isAuth) {
                    setIsIdVisible(true);
                } else {
                    setIsIdVisible(false);
                }
            })
            .catch(error => {
                console.error(error);
                setIsIdVisible(false);
            });
    }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    alert("로그아웃 되었습니다.")
                    setIsIdVisible(false);
                    navigate('/');
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            });
    }

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h2>시작페이지</h2>
                {isIdVisible && <button id="out" onClick={onClickHandler}>Logout</button>}
            </div>
            <div className="landing-links">
                <ul>
                    <li>
                        <Link to="/Login" className="landing-link">로그인</Link>
                    </li>
                    <li>
                        <Link to="/Register" className="landing-link">회원가입</Link>
                    </li>
                    <li>
                        <Link to="/post" className="landing-link">게시판</Link>
                    </li>
                    <li>
                        <Link to="chat" className="landing-link">채팅</Link>
                    </li>
                    <li>
                        <Link to="cal/epl" className="landing-link">잉글랜드</Link>
                    </li>
                    <li>
                        <Link to="cal/laliga" className="landing-link">스페인</Link>
                    </li>
                    <li>
                        <Link to="cal/ligue1" className="landing-link">프랑스</Link>
                    </li>
                    <li>
                        <Link to="cal/seriea" className="landing-link">이탈리아</Link>
                    </li>
                    <li>
                        <Link to="cal/bundesliga" className="landing-link">독일</Link>
                    </li>
                    <li>
                        <Link to="team" className="landing-link">팀 분석</Link>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    );
}

export default Auth(LandingPage, null);
