import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiOutlineEye } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { deleteEnquiry, getEnquiries, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const [open, setOpen] = useState(false)
    const [enquiryId, setEnqiryId] = useState("")
    const showModal = (e) => {
        setOpen(true)
        setEnqiryId(e)
    }
    const hideModal = () => {
        setOpen(false)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState())
        dispatch(getEnquiries())
    }, []);
    const enquiryState = useSelector((state) => state.enquiry.enquiries);
    const data1 = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            date: enquiryState[i].createdAt,
            status: (
                <>
                    <select
                        defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
                        name=''
                        className='form-control form-select'
                        id=''
                        onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)}>
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </>
            ),
            action:
                <>
                    <Link className='ms-3 fs-3 text-danger' to={`/admin/enquiries/${enquiryState[i]._id}`}><AiOutlineEye /></Link>
                    <button className='ms-3 fs-3 text-danger bg-transparent border-0' onClick={() => showModal(enquiryState[i]._id)}><AiFillDelete /></button>
                </>,
        });
    }
    const setEnquiryStatus = (e, i) => {
        console.log(e, i);
        const data = { id: i, enquiryData: e };
        dispatch(updateEnquiry(data))
    }
    const deleteAEnquiry = (e) => {
        dispatch(deleteEnquiry(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getEnquiries())
        }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteAEnquiry(enquiryId)
                }}
                title="Are you sure you want to delete this enquiry ?" />
        </div>
    )
}

export default Enquiries
