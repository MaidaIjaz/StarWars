import React, { useState } from 'react';
// import Modal from 'components/modal';
// import Table from 'components/table';
import RowInfo from './RowInfo';
import Image from "next/image";
import Link from 'next/link';
import ProductFeed from './ProductFeed';
import axios from 'axios';
const PeopleDescription = ({ people, id, planet, residents }) => {
  const [showModal, setShowModal] = useState(false);

  return (

 // Left side of check page
//  <div className="grid grid-cols-5">
//  {/* Display product image on left (1 col)  */}
//  <Image
//    className="h-52 w-52 object-contain"
//    src={"/1.jpg"}
//    height={200}
//    width={200}
//    objectFit="contain"
//  />

//  {/* Display product details span 3 cols */}
//  <div className="col-span-3 text-white mx-5">
//    <p>{people?.name}</p>
//    {/* <div className="flex">
//      {Array(rating)
//        .fill()
//        .map((_, i) => (
//          <StarIcon className="h-5 text-yellow-500" />
//        ))}
//    </div> */}
//    <p className="text-xs  my-2 line-clamp-3">{people?.birth_year}</p>
//    <div className="mb-5">
//    <p className="text-xs my-2 line-clamp-3">{people?.mass}</p>
//    </div>

   
//  </div>

 
// </div>

    <>
      <div className="flex items-start justify-between p-16 mx-auto">
        <div className='flex overflow-x-auto h-full w-4/12 rounded-lg'>
            <Image
   className="h-full w-full object-contain"
   src={`/${id}.jpg`}
   height={300}
   width={300}
   objectFit="contain"
 />
        
        </div>
        <div className="w-full ml-10 overflow-hidden bg-amazon_blue shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg font-medium leading-6 text-white">{people?.name}</h1>
          </div>
          <div >
            
            <dl>
              <RowInfo label="Gender" text={people?.gender} isWhite />
              <RowInfo label="Birth day" text={people?.birth_year} />
              <RowInfo label="Height" text={people?.height} isWhite />
              <RowInfo label="Hair Color" text={people?.hair_color} />
              <RowInfo label="Eye Color" text={people?.eye_color} isWhite />
              <RowInfo label="Skin Color" text={people?.skin_color} />
              <RowInfo label="Mass" text={people?.mass} isWhite />
              <RowInfo label="Vehicles" text={people?.vehicles.length} />
              <RowInfo label="Starships" text={people?.starships.length} isWhite />
              <RowInfo label="Movies" text={people?.films.length}/>
              <RowInfo label="Planet" text={planet?.name} isWhite />
            
            </dl>
          </div>
        </div>
      </div>

      

      <ProductFeed starWarsPeople={residents} 
      smallTiles /> 
      
    </>






  );
};

export default PeopleDescription;