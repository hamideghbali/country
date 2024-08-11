import HomePage from '../components/HomePage.jsx';

// Function to fetch country data
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return []; // Return an empty array if there's an error
    }
}

// Page component with data fetching
export default async function Page() {
    const countries = await fetchCountries();

    return <HomePage countries={countries} />;
}
