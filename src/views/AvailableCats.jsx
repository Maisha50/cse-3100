import { useEffect, useState } from 'react';
import '../app.css';

// List of available cats with their details
const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Sphynx' },
  { name: 'Mittens', age: '2', breed: 'Peterbald' },
  { name: 'Shadow', age: '1', breed: 'Birman' },
  { name: 'Pumpkin', age: '3', breed: 'Abyssinian' },
  { name: 'Luna', age: '4', breed: 'Persian' },
  { name: 'Simba', age: '2', breed: 'Siamese' },
  { name: 'Bella', age: '1', breed: 'Sphynx' },
  { name: 'Oliver', age: '3', breed: 'Peterbald' },
  { name: 'Charlie', age: '2', breed: 'Birman' },
  { name: 'Max', age: '4', breed: 'Abyssinian' },
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    // Fetch cat images from an API endpoint and assign it to the featuredCats list
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(availableCats.map(() => fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json())));
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchCatImages();
  }, []);

  // Filter cats based on search text and selected breed
  const filteredCats = cats.filter((cat) => {
    const matchesSearchText = cat.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesBreed = selectedBreed ? cat.breed === selectedBreed : true;
    return matchesSearchText && matchesBreed;
  });

  return (
    <section className="mt-4">
      <div className="header-container">
        <div>
          <h2>Available Cats</h2>
          <p>Meet our adorable cats looking for their forever home!</p>
        </div>
        <div className="input-container">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedBreed || 'Select Breed'}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#" onClick={() => setSelectedBreed('')}>
                  All Breeds
                </a>
              </li>
              {Array.from(new Set(availableCats.map((cat) => cat.breed))).map((breed) => (
                <li key={breed}>
                  <a className="dropdown-item" href="#" onClick={() => setSelectedBreed(breed)}>
                    {breed}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <input type="text" className="search-bar" placeholder="Search by name..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button
            className="btn btn-success"
            onClick={() => {
              // Trigger search, if needed for custom logic
            }}
          >
            Search
          </button>
        </div>
      </div>
      <hr />

      <div className="mt-2 row g-4 cats-container" id="cats-container">
        {filteredCats.map((cat, i) => (
          <div key={i} className="col-md-4" style={{ height: '300px' }}>
            <div className="cat-card">
              <img src={cat.image} alt={cat.name} className="img-fluid mb-2" style={{ borderRadius: '8px', height: '200px', objectFit: 'cover' }} />
              <div className="cat-info">
                <h3 className="h5 mb-1">{cat.name}</h3>
                <p className="mb-0">Age: {cat.age}</p>
                <p className="mb-0">Breed: {cat.breed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
