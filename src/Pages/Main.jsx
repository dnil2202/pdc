import React, { useState } from 'react'
import TableComponent from '../Component/TableComponent'
import ModalInput from '../Component/ModalInput'


const API_URL =  'http://localhost:2022/todo'

const Main = () => {
    

    const [ openModal, setOpenModal] = useState(false)

  return (
    <div className='md:container md:mx-auto md:px-10'>
        <div>
            <p className='text-center font-bold text-5xl py-5'>ToDo App</p>
            <div className='bg-orange-200'>
                <div className='py-3 flex justify-between px-5'>
                    <p className='font-bold text-3xl'>Task :</p>
                    <button className='bg-sky-600 text-white px-3 rounded-3xl' onClick={()=>setOpenModal(true)}>Add</button>
                </div>
            </div>
            <div>
                <TableComponent/>
            </div>
        </div>
        {openModal && <ModalInput setOpenModal={setOpenModal}/>}
    </div>
  )
}

export default Main