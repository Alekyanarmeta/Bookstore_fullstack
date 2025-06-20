import { createSlice } from "@reduxjs/toolkit";

const auth=createSlice({
    name:"userauth",

    initialState:{islogged:false,role:"user"},

    reducers:{
        login:(state)=>{
            state.islogged=true
        },
        logout:(state)=>{
            state.islogged=false
        },
        updaterole:(state,action)=>{
            state.role=action.payload
        }

    }
})

export const {login,logout,updaterole}=auth.actions

export default auth.reducer;