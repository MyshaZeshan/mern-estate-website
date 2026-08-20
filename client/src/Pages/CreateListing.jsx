import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CreateListing = () => {
    const [files, setfiles] =  useState([])
    const [error,seterror] = useState(false);
    const [loading,setloading] = useState(false);
    const {currentUser} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    

    const [formdata,setformdata] = useState({
        imageURL:[],
        name:'',
        description:'',
        address:'',
        type:'rent',
        bedrooms: '1',
        bathrooms:'1',
        regularPrice:0,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
    });

    const [imageuploaderror,setimageuploaderror] = useState(false);
    console.log(formdata);
    const handleImages = async(e) =>{
       
       if(files.length>0 && files.length + formdata.imageURL.length <7){
            const promises = [];
            for(let i=0; i<files.length;i++){
                promises.push(storeImage(files[i]));
            }
            try {
        // 1. Wait for all background image uploads to finish successfully
            const urls = await Promise.all(promises);
            setformdata((prev)=>({
                ...prev,
                imageURL: [...prev.imageURL,...urls]
            }));
            // 2. TODO: Call your existing state function here to update form data 
            // e.g., setFormData({ ...formData, imageUrls: urls });
            setimageuploaderror(false);
            } catch (error) {
                setimageuploaderror('image upload failed')
            }
        }else{
            setimageuploaderror('cant upload more than 6 images')
        }
    }
    const storeImage = async (file)=>{
        return new Promise(async(resolve, reject)=>{
            const fileName = `${Date.now()}-${file.name}`;
            const {data,error} = await supabase.storage.from('images').upload(fileName,file);
            if(error){
                reject(error);
            }else{
                const {data: {publicUrl}} = supabase.storage.from('images').getPublicUrl(fileName);
                resolve(publicUrl);
            }
        });
    };

    const handleremoveimage=(index)=>{
        setformdata({
            ...formdata,
            imageURL:formdata.imageURL.filter((_,i)=>i!==index),
        });
    }
    const handleChange=(e)=>{
        if(e.target.id==='sale'|| e.target.id==='rent'){
            setformdata({
                ...formdata,
                type:e.target.id,
            })
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' ||e.target.id === 'offer'){
            setformdata({
                ...formdata,
                [e.target.id]:e.target.checked, //[e.target.id] is object key like if id is fursnished then on furnished place it stor thr checked value ture of false :)
            })
        }
        if(e.target.type === 'number' || e.target.type === 'text' ||e.target.type === 'textarea'){
            setformdata({
                ...formdata,
                [e.target.id]:e.target.value, 
            })
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            if(formdata.imageURL.length<1){
                return seterror('You must upload atleast one image')
            }
            setloading(true);
            seterror(false);
            const res = await fetch(
                '/api/listing/create',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({...formdata,userRef:currentUser._id})})
            const data = await res.json();
            setloading(false);
            if(data.success===false){
                seterror(data.message);
            }
            navigate(`/listing/${data._id}`);
            
        }catch(error){
            seterror(error.message);
            setloading(false);
        }
    }
  return (
    <main className='p-3 max-w-4xl mx-auto '>
        <h1 className='text-3xl font-extrabold text-center my-7'>Create a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row bg-[rgb(250,243,225)] p-8 rounded-lg shadow-md'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border border-gray-300 p-3 rounded-lg' id='name' maxLength={62} minLength={10} required onChange={handleChange} value={formdata.name}/>
                <input type='text' placeholder='Description' className='border border-gray-300 p-3 rounded-lg' id='description' required onChange={handleChange} value={formdata.description}/>
                <input type='text' placeholder='Address' className='border border-gray-300 p-3 rounded-lg mb-4' id='address' required onChange={handleChange} value={formdata.address}/>
            
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={formdata.type==='sale'}/> 
                        <span className='font-semibold'>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={formdata.type==='rent'}/>
                        <span className='font-semibold'>Rent</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={formdata.parking}/>
                        <span className='font-semibold'>Parking Spot</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={formdata.furnished}/>
                        <span className='font-semibold'>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={formdata.offer}/>
                        <span className='font-semibold'>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-1 '>
                    <div className='flex items-center gap-2 m-2'>
                        <input type='number' id='bedrooms' min={1} max={10} required className='p-1 border border-gray-600 rounded-lg' onChange={handleChange} value={formdata.bedrooms}/>
                        <span className='font-semibold '>Beds</span>
                    </div>
                     <div className='flex items-center gap-2 m-2'>
                        <input type='number' id='bathrooms' min={1} max={10} required className='p-1 border border-gray-600 rounded-lg' onChange={handleChange} value={formdata.bathrooms}/>
                        <span className='font-semibold '>Baths</span>
                    </div>
                     <div className='flex items-center gap-2 m-2'>
                        <input type='number' id='regularPrice' min={50} max={10000000000} required className='p-1 border border-gray-600 rounded-lg' onChange={handleChange} value={formdata.regularPrice}/>
                        <div className='flex flex-col item-center'>
                            <span className='font-semibold '>Regular Price</span>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                    {formdata.offer && (
                        <div className='flex items-center gap-2 m-2'>
                        <input type='number' id='discountPrice' min={0} max={1000000} required className='p-1 border border-gray-600 rounded-lg' onChange={handleChange} value={formdata.discountPrice}/>
                        <div className='flex flex-col items-center'>
                            <span className='font-semibold '>Discount Price</span>
                            <span className='text-xs'>($ / month)</span>
                        </div>    
                    </div>
                    )}
                    
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4 ml-3'>
                <p className='font-semibold'>Images:<span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4 justify-center'>
                    <input  multiple onChange={(e)=>setfiles(e.target.files)} className='border p-2 border-gray-400 rounded w-full' type='file' id='images' accept='image/*'/>
                    <button type='button' onClick={handleImages} className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 border rounded-lg  hover:opacity-95 disabled:opacity-80'>Upload</button>
                </div>
                 <p className='text-red-700 text-sm'>{imageuploaderror && imageuploaderror }</p>
                 {formdata.imageURL.length>0 && formdata.imageURL.map((url,index)=>(
                    <div key={url || index} className='flex justify-between p-3 border border-[rgb(255,109,31)] rounded-lg items-center '>
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button onClick={()=>handleremoveimage(index)}>Delete</button>
                    </div>
                 ))}
                <button  className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 border rounded-lg  hover:opacity-95 disabled:opacity-80 uppercase w-full'>{loading?'loading':'create listing'}</button>
                {error&&<p className='text-red-700'>{error}</p>}
            </div>
           
        </form>
    </main>
  )
}

export default CreateListing