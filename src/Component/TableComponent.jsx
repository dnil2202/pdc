import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ModalInput from './ModalInput'
import axios from 'axios'
import ModalEdit from './ModalEdit'


const API_URL =  'http://localhost:2022/todo/'

const TableComponent = () => {

    const queryClient=useQueryClient()

    const mutationDone = useMutation({
        mutationFn : (id)=>{
            return axios.patch(API_URL+id,{status:'done'})
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries()
        }
    })

    const mutationDelete = useMutation({
        mutationFn : (id,data)=>{
            return axios.delete(API_URL+id)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries()
        }
    })

    const [ openModal, setOpenModal] = useState(false)
    const [ openModalEdit, setOpenModalEdit] = useState(false)
    const [idTodo,setIdTodo]=useState('')
    const [editTitle, setEditTitle]=useState('')
    const [editDesc, setEditDesc]=useState('')

    const {isLoading, isError, error, data } = useQuery('todoData',()=>
    fetch(API_URL).then(res=>res.json())
    )


    const onDoneTodo = (e) =>{
        let id = e.target.value
        mutationDone.mutate(id)
    }


    const onDeleteTodo = (e) =>{
        let id = e.target.value
        mutationDelete.mutate(id)
    }

    const editModal = (event) =>{
        let id = event.target.value
        let newData = data.filter((e) => {return e.id == id})
        setIdTodo(id)
        setEditTitle(newData[0].title)
        setEditDesc(newData[0].desc)
        setIdTodo (id)
        setOpenModalEdit(true)
    }
    


    const printData = () =>{
        if(data){

            return data.map((v,i)=>{
                return(
                    <tr key={i} className={`${v.status === 'done'&& 'bg-green-400'}`}>    
                        <td className='p-4'>{i+1}</td>
                        <td className='p-4'>{v.title}</td>
                        <td className='p-4'>{v.desc}</td>
                        <td className='p-4'>{v.status}</td>
                        <td className='p-4 md:flex'>
                            <button className={`bg-yellow-400 px-3 rounded-lg ${v.status === 'done' && 'invisible'}`} value={v.id} onClick={editModal} >
                                Edit
                            </button>
                            <button className='bg-red-400 px-3 rounded-lg my-1 md:mt-0 md:mx-2' value={v.id} onClick={onDeleteTodo} >Delete</button>
                            <button className={`bg-green-400 px-3 rounded-lg ${v.status === 'done' && 'invisible'}`} onClick={onDoneTodo} value={v.id}>Done</button>
                        </td>
                    </tr>
            )
    
            })
        }
            
    }

  return (
    <div className='py-5 relative'>
        {
            isLoading &&
            <p>Loading........</p>
        }
    <table className='w-full'>
        <thead>
            <tr>
                <th className='p-4 md:w-10'>No</th>
                <th className='p-4'>Tittle</th>
                <th className='p-4'>Description</th>
                <th className='p-4 w-10'>Status</th>
                <th className='p-4 w-10'>Action</th>
            </tr>
        </thead>
        <tbody className=''>
            {printData()}
        </tbody>
    </table>
    {openModal && <ModalInput setOpenModal={setOpenModal}/>}
    {openModalEdit && <ModalEdit setOpenModalEdit={setOpenModalEdit} editDesc={editDesc} editTitle={editTitle} editId={idTodo}/>}
</div>
  )
}

export default TableComponent