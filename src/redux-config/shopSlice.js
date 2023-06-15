import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../WebApi/api";
import { useSelector } from "react-redux";

export const fetchShop=createAsyncThunk("shop",async(latLong)=>{
    const longitude=latLong.split(",");
    let lat = longitude[0];
    let long = longitude[1];
    let response = await axios.post(api.SHOP_LIST,{lat,long});
    if(response.data){
      return response.data;
    }
})
const slice=createSlice({
    name:"shop",
    initialState:{
    currentShop:null,
    shopList:[],
    isLoading:true,
    error:null
    },
    reducers:{
        setShop:(state,action)=>{
            state.currentShop=action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchShop.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchShop.fulfilled,(state,action)=>{
            console.log("inner fullfield")
            console.log(action.payload);
            state.shopList=action.payload;
            state.isLoading=false;
        }).addCase(fetchShop.rejected,(state,action)=>{
            state.isLoading=false;
            state.error="oops something went wrong "
        })

    }
})
export const {setShop}=slice.actions;
export default slice.reducer;