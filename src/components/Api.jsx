import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data); 
        console.log(response.data, "Fetched Data");
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mt-10 px-3'>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {data.map((product) => (
            <div key={product.id} className="p-4 border rounded mx-auto">
              <img src={product.image} alt={product.title} className="h-40 mx-auto" />
              <h2 className="text-center text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-center text-sm text-gray-700">{product.description}</p>
              <p className="text-center text-lg font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Api;
