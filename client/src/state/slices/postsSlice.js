import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api";

const initialState = {
    list: [],
    isLoading: false
}

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async ({ token, query }, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/api/v1/posts?searchTags=${query}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

export const commentPost = createAsyncThunk('posts/commentPost', async ({ token, postId, text }, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/api/v1/posts/${postId}/comment`, JSON.stringify({ text }), {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

export const likeUnlikePost = createAsyncThunk('posts/likeUnlikePost', async ({ token, postId }, thunkAPI) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/posts/${postId}/like`, null, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPosts: (state) => {
            state.list = [];
        },
        addPostToList: (state, action) => {
            state.list.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                alert(action.payload);
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                let post = state.list.find(post => post._id === action.payload._id);
                post.comments = action.payload.comments;
            })
            .addCase(commentPost.rejected, (state, action) => {
                alert(action.payload);
            })
            .addCase(likeUnlikePost.fulfilled, (state, action) => {
                let post = state.list.find(post => post._id === action.payload._id);
                post.likes = action.payload.likes;
            })
            .addCase(likeUnlikePost.rejected, (state, action) => {
                alert(action.payload);
            })
    }
});

export const { clearPosts, addPostToList } = postsSlice.actions;
export default postsSlice.reducer;
