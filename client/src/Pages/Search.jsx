import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 border-b-orange-500 md:border-r-2 md:min-h-screen border-r-orange-500'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap '>Search Term</label>
                    <input type='text' id='search' placeholder='search...' className='border rounded-lg p-3 w-full' />
                </div>
                <div className='flex gap-4 flex-wrap items-center'>
                    <label>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5'/>
                        <span>Rent & Sale</span>

                        <input type='checkbox' id='rent' className='w-5'/>
                        <span>Rent</span>

                        <input type='checkbox' id='sale' className='w-5'/>
                        <span>Sale</span>

                        <input type='checkbox' id='offer' className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>

                <div className='flex gap-4 flex-wrap items-center'>
                    <label>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'/>
                        <span>Parking</span>

                        <input type='checkbox' id='furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <label>Sort:</label>
                    <select id='sort_order' className='border rounded-lg p-1'>
                        <option value="">Price high to low</option>
                        <option value="">Price low to high</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>

                <button className='uppercase text-center text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-3 border rounded-lg hover:opacity-95 disabled:opacity-80'>Search</button>
            </form>
        </div>
        <div className='m-7'>
            <h1 className='text-3xl font-semibold p-3'>Listing Results</h1>
        </div>
    </div>
    
  )
}

export default Search