import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = { email: action.payload.email };
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;            
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout, checkAuth } = authSlice.actions;

export const loadTokenFromLocalStorage = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email'); // Извлекаем email
        if (token) {
            dispatch(login({ token, email })); // Обновляем состояние с email
        }
    };
};

export default authSlice.reducer;
