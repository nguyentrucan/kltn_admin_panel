import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';

let schema = yup.object().shape({
    title: yup.string().required("Brand name is required"),
})

const Addbrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBrandId = location.pathname.split('/')[3];

    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getBrand(getBrandId))
        } else {
            dispatch(resetState())
        }
    }, [getBrandId])

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully !");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Brand Updated Successfully !");
        }
        if (isError) {
            toast.error("Something went wrong !");
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values));
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values };
                dispatch(updateBrand(data));
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/brand-list');
                }, 300)
            } else {
                dispatch(createBrand(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/brand-list');
                }, 300)
            }
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>
                {getBrandId !== undefined ? "Edit" : "Add"} Brand
            </h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        label='Enter Brand'
                        id='brand'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title} />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</button>
                </form>
            </div>
        </div>
    )
}

export default Addbrand
