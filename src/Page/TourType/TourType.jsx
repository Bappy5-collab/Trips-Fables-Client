
import { useEffect, useState } from 'react';
import TypeData from './TypeData';

const TourType = () => {
  const [types , setTypes] = useState([])
  useEffect(() =>{
     fetch('https://asssignment-12-serverrr.vercel.app/tourType')
     .then (res => res.json())
     .then(data => setTypes(data))
     
 
  },[])
    return (
        <div className="mb-36">
          <h2 className="text-center font-bold text-white text-xl md:text-3xl lg:text-5xl mb-12">
            Tour <span className="text-[#2EC1DB]">Type</span>
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-8'>
            {types.map(type => <TypeData key={type._id} type={type}></TypeData>)}
          </div>
        </div>
    );
};

export default TourType;