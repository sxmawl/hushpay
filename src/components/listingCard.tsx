import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

function ListingCard({ name, description, detailedInfo }: { name: string, description: string, detailedInfo: string }) {
    return (
        <div className='listing-card w-full md:w-[49%] lowercase mb-8 flex flex-col justify-between'>
            <div className='flex items-center'>
                <div className='font-bold text-[1.5rem]'>{name}</div>
                <div className='ml-2 p-1 bg-secondary text-[8px] flex items-center rounded-full'><AiOutlineCheck className='' /></div>
            </div>
            <div className='text-[0.75rem] font-[700] mt-2 text-[rgb(255,255,255,0.75)]'>{description}</div>
            <div className='flex items-center justify-start mt-4 mb-2 font-bold text-[0.75rem]'>
                <button className='bg-secondary px-2 py-2 rounded-md'>donate some $$$</button>
                <div className='px-2 py-2 ml-4 cursor-pointer primary-button rounded-md'>what is this about??</div>
            </div>
            <div className='hidden'>{detailedInfo}</div>
        </div>
    )
}

export default ListingCard