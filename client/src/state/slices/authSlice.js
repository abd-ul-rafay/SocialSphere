import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    themeMode: 'light'
}

export const loginUser = createAsyncThunk('auth/loginUser', async (values, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/login', JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (values, thunkAPI) => {
    const formData = new FormData();

    for (let value in values) {
        formData.append(value, values[value]);
    }

    try {
        const response = await axiosInstance.post('/api/v1/auth/register', formData);
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

export const addRemoveFriend = createAsyncThunk('auth/addRemoveFriend', async ({ _id: friendId, token }, thunkAPI) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/user/friends/${friendId}`, null, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err?.response?.data?.err || 'Something went wrong');
    }
});

const handlePending = (state) => {
    state.isLoading = true;
}

const handleFulfilled = (state, action) => {
    state.isLoading = false;
    state.token = action.payload.token;
    state.user = action.payload.user;
}

const handleRejected = (state, action) => {
    state.isLoading = false;
    alert(action.payload);
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleThemeMode: (state) => {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, handleFulfilled)
            .addCase(loginUser.rejected, handleRejected)
            .addCase(registerUser.pending, handlePending)
            .addCase(registerUser.fulfilled, handleFulfilled)
            .addCase(registerUser.rejected, handleRejected)
            .addCase(addRemoveFriend.fulfilled, (state, action) => {
                state.user.friends = action.payload;
            })
            .addCase(addRemoveFriend.rejected, (action) => {
                alert(action.payload);
            });
    }
});

export const { toggleThemeMode, logout } = authSlice.actions;
export default authSlice.reducer;
