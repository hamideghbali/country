"use client"; // Ensure this file is a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import Link from 'next/link';
import Image from 'next/image';

const CountryDetails = ({ params }) => {
  const { countryCode } = params; // Get countryCode from params
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Use the router for navigation

  useEffect(() => {
    if (countryCode) {
      const fetchCountry = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
          const data = await response.json();
          setCountry(data[0]);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching country data:', error);
          setLoading(false);
        }
      };

      fetchCountry();
    }
  }, [countryCode]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (!country) return <div className="text-center text-lg">No data available</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"> {/* Prevent horizontal scroll */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.back()} 
          className="text-blue-600 dark:text-blue-400 hover:underline transition duration-300 text-xl"
        >
          &larr; Back to list
        </button>
        <div className="hidden sm:block">
          <Link 
            href="/" 
            className="text-blue-600 dark:text-blue-400 hover:underline transition duration-300 text-xl md:pr-10 sm:pr-20"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
      <div className="relative w-full h-72 mb-6 overflow-hidden"> {/* Ensure no overflow */}
        <Image
          src={country.flags.png} 
          alt={`${country.name.common} flag`} 
          fill // Replaces `layout="fill"`
          style={{ objectFit: 'contain' }} // Apply `objectFit` with `style` prop
          priority
        />
      </div>
      <div className="p-1 md:p-7">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{country.name.common}</h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
          Region: <span className="font-semibold">{country.region}</span>
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
          Population: <span className="font-semibold">{country.population.toLocaleString()}</span>
        </p>
        <div className="text-gray-700 dark:text-gray-300 text-lg mb-2">
          <div className="flex">
            <span className="font-semibold">Borders:</span>
            <div className="flex flex-wrap gap-2 col-span-full"> {/* Full width in grid */}
              {country.borders && country.borders.length > 0 
                ? country.borders.map(border => (
                    <Link 
                      key={border} 
                      href={`/${border}`} 
                      className="text-[15px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {border}
                    </Link>
                  )) 
                : <span className="font-semibold"> None</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;