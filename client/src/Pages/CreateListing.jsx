import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto '>
        <h1 className='text-3xl font-extrabold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row bg-[rgb(250,243,225)] p-8 rounded-lg shadow-md'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border border-gray-300 p-3 rounded-lg' id='name' maxLength={62} minLength={10} required/>
                <input type='text' placeholder='Description' className='border border-gray-300 p-3 rounded-lg' id='description' required/>
                <input type='text' placeholder='Address' className='border border-gray-300 p-3 rounded-lg mb-4' id='address' required/>
            
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'/>
                        <span className='font-semibold'>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='Rent' className='w-5'/>
                        <span className='font-semibold'>Rent</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type='checkbox' id='Parking' className='w-5'/>
                        <span className='font-semibold'>Parking Spot</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type='checkbox' id='furnished' className='w-5'/>
                        <span className='font-semibold'>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'/>
                        <span className='font-semibold'>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-1 '>
                    <div className='flex items-center gap-2 m-2'>
                        <input type='Number' id='bedrooms' min={1} max={10} required className='p-1 border border-gray-600 rounded-lg' />
                        <span className='font-semibold '>Beds</span>
                    </div>
                     <div className='flex items-center gap-2 m-2'>
                        <input type='Number' id='bathrooms' min={1} max={10} required className='p-1 border border-gray-600 rounded-lg' />
                        <span className='font-semibold '>Baths</span>
                    </div>
                     <div className='flex items-center gap-2 m-2'>
                        <input type='Number' id='regularprice' min={1} max={10} required className='p-1 border border-gray-600 rounded-lg' />
                        <div className='flex flex-col item-center'>
                            <span className='font-semibold '>Regular Price</span>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 m-2'>
                        <input type='Number' id='discountprice' min={1} max={10} required className='p-1 border border-gray-600 rounded-lg' />
                        <div className='flex flex-col items-center'>
                            <span className='font-semibold '>Discount Price</span>
                            <span className='text-xs'>($ / month)</span>
                        </div>    
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4 ml-3'>
                <p className='font-semibold'>Images:<span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4 justify-center'>
                    <input className='border p-2 border-gray-400 rounded w-full' type='file' id='images' accept='image/*'/>
                    <button className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 border rounded-lg  hover:opacity-95 disabled:opacity-80'>Upload</button>
                </div>
                <button  className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 border rounded-lg  hover:opacity-95 disabled:opacity-80 uppercase w-full'> Create Listing</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing