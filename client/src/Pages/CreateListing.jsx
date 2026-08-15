import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'

const CreateListing = () => {
    const [files, setfiles] =  useState([])
    const [formdata,setformdata] = useState({
        imageUrls:[],
    });
    const [imageuploaderror,setimageuploaderror] = useState(false);
    console.log(formdata);
    const handleImages = async(e) =>{
       
       if(files.length>0 && files.length + formdata.imageUrls.length <7){
            const promises = [];
            for(let i=0; i<files.length;i++){
                promises.push(storeImage(files[i]));
            }
            try {
        // 1. Wait for all background image uploads to finish successfully
            const urls = await Promise.all(promises);
            setformdata((prev)=>({
                ...prev,
                imageUrls: [...prev.imageUrls,...urls]
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
            imageUrls:formdata.imageUrls.filter((_,i)=>i!==index),
        });
    }
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
                    <input  multiple onChange={(e)=>setfiles(e.target.files)} className='border p-2 border-gray-400 rounded w-full' type='file' id='images' accept='image/*'/>
                    <button type='button' onClick={handleImages} className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 border rounded-lg  hover:opacity-95 disabled:opacity-80'>Upload</button>
                </div>
                 <p className='text-red-700 text-sm'>{imageuploaderror && imageuploaderror }</p>
                 {formdata.imageUrls.length>0 && formdata.imageUrls.map((url,index)=>(
                    <div key={url || index} className='flex justify-between p-3 border border-[rgb(255,109,31)] rounded-lg items-center '>
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button onClick={()=>handleremoveimage(index)}>Delete</button>
                    </div>
                 ))}
                <button  className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 border rounded-lg  hover:opacity-95 disabled:opacity-80 uppercase w-full'> Create Listing</button>
            </div>
           
        </form>
    </main>
  )
}

export default CreateListing