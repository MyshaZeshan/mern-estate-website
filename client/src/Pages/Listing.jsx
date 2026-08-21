import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/swiper-bundle.css'

const Listing = () => {
    SwiperCore.use({Navigation})
    const [listing,setlisting] = useState(null);
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(false);
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setloading(true);
                const listingId = params.listingId;
                const res = await fetch (`/api/listing/get/${listingId}`);
                const data = await res.json();
                if(data.success===false){
                    seterror(true);
                    setloading(false);
                    console.log(data.message);
                }
                setlisting(data);
                setloading(false);
                seterror(false);
            } catch (error) {
                seterror(true);
                setloading(false);
            }
            
        }
        fetchListing();
    },[])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>something went wrong!</p>}

        {listing && !loading && !error && <div> 
            <Swiper modules={[Navigation]}
                    navigation
                    allowTouchMove={false}>
                {listing.imageURL.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className='h-[550px]'style={{background: `url(${url})`,   backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize:'cover'}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>}
            <div className='bg-[rgb(250,243,225)]'>
                <div className="max-w-5xl mx-auto px-6 py-8 ">

                    <h1 className="text-3xl font-bold">{listing.name}</h1>
                    <p className="text-gray-700 mt-1">{listing.address}</p>

                    <p className="mt-4 text-gray-700">{listing.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="border border-[rgb(255,109,31)] p-4 rounded-lg">
                            🛏️ {listing.bedrooms} Bedrooms
                        </div>

                        <div className="border border-[rgb(255,109,31)] p-4 rounded-lg">
                            🛁 {listing.bathrooms} Bathrooms
                        </div>

                        <div className="border border-[rgb(255,109,31)] p-4 rounded-lg">
                            🚗 {listing.parking ? "Parking" : "No Parking"}
                        </div>

                        <div className="border border-[rgb(255,109,31)] p-4 rounded-lg">
                            🛋️ {listing.furnished ? "Furnished" : "Unfurnished"}
                        </div>
                    </div>

                    <div className="mt-6">
                        {listing.offer && listing.discountPrice > 0 ? (
                            <>
                                <span className="text-3xl font-bold text-[rgb(255,109,31)]">
                                    ${listing.discountPrice}
                                </span>
                                <span className="ml-3 line-through text-gray-500">
                                    ${listing.regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-[rgb(255,109,31)]">
                                ${listing.regularPrice}
                            </span>
                        )}

                        <span className="ml-4 uppercase font-semibold text-[rgb(250,243,225)] bg-[rgb(255,109,31)] px-3 py-1 rounded">
                            For {listing.type}
                        </span>
                    </div>

                </div>
            </div>
    </main>
  )
}

export default Listing