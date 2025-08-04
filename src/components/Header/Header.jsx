import React from 'react';
import { useTranslation } from 'react-i18next';
import LogOut from "../LogOutSvg/LogOut.jsx";
import {useNavigate} from "react-router-dom";

const Header = ({ user}) => {
    const {i18n } = useTranslation();
    const navigate = useNavigate();


    const changeLanguage = (event) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__left">
                    <h2 className='header__welcome'>{user.username}</h2>
                </div>

                <div className="header__right">
                    <select className="languages__select" onChange={changeLanguage} value={i18n.language}>
                        <option value='hy'>🇦🇲Հայերեն</option>
                        <option value='en'>🇺🇸English</option>
                        <option value='ru'>🇷🇺Русский</option>
                    </select>

                    <div className='log__out__block' onClick={() => navigate('/sign-in')}>
                        <LogOut
                            width={100}
                            height={100}
                            color="white"
                            style={{ cursor: 'pointer' }}

                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;