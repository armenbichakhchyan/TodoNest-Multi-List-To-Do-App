import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {addList, addListInput, deleteList, openList} from '../../store/reducers/list.js';
import { useTranslation } from 'react-i18next';
import Modal from "../../components/Modal/Modal.jsx";

const Lists = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {lists, addListValue, activeList} = useSelector(state => state.lists);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [listToDelete, setListToDelete] = useState(0);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
        localStorage.setItem('activeList', activeList ?? '');
    }, [lists, activeList]);

    const handleAddToDo = (e) => {
        e.preventDefault();

        if(!addListValue.trim()) return;

        const newList = {
            id: Date.now(),
            text: addListValue,
            todosList: []
        }

        console.log(lists)
        dispatch(addList(newList));
    };


    const handleOpenList =(id)=> {
        dispatch(openList(id));
    }

    return (
        <div className='lists__container'>
            <div className='lists__header'>
                <h1 className='lists__header__title'>{t('listTitle')}</h1>
            </div>

            <form
                className='add__list__form'
                onSubmit={handleAddToDo}
            >
                <input
                    type="text"
                    value={addListValue}
                    name="lists"
                    onChange={(e) => dispatch(addListInput(e.target.value))}
                    placeholder={t('addList')}
                />

                <button
                    className='add__btn'
                    type='submit'
                >
                    {t('confirm')}
                </button>
            </form>

            <div className='lists'>
                <ul className='lists__list'>
                    {lists.length ? (
                        lists.map((list, index) => (
                            <li
                                className="lists__list__item"
                                key={list.id}
                                onClick={() => handleOpenList(list.id)}
                            >
                                <div className="index__circle">{index + 1}</div>

                                <h2>{list.text}</h2>

                                <button
                                    className="open__list"
                                    onClick={() => handleOpenList(list.id)}
                                >
                                    🗁{t('open')}
                                </button>

                                <button
                                    className='delete__list'
                                    onClick={() => {
                                        setIsOpenModal(true)
                                        setListToDelete(list.id)
                                    }}
                                >
                                    🗑️{t('delete')}
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>{t('noLists')}</p>
                    )}
                </ul>
            </div>

            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <div className='lists__delete__request'>
                        <h2 className='request__text delete'>{t('request__delete')}</h2>

                        <button
                            className='delete__btn'
                            onClick={() => {
                                dispatch(deleteList(listToDelete))
                                setIsOpenModal(false)
                            }}

                        >
                            {t('delete')}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Lists;
