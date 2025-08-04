import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    lists: JSON.parse(localStorage.getItem("lists")) || [],
    addListValue: '',
    activeList: Number(localStorage.getItem("activeList")) || 0
}

const lists = createSlice({
    name: "lists",
    initialState,

    reducers: {
        addListInput: (state, action) => {
            state.addListValue = action.payload;
        },

        addList: (state, action) => {
            state.lists.push(action.payload);
            state.addListValue = '';
        },

        openList: (state, action) => {
            state.activeList = action.payload;
        },

        addToDo: (state, action) => {
            const existingList = state.lists.find(item => item.id === state.activeList);
            if (existingList) {
                existingList.todosList.push(action.payload);
            }
        },

        completeTodo: (state, action) => {
            const { listId, todoId } = action.payload;
            const list = state.lists.find(l => l.id === listId);
            if (!list) return;

            const todo = list.todosList.find(t => t.id === todoId);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        editTodo: (state, action) => {
            const { listId, todoId, editedText } = action.payload;
            const targetList = state.lists.find(list => list.id === listId);
            if (targetList) {
                const targetTodo = targetList.todosList.find(todo => todo.id === todoId);
                if (targetTodo) {
                    targetTodo.text = editedText;
                }
            }
        },

        deleteList: (state, action) => {
            const existingList = state.lists.find(item => item.id === action.payload);
            if (existingList) {
                state.lists = state.lists.filter(item => item.id !== action.payload)
            }
        },

        deleteToDo: (state, action) => {
            const list = state.lists.find(item => item.id === state.activeList);
            if (list) {
                list.todosList = list.todosList.filter(item => item.id !== action.payload);
            }
        }
    }
}
)


export const {
    addList,
    addListInput,
    deleteList,
    deleteToDo,
    completeTodo,
    editTodo,
    addToDo,
    openList
} = lists.actions;

export default lists.reducer;