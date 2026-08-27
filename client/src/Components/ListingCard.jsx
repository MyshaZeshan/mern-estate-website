import { Link } from 'react-router-dom'
const ListingCard = ({listing}) => {
  return (
    <div className='bg-[rgb(250,243,225)] border rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow overflow-hidden gap-4 w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageURL[0]} alt='img'
            className='h-[320px] sm:h-[220px] border rounded-lg w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-3 flex flex-col gap-2'>
                <p className='trancate text-lg font-semibold'>{listing.name}</p>
                <p className='text-sm'>📍{listing.address}</p>
                <p className="overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] text-gray-500">
                    {listing.description}
                </p>

                <p className='text-2xl font-bold text-black-700'>${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                    <span className='text-lg font-semibold'>{listing.type==='rent' && '/month'}</span>
                </p>

                <div className='text-slate-700 flex gap-4'>
                    <div className='font-bold text-xs'>{listing.bedrooms >1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</div>
                    <div className='font-bold text-xs'>{listing.bathrooms >1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</div>
                </div>


            </div>
        </Link>
    </div>
  )
}

export default ListingCard