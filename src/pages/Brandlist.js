import React, { useEffect } from 'react'
import { Table } from 'antd';
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'

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


const Brandlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands())
    }, []);
    const brandState = useSelector((state) => state.brand.brands);
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            title: brandState[i].title,
            action:
                <>
                    <Link className='fs-3 text-danger' to='/' ><BiEdit /></Link>
                    <Link className='ms-3 fs-3 text-danger' to='/'><AiFillDelete /></Link>
                </>,
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Brands</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Brandlist
