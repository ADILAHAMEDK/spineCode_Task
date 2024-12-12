import React, { useEffect, useState } from 'react'
import axios from "axios";

const Api = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setData(response.data); 
          } catch (err) {
            setError(err.message) 
          }
        };
    
        fetchData();
      }, []);

    
  return (
    <div className='mt-10 px-3'>
        <div className=''>
            {Map((item)=> 
            <div>
                
            </div>
            )}
        </div>
    </div>
  )
}

export default Api