import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Printer, User} from "../../api/Interface";

interface PrinterState {
    printer: Printer;
    isSelected: boolean;
}
const refreshPrinter = localStorage.getItem('printer');
const initialState: PrinterState  = {
    printer: refreshPrinter ? JSON.parse(refreshPrinter) : {
        _id:'',
        name:'',
        apiKey:'',
        user:'',
        url:''
    },
    isSelected: !!refreshPrinter,
};
const PrinterSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        setPrinter: (state, action: PayloadAction<Printer>) => {
            state.isSelected = true;
            state.printer = {...action.payload};
            localStorage.setItem('printer', JSON.stringify(action.payload));
        },
    },
});
export const { setPrinter } = PrinterSlice.actions;

export const selectedPrinter = (state: { section: PrinterState }) => state.section.printer;
export default PrinterSlice.reducer;
