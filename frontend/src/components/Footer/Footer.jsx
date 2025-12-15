import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer>
            <div className="container">
                <p className='footer__copyright'>&copy; {t ('footer')} </p>
            </div>
        </footer>
    );
};

export default Footer;