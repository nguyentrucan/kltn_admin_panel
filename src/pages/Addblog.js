import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { getBCategories } from '../features/bcategory/bcategorySlice';
import { createBlog, getBlog, getBlogs, resetState, updateBlog } from '../features/blog/blogSlice';

let schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
})

const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBlogId = location.pathname.split("/")[3];

    const imgState = useSelector((state) => state.upload.images);
    const bcategoryState = useSelector((state) => state.bcategory.bcategories);
    const blogState = useSelector((state) => state.blog);

    const { isSuccess, isError, isLoading, createdBlog, blogName, blogDesc, blogCategory, blogImages, updatedBlog } = blogState;

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getBlog(getBlogId))
            img.push(blogImages)
        } else {
            dispatch(resetState())
        }
    }, [getBlogId])

    useEffect(() => {
        dispatch(resetState())
        dispatch(getBCategories());
    }, [])

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully !");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Blog Updated Successfullly!");
        }
        if (isError) {
            toast.error("Something went wrong !");
        }
    }, [isSuccess, isError, isLoading])

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        })
    })

    useEffect(() => {
        formik.values.images = img;
    }, [blogImages])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCategory || "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values));
            if (getBlogId !== undefined) {
                const data = { id: getBlogId, blogData: values };
                dispatch(updateBlog(data));
                setTimeout(() => {
                    dispatch(resetState())
                    getBlogs()
                    navigate('/admin/blog-list');
                }, 1000)
            } else {
                dispatch(createBlog(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    navigate('/admin/blog-list');
                }, 300)
            }
        },
    });
    return (
        <div>
            <h3 className='mb-4 title'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>
            <div className=''>
                <form action='' onSubmit={formik.handleSubmit}>
                    {/* Title */}
                    <div className='mt-4 mb-3'>
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
                    </div>

                    {/* Category */}
                    <select
                        name='category'
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className='form-control py-3 mb-3' id=''>
                        <option value='' disabled>Select Category</option>
                        {bcategoryState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category}
                    </div>

                    {/* Desc */}
                    <div className='mb-3'>
                        <ReactQuill
                            theme='snow'
                            name='description'
                            onChange={formik.handleChange('description')}
                            value={formik.values.description} />
                    </div>
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>

                    {/* Images */}
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

                    {/* Submit */}
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog
