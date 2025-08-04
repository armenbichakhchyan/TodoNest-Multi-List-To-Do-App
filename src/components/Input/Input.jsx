import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Input = ({type = 'text', value, id, classname, name, onChange}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const resolved = type === "password" && isPasswordVisible ? "text" : type;

    return (
        <>
            {type === 'password' && (
                <div
                    className='change__types'
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                </div>
            )}

            <input
                type={resolved}
                value={value}
                name={name}
                id={id}
                className={classname}
                onChange={onChange}
            />
        </>
    );
};

export default Input;