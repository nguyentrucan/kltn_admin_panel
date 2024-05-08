import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getPCategories = createAsyncThunk(
    'productCategory/get-pcategories',
    async(thunkAPI) => {
        try {
            return await pcategoryService.getPCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    pcategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const pcategorySlice = createSlice({
    name: 'pcategories',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pcategories = action.payload;
            })
            .addCase(getPCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
})

export default pcategorySlice.reducer;