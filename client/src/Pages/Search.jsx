import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    const [sidebardata,setsidebardata] = useState({
        search:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'createdAt',
        order:'desc',
    })
    const [loading,setloading] = useState(false);
    const [listing,setlisting] = useState([]);
    console.log(listing);
    const handleChange=(e)=>{
        if(e.target.id === 'all' || e.target.id==='rent' || e.target.id==='sale')
        {
            setsidebardata({...sidebardata,type:e.target.id})
        }
        if(e.target.id === 'search')
        {
            setsidebardata({...sidebardata,search:e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id==='furnished' || e.target.id==='offer')
        {
            setsidebardata({...sidebardata,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }

        if(e.target.id === 'sort_order')
        {
            const sort = e.target.value.split('_')[0]|| 'createdAt';
            const order = e.target.value.split('_')[1]|| 'desc';
             setsidebardata({...sidebardata,sort,order})
        }
    }

     useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const urlsearch = urlParams.get('search');
        const urltype = urlParams.get('type');
        const urlparking = urlParams.get('parking');
        const urlfurnished = urlParams.get('furnished');
        const urloffer = urlParams.get('offer');
        const urlsort = urlParams.get('sort');
        const urlorder = urlParams.get('order');
        if(urlsearch || urlfurnished ||urltype ||urloffer ||urlorder ||urlparking ||urlsort){
            setsidebardata({
            search: urlsearch || '',
            type: urltype || 'all',
            parking: urlparking === 'true' ? true : false,
            furnished: urlfurnished === 'true' ? true : false,
            offer: urloffer === 'true' ? true : false,
            sort: urlsort || 'created_at',
            order: urlorder || 'desc',
        });
        }

        const fetchlisting = async ()=>{
            setloading(true);
            const searchQuery = urlParams.toString();
            const res =  await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setlisting(data);
            setloading(false);
        }
        fetchlisting();
      },[location.search])

    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams =  new URLSearchParams();
        urlParams.set('search',sidebardata.search);
        urlParams.set('type',sidebardata.type);
        urlParams.set('parking',sidebardata.parking);
        urlParams.set('furnished',sidebardata.furnished);
        urlParams.set('offer',sidebardata.offer);
        urlParams.set('sort',sidebardata.sort);
        urlParams.set('order',sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 border-b-orange-500 md:border-r-2 md:min-h-screen border-r-orange-500'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap '>Search Term</label>
                    <input type='text' id='search' value={sidebardata.search} onChange={handleChange} placeholder='search...' className='border rounded-lg p-3 w-full' />
                </div>
                <div className='flex gap-4 flex-wrap items-center'>
                    <label>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebardata.type==='all'}/>
                        <span>Rent & Sale</span>

                        <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebardata.type==='rent'}/>
                        <span>Rent</span>

                        <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebardata.type==='sale'}/>
                        <span>Sale</span>

                        <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebardata.offer}/>
                        <span>Offer</span>
                    </div>
                </div>

                <div className='flex gap-4 flex-wrap items-center'>
                    <label>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebardata.parking}/>
                        <span>Parking</span>

                        <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebardata.furnished}/>
                        <span>Furnished</span>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <label>Sort:</label>
                    <select 
                    onChange={handleChange} defaultValue={'createdAt_desc'}
                    id='sort_order' className='border rounded-lg p-1'>
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
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