import React from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { } from 'react-router-dom'
import { } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

let schema = yup.object().shape({
    title: yup.string().required("Title is required"),
})

const Addbrand = () => {
    const dispatch = useDispatch("");

    return (
        <div>
            <h3 className='mb-4 title'>Add Brand</h3>
            <div>
                <form action=''>
                    <CustomInput type='text' label='Enter Brand' />
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Brand</button>
                </form>
            </div>
        </div>
    )
}

export default Addbrand
