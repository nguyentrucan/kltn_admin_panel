import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { deleteBCategory, getBCategories } from '../features/bcategory/bcategorySlice';
import CustomModal from '../components/CustomModal';

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
    const [open, setOpen] = useState(false)
    const [brandId, setBrandId] = useState("")
    const showModal = (e) => {
        setOpen(true)
        setBrandId(e)
    }
    const hideModal = () => {
        setOpen(false)
    }
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
                    <Link className='fs-3 text-danger' to={`/admin/blog-category/${bcategoryState[i]._id}`} ><BiEdit /></Link>
                    <button className='ms-3 fs-3 text-danger bg-transparent border-0' onClick={() => showModal(bcategoryState[i]._id)}><AiFillDelete /></button>
                </>,
        });
    }
    const deleteABCategory = (e) => {
        dispatch(deleteBCategory(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getBCategories())
        }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Blog Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteABCategory(brandId)
                }}
                title="Are you sure you want to delete this blog category ?" />
        </div>
    )
}

export default Blogcatlist
