import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import ListingCard from '../Components/ListingCard';

const Home = () => {
    const[offerListing,setofferlisting] = useState([]);
    const[saleListing,setsalelisting] = useState([]);
    const[rentListing,setrentlisting] = useState([]);
    SwiperCore.use({Navigation});
    useEffect(()=>{
      const fetchofferlisting = async()=>{
        try {
          const res = await fetch('/api/listing/get?offer=true&limit=4');
          const data = await res.json();
          setofferlisting(data);
          fetchrentlisting();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchrentlisting = async()=>{
        try {
          const res = await fetch('/api/listing/get?type=rent&limit=4');
          const data = await res.json();
          setrentlisting(data);
          fetchsalelisting();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchsalelisting = async()=>{
        try {
          const res = await fetch('/api/listing/get?type=sale&limit=4');
          const data = await res.json();
          setsalelisting(data);
        } catch (error) {
          console.log(error);
        }
      }

      fetchofferlisting();
    },[])
   
  return (
    <div>
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl lg:text-6xl font-bold'>Guiding you home with <br/> <span className='text-orange-500'>Honesty</span> and <span className='text-orange-500'>Heart</span></h1>
        <div className='text-xs lg:text-sm text-gray-700'>We guide you through buying, selling, or renting with honest, expert advice.  <br/>Let our dedicated local team help you find a neighborhood you will love.</div>
        <Link to={"/search"} className='text-xs sm:text-sm text-orange-500 font-bold hover:underline'>
          Let's Start
        </Link>
      </div>

      <Swiper modules={[Navigation]}
                          navigation
                          allowTouchMove={false}>
          {offerListing && offerListing.length>0 && offerListing.map((listing)=>(
            <SwiperSlide>
              <div style={{background: `url(${listing.imageURL[0]}) center no-repeat`, backgroundSize:'cover'}} className='h-[500px]' key={listing._id}></div>
            </SwiperSlide>
        ))}
      </Swiper>

      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListing && offerListing.length>0 && (
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <h2 className=' md:text-5xl font-bold'>
                Recent Offers
              </h2>
              <Link to={'/search?offer=true'} className='text-xs sm:text-sm text-orange-500 font-bold hover:underline'>
                  show more offers
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
              {offerListing.map((listing)=>(
                <ListingCard key={listing._id} listing={listing}/>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='max-w-7xl mx-auto flex flex-col gap-8 my-10'>
        {rentListing && rentListing.length>0 && (
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <h2 className=' md:text-5xl font-bold'>
                Recent Rents
              </h2>
              <Link to={'/search?type=rent'} className='text-xs sm:text-sm text-orange-500 font-bold hover:underline'>
                  show more Rents
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
              {rentListing.map((listing)=>(
                <ListingCard key={listing._id} listing={listing}/>
              ))}
            </div>
          </div>
        )}
      </div>


        <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {saleListing && saleListing.length>0 && (
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <h2 className=' md:text-5xl font-bold'>
                Recent Sale
              </h2>
              <Link to={'/search?type=sale'} className='text-xs sm:text-sm text-orange-500 font-bold hover:underline'>
                  show more Sale
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
              {saleListing.map((listing)=>(
                <ListingCard key={listing._id} listing={listing}/>
              ))}
            </div>
          </div>
        )}
      </div>
      
      



    </div>
  )
}

export default Home;