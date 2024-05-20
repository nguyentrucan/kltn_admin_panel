import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createBCategory = createAsyncThunk(
    "blogCategory/create-bcategory",
    async (bcategoryData, thunkAPI) => {
        try {
            return await bcategoryService.createBCategory(bcategoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getBCategory = createAsyncThunk(
    'blogCategory/get-bcategory',
    async (id, thunkAPI) => {
        try {
            return await bcategoryService.getBCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateBCategory = createAsyncThunk(
    "blogCategory/update-bcategory",
    async (bcategory, thunkAPI) => {
        try {
            return await bcategoryService.updateBCategory(bcategory)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteBCategory = createAsyncThunk(
    'blogCategory/delete-bcategory',
    async (id, thunkAPI) => {
        try {
            return await bcategoryService.deleteBCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')

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
            .addCase(createBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBCategory = action.payload;
            })
            .addCase(createBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bcategoryName = action.payload.title;
            })
            .addCase(getBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBCategory = action.payload;
            })
            .addCase(updateBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBCategory = action.payload;
            })
            .addCase(deleteBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    },
})

export default bcategorySlice.reducer;