import { RootState } from './../../store';
import { Customer } from '../../type';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CustomerInitial {
    id:number|null;
    name:string|null;
    email:string|null;
    password:string|null;
    passcode:number|null;
}
const initialState: CustomerInitial = {
    id:null,
    name:null,
    email:null,
    password:null,
    passcode:null
}


export const customerSlice = createSlice({
    name:"customer",
    initialState,
    reducers:{
        addCustomer:(state, action:PayloadAction<Customer>)=>{
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.passcode = action.payload.passcode;
            state.password = action.payload.password;
        }
    }
});

export const {addCustomer} = customerSlice.actions;
export const selectCustomer = (state: RootState) => state.customer.id;
export default customerSlice.reducer;
