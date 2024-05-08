import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { getBlogs } from '../features/blog/blogSlice';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
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
                    <Link className='fs-3 text-danger' to='/' ><BiEdit /></Link>
                    <Link className='ms-3 fs-3 text-danger' to='/'><AiFillDelete /></Link>
                </>,
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Bloglist
