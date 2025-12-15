import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';


const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal (
        <div  className="modal__overlay">
            <div className='modal__backdrop' onClick={onClose} />

            <div  className='modal__content'>
                <button className="modal-close" onClick={onClose}><FaTimes  /></button>
                {children}
            </div>
        </div>,
        document.getElementById('root-modal')
    );
};

export default Modal;