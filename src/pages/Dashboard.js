import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots'
import { Table } from 'antd';

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
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 50,
    },
    {
      type: 'Mar',
      sales: 145,
    },
    {
      type: 'Apr',
      sales: 20,
    },
    {
      type: 'May',
      sales: 58,
    },
    {
      type: 'Jun',
      sales: 20,
    },
    {
      type: 'July',
      sales: 60,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sept',
      sales: 90,
    },
    {
      type: 'Oct',
      sales: 38,
    },
    {
      type: 'Nov',
      sales: 38,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ]
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    colorField: "#ffd333",
    label: {
      //position: 'middle',
      style: {
        fill: '#000000',
        opacity: 10,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$1000</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$1000</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$1000</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowUpRight /> 32%</h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-5 title'>Imcome Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-5 title'>
          Recent Orders
        </h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
