
import { configureStore } from '@reduxjs/toolkit';
import userSlice from "../api/userSlice";
import printerSlice from "../components/Printer/printerSlice";

export const store = configureStore({
    reducer: {
        session: userSlice,
        section:printerSlice,
    },
});
