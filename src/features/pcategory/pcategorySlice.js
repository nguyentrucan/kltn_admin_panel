import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getPCategories = createAsyncThunk(
    'productCategory/get-pcategories',
    async (thunkAPI) => {
        try {
            return await pcategoryService.getPCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createPCategory = createAsyncThunk(
    "productCategory/create-pcategory",
    async (pcategoryData, thunkAPI) => {
        try {
            return await pcategoryService.createPCategory(pcategoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getPCategory = createAsyncThunk(
    'productCategory/get-pcategory',
    async (id, thunkAPI) => {
        try {
            return await pcategoryService.getPCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updatePCategory = createAsyncThunk(
    "productCategory/update-pcategory",
    async (category, thunkAPI) => {
        try {
            return await pcategoryService.updatePCategory(category)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deletePCategory = createAsyncThunk(
    'productCategory/delete-pcategory',
    async (id, thunkAPI) => {
        try {
            return await pcategoryService.deletePCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')

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
            .addCase(createPCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdPCategory = action.payload;
            })
            .addCase(createPCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getPCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pcategoryName = action.payload.title;
            })
            .addCase(getPCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updatePCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedPCategory = action.payload;
            })
            .addCase(updatePCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deletePCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedPCategory = action.payload;
            })
            .addCase(deletePCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    },
})

export default pcategorySlice.reducer;