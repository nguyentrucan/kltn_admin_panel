import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBCategories = createAsyncThunk(
    'blogCategory/get-bcategories',
    async (thunkAPI) => {
        try {
            return await bcategoryService.getBCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    bcategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const bcategorySlice = createSlice({
    name: 'bcategories',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bcategories = action.payload;
            })
            .addCase(getBCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default bcategorySlice.reducer;