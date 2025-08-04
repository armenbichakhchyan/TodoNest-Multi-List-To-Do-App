import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,

} from "react-router-dom";


import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import MainLayout from '../pages/MainLayout.jsx';
import NotFound from '../pages/NotFound.jsx'
import Register from "../pages/Register.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Navigate to="sign-in" />}/>
            <Route path='sign-in' element={<Login />}/>
            <Route path='sign-up' element={<Register />}/>

            <Route element={<Home />}>
                <Route index element={<Navigate to="user-home" />}/>
                <Route path='user-home' element={<MainLayout />}/>
            </Route>

            <Route path='404' element={<NotFound />}/>
            <Route path='*' element={<Navigate to='404' replace />}/>
        </>
    )
)
export default router;