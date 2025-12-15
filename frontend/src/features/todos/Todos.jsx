import React, {useState, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, deleteToDo, completeTodo, editTodo } from "../../store/reducers/list.js";
import { useTranslation } from 'react-i18next';
import Modal from "../../components/Modal/Modal.jsx";

const Todos = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [toDo, setToDo] = useState('');
    const { lists, activeList} = useSelector(state => state.lists);
    const [filter, setFilter] = useState('all');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editableTodo, setEditableTodo] = useState(0);
    const [editedText, setEditedText] = useState('');

    const existingList = lists.find(item => item.id === activeList);

    const handleAddTodo = (e) => {
        e.preventDefault();

        if (!toDo.trim()) return

        const newToDo = {
            id: Date.now(),
            text: toDo,
            completed: false,
        }

        dispatch(addToDo(newToDo));
        setToDo('');
    };

    const handleComplete =(id)=> {
        dispatch(completeTodo({listId: activeList, todoId: id}));
    }

    const filteredTodos = existingList?.todosList?.filter(todo => {
        if (filter === 'incomplete') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    }) || [];

    const handleEditConfirm = (todoId) => {
        if (!editedText.trim()) return;
        dispatch(editTodo({
            listId: activeList,
            todoId,
            editedText: editedText.trim()
        }));
    };

    const deleteTodo = (id) => {
        dispatch(deleteToDo(id));
    }

    return (
        <div className="todos__container">
            {!activeList || !existingList ? (
                <p className='select__list__msg'>{t('selectList')}</p>
            ) : (
                <Fragment>
                    <h2 className='todos__container__title'>
                        {t('list')} {existingList.text}
                    </h2>

                    <form
                        className='add__todos__form'
                        onSubmit={handleAddTodo}
                    >
                        <input
                            type="text"
                            value={toDo}
                            name="todos"
                            className='add__todos__form__input'
                            onChange={(e) => setToDo(e.target.value)}
                            placeholder={t('addTodo')}
                        />

                        <button
                            className='add__todo__btn'
                            type='submit'
                        >
                            {t('confirm')}
                        </button>
                    </form>

                    <div className="todos">
                        <ul className='todos__list'>
                            {filteredTodos.length ? (
                                filteredTodos.map((todo, index) => (
                                    <li
                                        key={todo.id}
                                        className="todos__list__item"
                                    >
                                        <p className="index__circle">
                                            {index + 1}
                                        </p>

                                        <p className={`todos__text ${todo.completed ? 'completed' : ''}`}>
                                            {todo.text}
                                        </p>

                                        <button
                                            className='edit__todo'
                                            onClick={() => {
                                                setIsOpenModal(true)
                                                setEditedText(todo.text);
                                                setEditableTodo(todo.id)
                                            }}
                                        >
                                            ✏️{t('edit')}
                                        </button>

                                        <button
                                            className='complete__todo'
                                            onClick={() => handleComplete(todo.id)}
                                        >
                                            {t(todo.completed ? 'completed' : 'complete')}
                                        </button>

                                        <button
                                            className='delete__todo'
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            🗑️{t('delete')}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p
                                    className='not__todos__msg'
                                >
                                    {t('noTodos')}
                                </p>
                            )}
                        </ul>
                    </div>

                    <div className='action__panel'>
                        <button
                            className='complete__action__btn'
                            onClick={() => setFilter('all')}
                        >
                            {t('all')}
                        </button>

                        <button
                            className='complete__action__btn'
                            onClick={() => setFilter('incomplete')}
                        >
                            {t('incomplete')}
                        </button>

                        <button
                            className='complete__action__btn'
                            onClick={() => setFilter('completed')}
                        >
                            {t('completed')}
                        </button>
                    </div>
                </Fragment>
            )}

            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <div className='edit__todo__modal'>
                        <form
                            className='edit__todo__modal'
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEditConfirm(editableTodo);
                                setIsOpenModal(false);
                            }}
                        >
                            <h2 className='request__text'> ✏️{t('edit')}</h2>

                            <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="edit__todo__input"
                                placeholder={t('editTodo')}
                                autoFocus
                            />

                            <button
                                className="confirm__edit__btn"
                                type="submit"
                            >
                                {t('confirm')}
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );

};

export default Todos;
