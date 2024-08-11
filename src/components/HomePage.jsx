"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

const HomePage = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('All');

  // Filter countries based on search term and region
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = region === 'All' || country.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Country List</h1> {/* Dark mode text */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4 sm:mb-0 sm:mr-4 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white" // Dark mode styles
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white" // Dark mode styles
          >
            <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.map(country => (
          <Link key={country.cca3} href={`/${country.cca3}`}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
              <div className="relative w-full h-40"> {/* Set a fixed height */}
                <Image
                  src={country.flags.png} 
                  alt={`${country.name.common} flag`} 
                  fill // Ensure the image takes up the container
                  style={{ objectFit: 'cover' }} // Handles object fit with inline style
                  priority
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold dark:text-white">{country.name.common}</h2> {/* Dark mode text */}
                <p className="mt-2 text-gray-600 dark:text-gray-300">Region: {country.region}</p> {/* Dark mode text */}
                <p className="text-gray-600 dark:text-gray-300">Population: {country.population.toLocaleString()}</p> {/* Dark mode text */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
