import React, { useState } from 'react'
import { RxCross1} from 'react-icons/rx'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const API_URL =  'http://localhost:2022/todo'
const ModalInput = ({setOpenModal}) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn : (data)=>{
            return axios.post(API_URL,data)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries()
        }
    })


    const [title , setTitle] = useState('')
    const [desc, setDesc]= useState('')

    const onSubmit = () =>{
        mutation.mutate({title,desc,status:'todo'})
        setOpenModal(false)
    }

  return (
    <div className="fixed inset-x-96 inset-y-40 ">
        <div className='h-[440px] w-[830px] shadow-lg rounded-lg bg-white'>
            <div className='h-[70px] border-b-2 border-slate-300 px-10'>
                <div className='pt-5 flex justify-between'>
                    <p className='text-xl font-bold'>Tambah List Item Mu</p>
                    <RxCross1 size={20} onClick={()=>setOpenModal(false)} className='mt-2'/>
                </div>
            </div>
            <div className='h-[268px] border-b-2 border-slate-300 px-10 py-5'>
                <p className='font-bold' >Title</p>
                <input className='h-[52px] w-[759px] border border-slate-300 my-2' onChange={(e)=>setTitle(e.target.value)}  placeholder='tambahkan activity mu'/>
                <p className='font-bold'>Description</p>
                <input className='h-[52px] w-[759px] border border-slate-300 my-2' onChange={(e)=>setDesc(e.target.value)} placeholder='tambahkan activity mu'/>

            </div>
            <div className='flex justify-end px-10'>
                <button className='bg-[#16ABF8] py-2 px-4 rounded-3xl mt-4 text-white font-bold' onClick={onSubmit}>Simpan</button>
            </div>
        </div>
    </div>
  )
}

export default ModalInput