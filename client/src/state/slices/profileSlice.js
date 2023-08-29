import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api";

const initialState = {
    user: null,
    posts: [],
    isLoading: false
}

export const fetchUser = createAsyncThunk('profile/fetchUser', async ({userId, token}, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/api/v1/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

export const fetchUserPosts = createAsyncThunk('profile/fetchUserPosts', async ({userId, token}, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/api/v1/posts/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                alert(action.payload);
            })
            .addCase(fetchUserPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                alert(action.payload);
            })
    }
});

export default profileSlice.reducer;
