import React from 'react';
import { useTranslation } from 'react-i18next';


const Header = () => {
    const {i18n } = useTranslation();
    const changeLanguage = (event) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__left">
                    <h2 className='header__welcome'>Welcome</h2>
                </div>

                <div className="header__right">
                    <select className="languages__select" onChange={changeLanguage} value={i18n.language}>
                        <option value='hy'>🇦🇲Հայերեն</option>
                        <option value='en'>🇺🇸English</option>
                        <option value='ru'>🇷🇺Русский</option>
                    </select>
                </div>
            </div>
        </header>
    );
};

export default Header;