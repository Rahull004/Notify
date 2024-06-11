import React,{useState} from 'react';
import { NoteCard } from '../components/NoteCard';
import { NewNoteCard } from '../components/NewNoteCard';

export const AllNotes = () => {
  const [showNewNoteCard, setShowNewNoteCard] = useState(false);
  const [activeTab, setActiveTab] = useState('PERSONAL');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddClick = () => {
    setShowNewNoteCard(true);
  };

  const handleClosePopup = () => {
    setShowNewNoteCard(false);
  };

  

  return (
    <div className='bg-gray-200 w-screen h-screen font-rob'>
        <div className='bg-white flex p-4 items-center shadow-lg'>
            <div className='w-full flex items-center gap-4 px-8'>
                <div className="relative mx-auto w-full">
                <input 
                    className="bg-gray-200 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10" 
                    type="text" 
                    placeholder="Search"
                />
                <img 
                    src="../../public/vector.png" 
                    alt="" 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
            </div>
            <button className='bg-blue-400 px-4 rounded-3xl py-2 md:py-3  w-24 md:w-28 text-white'  onClick={handleAddClick}>+ Add</button>
            </div>
        </div>

        <div>
            <div className='flex justify-between mt-6 px-12 flex-col items-start gap-8'>
                <h1 className='text-2xl font-semibold'>Your notes</h1>
                <div className='flex'>
                    <div>
                    <div>
                    <button 
                className={`mr-4 ${activeTab === 'PERSONAL' ? 'text-blue-500' : 'text-gray-500'}`} 
                onClick={() => handleTabClick('PERSONAL')}
              >
                PERSONAL
              </button>
                    <button 
                className={`mx-4 ${activeTab === 'COMMUNITY' ? 'text-blue-500' : 'text-gray-500'}`} 
                onClick={() => handleTabClick('COMMUNITY')}
              >
                COMMUNITY
              </button>
                </div>
                    {activeTab === 'PERSONAL' ? (
                        <div className='flex'>
                            <div className='border-[1px] border-blue-300 w-1/2'></div>
                        <div className='border-[1px] border-black/10 w-1/2'></div>
                        </div>
                    ) : (<div className='flex'>
                            <div className='border-[1px] border-black/10 w-1/2'></div>
                        <div className='border-[1px] border-blue-300 w-1/2'></div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>

        <div className='px-12 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
        </div>

        {showNewNoteCard && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 w-full h-full'>
            
            <NewNoteCard />
        </div>
      )}
    </div>
  )
}