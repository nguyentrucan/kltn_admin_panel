import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createPCategory, getPCategory, resetState, updatePCategory } from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Category name is required"),
})

const Addcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getPCategoryId = location.pathname.split('/')[3];
    
    const newPCategory = useSelector((state) => state.pcategory);
    const { isSuccess, isError, isLoading, createdPCategory, pcategoryName, updatedPCategory } = newPCategory;

    useEffect(() => {
        if (getPCategoryId !== undefined) {
            dispatch(getPCategory(getPCategoryId))
        } else {
            dispatch(resetState())
        }
    }, [getPCategoryId])

    useEffect(() => {
        if (isSuccess && createdPCategory) {
            toast.success("Category Added Successfully !");
        }
        if (isSuccess && updatedPCategory) {
            toast.success("Category Updated Successfully !");
        }
        if (isError) {
            toast.error("Something went wrong !");
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: pcategoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values));
            if (getPCategoryId !== undefined) {
                const data = { id: getPCategoryId, pcategoryData: values };
                dispatch(updatePCategory(data));
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/category-list');
                }, 300)
            } else {
                dispatch(createPCategory(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/category-list');
                }, 300)
            }
        },
    });
    return (
        <div>
            <h3 className='mb-4 title'>{getPCategoryId !== undefined ? "Edit" : "Add"} Category</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        label='Enter Category'
                        id='category'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title} />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getPCategoryId !== undefined ? "Edit" : "Add"} Category</button>
                </form>
            </div>
        </div>
    )
}

export default Addcat
