import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { getBCategories } from '../features/bcategory/bcategorySlice';

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
        title: 'Action',
        dataIndex: 'action',
    },
];

const Blogcatlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBCategories())
    }, []);
    const bcategoryState = useSelector((state) => state.bcategory.bcategories);
    const data1 = [];
    for (let i = 0; i < bcategoryState.length; i++) {
        data1.push({
            key: i + 1,
            title: bcategoryState[i].title,
            action:
                <>
                    <Link className='fs-3 text-danger' to='/' ><BiEdit /></Link>
                    <Link className='ms-3 fs-3 text-danger' to='/'><AiFillDelete /></Link>
                </>,
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Blog Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Blogcatlist
