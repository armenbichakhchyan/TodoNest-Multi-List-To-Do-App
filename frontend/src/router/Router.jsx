import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,

} from "react-router-dom";


import Home from '../pages/Home.jsx'

import MainLayout from '../pages/MainLayout.jsx';
import NotFound from '../pages/NotFound.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<Home />}>
                <Route path='/' element={<MainLayout />}/>
            </Route>

            <Route path='404' element={<NotFound />}/>
            <Route path='*' element={<Navigate to='404' replace />}/>
        </>
    )
)
export default router;