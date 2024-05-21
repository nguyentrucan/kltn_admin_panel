import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { getBlogs, deleteBlog, resetState } from '../features/blog/blogSlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Bloglist = () => {
    const [open, setOpen] = useState(false)
    const [blogId, setBlogId] = useState("")
    const showModal = (e) => {
        setOpen(true)
        setBlogId(e)
    }
    const hideModal = () => {
        setOpen(false)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs())
    }, []);
    const blogState = useSelector((state) => state.blog.blogs);
    const data1 = [];
    for (let i = 0; i < blogState.length; i++) {
        data1.push({
            key: i + 1,
            title: blogState[i].title,
            category: blogState[i].category,
            action:
                <>
                    <Link className='fs-3 text-danger' to={`/admin/blog/${blogState[i].id}`} ><BiEdit /></Link>
                    <button className='ms-3 fs-3 text-danger bg-transparent border-0' onClick={() => showModal(blogState[i]._id)}><AiFillDelete /></button>
                </>,
        });
    }
    const deleteABlog = (e) => {
        dispatch(deleteBlog(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getBlogs())
        }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteABlog(blogId)
                }}
                title="Are you sure you want to delete this blog ?" />
        </div>
    )
}

export default Bloglist
