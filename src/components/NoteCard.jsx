import React from 'react'
import { deleteNote } from '../appwrite/api';

export const NoteCard = ({id,title,description,date}) => {

  const handleDelete = async()=> {
    try {
      await deleteNote(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditClick = () => {
    navigate(`/notes/${id}`)
  }

  return (
    <div>
        <div className='bg-white py-4 px-5 rounded-lg shadow-lg'>
            <div className='flex items-center justify-between'>
            <h1 className='text-[12px] py-2 px-3 bg-orange-200 rounded-3xl'>Personal</h1>
            <div className='flex gap-4'>
              <button onClick={handleEditClick}><img src="../../public/Edit.png" alt="" className='w-4 h-4'/></button>
              <button onClick={handleDelete}><img src="../../public/Delete.png" alt="" className='w-5 h-5'/></button>
            </div>
            </div>
            <div className='mt-3 pl-1'>
              <h1 className='text-lg font-semibold mb-2'>Title</h1>
            <p className='text-gray-500 text-sm truncate'>Lorem ipsum dolor fhjsruighfruidhguirhguirdhgid ofdfghjodfihgoidfhgohguidf sit amet, consectetur adipiscing elit. Nunc sed ligula at urna tristique gravida.</p>
            <p className='text-sm text-gray-500/70 text-end py-2'>Date</p>
            </div>
        </div>
    </div>
  )
}
