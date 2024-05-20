import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createBrand } from '../features/brand/brandSlice';
import { createBCategory, getBCategory, resetState, updateBCategory } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Blog Category is required"),
})

const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBCategoryId = location.pathname.split('/')[3];

    const newBCategory = useSelector((state) => state.bcategory);
    const { isSuccess, isError, isLoading, createdBCategory, bcategoryName, updatedBCategory } = newBCategory;

    useEffect(() => {
        if (getBCategoryId !== undefined) {
            dispatch(getBCategory(getBCategoryId))
        } else {
            dispatch(resetState())
        }
    }, [getBCategoryId])

    useEffect(() => {
        if (isSuccess && createdBCategory) {
            toast.success("Blog Category Added Successfully !");
        }
        if (isSuccess && updatedBCategory) {
            toast.success("Blog Category Updated Successfully !");
        }
        if (isError) {
            toast.error("Something went wrong !");
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: bcategoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values));
            if (getBCategoryId !== undefined) {
                const data = { id: getBCategoryId, bcategoryData: values };
                dispatch(updateBCategory(data));
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/blog-category-list');
                }, 300)
            } else {
                dispatch(createBCategory(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/blog-category-list');
                }, 300)
            }
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>{getBCategory !== undefined ? "Edit" : "Add"} Blog Category</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        label='Enter Blog Category'
                        id='bcategory'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title} />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBCategoryId !== undefined ? "Edit" : "Add"} Blog Category</button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat
