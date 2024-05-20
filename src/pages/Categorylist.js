import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { deletePCategory, getPCategories } from '../features/pcategory/pcategorySlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Categorylist = () => {
    const [open, setOpen] = useState(false)
    const [pcategoryId, setPCategoryId] = useState("")
    const showModal = (e) => {
        setOpen(true)
        setPCategoryId(e)
    }
    const hideModal = () => {
        setOpen(false)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPCategories())
    }, []);
    const pcategoryState = useSelector((state) => state.pcategory.pcategories);
    const data1 = [];
    for (let i = 0; i < pcategoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: pcategoryState[i].title,
            action:
                <>
                    <Link className='fs-3 text-danger' to={`/admin/category/${pcategoryState[i]._id}`} ><BiEdit /></Link>
                    <button className='ms-3 fs-3 text-danger bg-transparent border-0' onClick={() => showModal(pcategoryState[i]._id)}><AiFillDelete /></button>
                </>,
        });
    }
    const deleteAPCategory = (e) => {
        dispatch(deletePCategory(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getPCategories())
        }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteAPCategory(pcategoryId)
                }}
                title="Are you sure you want to delete this category ?" />
        </div>
    )
}

export default Categorylist
