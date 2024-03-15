import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "./Interface";

// Define the initial state
interface SessionState {
    user: User;
    isLoggedIn: boolean;
    token: string;
}

const refreshUser = localStorage.getItem('user');
const refreshToken = localStorage.getItem('token');

const initialState: SessionState = {
    user: refreshUser ? JSON.parse(refreshUser) : {
        _id: '',
        name: '',
        email: '',
        password: '',
        role: '',
    },
    isLoggedIn: !!refreshToken,
    token: refreshToken || '',
};

// Create the slice
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = { ...action.payload };
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return initialState;
        },
    },
});

// Export actions and selectors
export const { setUser, setToken, logout } = sessionSlice.actions;

export const selectIsLoggedIn = (state: { session: SessionState }) => state.session.isLoggedIn;
export const selectToken = (state: { session: SessionState }) => state.session.token;
export const selectUser = (state: { session: SessionState }) => state.session.user;

export default sessionSlice.reducer;
