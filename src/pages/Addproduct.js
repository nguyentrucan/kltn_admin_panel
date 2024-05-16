import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import Dropzone from 'react-dropzone'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { Select } from "antd";
import { getBrands } from '../features/brand/brandSlice';
import { getPCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';


let schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    brand: yup.string().required("Brand is required"),
    category: yup.string().required("Category is required"),
    color: yup.array().min(1, "Pick at least one color").required("Color is required"),
    quantity: yup.number().required("Quantity is required"),
})

const Addproduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [color, setColor] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getPCategories())
        dispatch(getColors())
    }, [])

    const brandState = useSelector((state) => state.brand.brands);
    const pcategoryState = useSelector((state) => state.pcategory.pcategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);

    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        })
    })

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        })
    })

    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values))
        },
    });
    const handleColors = (e) => {
        setColor(e)
        console.log(color);
    }
    const [desc, setDesc] = useState('');
    const handleDesc = (e) => {
        setDesc(e);

    };
    return (
        <div>
            <h3 className='mb-4 title'>Add Product</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
                    <CustomInput
                        type='text'
                        label='Enter Product Title'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title} />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className=''>
                        <ReactQuill
                            theme='snow'
                            name='description'
                            onChange={formik.handleChange('description')}
                            value={formik.values.description} />
                    </div>
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <CustomInput
                        type='number'
                        label='Enter Product Price'
                        name='price'
                        onCh={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price} />
                    <div className='error'>
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <select
                        name='brand'
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        className='form-control py-3 mb-3' id=''>
                        <option value=''>Select Brand</option>
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.brand && formik.errors.brand}
                    </div>
                    <select
                        name='category'
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className='form-control py-3 mb-3' id=''>
                        <option value=''>Select Category</option>
                        {pcategoryState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100"
                        placeholder="Select colors"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={coloropt} />
                    <div className='error'>
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <CustomInput
                        type='number'
                        label='Enter Product Quantity'
                        name='quantity'
                        onCh={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity} />
                    <div className='error'>
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className='bg-white border-1 p-5 text-center'>
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className='showimages d-flex flex-wrap gap-3'>
                        {imgState?.map((i, j) => {
                            return (
                                <div className='position-relative' key={j}>
                                    <button
                                        type='button'
                                        onClick={() => dispatch(deleteImg(i.public_id))}
                                        className='btn-close position-absolute'
                                        style={{ top: "10px", right: "10px" }}>

                                    </button>
                                    <img src={i.url} alt='' width={200} height={200} />
                                </div>
                            )
                        })}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default Addproduct
