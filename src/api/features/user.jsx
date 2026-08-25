import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../serverURL";

const initialState = {isAuthenticated: false,user: null,users: [],singleUserDetail: {},usersLength: 0,loading: true}

export const loadUser = createAsyncThunk( // load single user data from server
    'user/loadUser',
    async () => {
        const response = await axios.post(`${backendUrl}/api/v1/user/get-user`,{},{ withCredentials: true })
        return response.data
    })
 

export const updateUserInformation = createAsyncThunk( // update user info
    'user/update-user-info', async({name,email, phoneNumber, password, address}) => {
        const response = await axios.post(`${backendUrl}/api/v1/user/update-user-info`, {name,email, phoneNumber, password, address},{withCredentials: true});
            return response.data
    }) 


export const getAllusers = createAsyncThunk( // load all users data from server
    'user/getAllUser-admin',
    async (pageNo) => {
        const response = await axios.get(`${backendUrl}/api/v1/user/get-all-user?pageNo=${pageNo}`,
            
            { withCredentials: true }
        )
        return response.data
    }
)

export const viewSingleUser = createAsyncThunk( // load single user data from server
    'user/viewSingleUserDetails-admin',
    async (id) => {
        const response = await axios.post(`${backendUrl}/api/v1/user/view-single-user-details`,{id},{ withCredentials: true })
        return response.data
    })


export const userSlice = createSlice({
    name:"user", 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadUser.pending, (state) => {
            state.loading = true
        })
         .addCase(viewSingleUser.fulfilled, (state, action) => {
                state.loading = false
                state.singleUserDetail = action.payload.user
            })
         .addCase(loadUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false
                state.user = action.payload.user
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
                state.isAuthenticated = false
            }) 
            .addCase(updateUserInformation.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
            })
                 .addCase(updateUserInformation.rejected, (state) => {
                state.loading = false
                state.error = "some error occured"
            }) 
             .addCase(getAllusers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllusers.fulfilled, (state, action) => {
               
                state.loading = false
                state.users = action.payload.users
                state.usersLength = action.payload?.usersLength
                console.log(action.payload)
            })
            .addCase(getAllusers.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
            })
    }})
export default userSlice.reducer