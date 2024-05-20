import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createCoupon, getCoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';

let schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    expiry: yup.date().required("Expiry is required"),
    discount: yup.number().required("Discount name is required"),
})

const Addcoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getCouponId = location.pathname.split('/')[3];

    const newCoupon = useSelector((state) => state.coupon);

    const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } = newCoupon;

    const changeDateFormat = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        return [year, month, day].join("-");
    };

    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getCoupon(getCouponId))
        } else {
            dispatch(resetState())
        }
    }, [getCouponId])

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfully !");
        }
        if (isSuccess && updatedCoupon) {
            toast.success("Coupon Updated Successfully !");
        }
        if (isError && couponName && couponDiscount && couponExpiry) {
            toast.error("Something went wrong !");
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry: changeDateFormat(couponExpiry) || "",
            discount: couponDiscount || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values));
            if (getCouponId !== undefined) {
                const data = { id: getCouponId, couponData: values };
                dispatch(updateCoupon(data));
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/coupon-list');
                }, 300)
            } else {
                dispatch(createCoupon(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/coupon-list');
                }, 300)
            }
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    {/* Name */}
                    <CustomInput
                        type='text'
                        label='Enter Name'
                        id='name'
                        name='name'
                        onCh={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name} />
                    <div className='error'>
                        {formik.touched.name && formik.errors.name}
                    </div>

                    {/* Expiry */}
                    <CustomInput
                        type='date'
                        label='Enter Expiry'
                        id='expiry'
                        name='expiry'
                        onCh={formik.handleChange("expiry")}
                        onBlr={formik.handleBlur("expiry")}
                        val={formik.values.expiry} />
                    <div className='error'>
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>

                    {/* Name */}
                    <CustomInput
                        type='number'
                        label='Enter Discount'
                        id='discount'
                        name='discount'
                        onCh={formik.handleChange("discount")}
                        onBlr={formik.handleBlur("discount")}
                        val={formik.values.discount} />
                    <div className='error'>
                        {formik.touched.discount && formik.errors.discount}
                    </div>

                    {/* Submit */}
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default Addcoupon
