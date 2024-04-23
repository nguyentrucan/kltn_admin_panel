import React from 'react'
import { BsArrowDownRight } from 'react-icons/bs'

const Dashboard = () => {
  return (
    <div>
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>$1000</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6><BsArrowDownRight /> 32%</h6>
            <p className='mb-0'>Compare To April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>$1000</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6><BsArrowDownRight /> 32%</h6>
            <p className='mb-0'>Compare To April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>$1000</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6><BsArrowDownRight /> 32%</h6>
            <p className='mb-0'>Compare To April 2022</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
