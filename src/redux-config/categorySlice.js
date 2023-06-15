import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import ApiEndPoint from "../WebApi/api";

export const fetchCategory=createAsyncThunk("fetchCategory",async()=>{
    let response=await axios.get(ApiEndPoint.CATEGORY_LIST)
    console.log(response.data.result);
    if(response.data){
         return response.data;
        }
})


const slice=createSlice({
    name:"category",
    initialState:{
        categoryList:[],
        categoryisLoading:false,
        error:null
    },
 
    extraReducers: (builder)=>{
        builder.addCase(fetchCategory.pending,(state,action)=>{
            state.categoryisLoading=true;
        }).addCase(fetchCategory.fulfilled,(state,action)=>{
            state.categoryList = action.payload;
            state.categoryisLoading=false
        }).addCase(fetchCategory.rejected,(state,action)=>{
            state.categoryisLoading=false;
            state.error="oops something went wrong "
        })

    }
    
});

export default slice.reducer;