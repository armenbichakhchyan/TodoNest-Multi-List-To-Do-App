import React from 'react';
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='wrapper'>
            <Header user={user} />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
