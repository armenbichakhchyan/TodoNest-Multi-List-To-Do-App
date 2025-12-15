import React from 'react';
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Home = () => {

    return (
        <div className='wrapper'>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
