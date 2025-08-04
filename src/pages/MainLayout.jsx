import React from 'react';
import Lists from '../features/lists/Lists.jsx';
import Todos from "../features/todos/Todos.jsx";
const UserToDoPage = () => {
    return (
        <div className='main_layout'>
            <div className="container">
                <Lists />
                <Todos />
            </div>
        </div>
    );
};

export default UserToDoPage;