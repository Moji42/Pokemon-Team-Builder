import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchPokemon = () => {
  // State Variables
  const [pkmn, setPkmn] = useState(null); // Pokémon Data
  const [err, setErr] = useState(null); // Error Message
  const [searchReq, setSearchReq] = useState(''); // Search Request Input

  // Function to Fetch Pokémon
  useEffect(() => {
    if (searchReq.trim() === '') {
      setPkmn(null); // Clear Pokémon data on empty input
      setErr(null); // Clear errors
      return;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchReq.toLowerCase()}`)
      .then((result) => {
        // Successful API call
        console.log(result); // Debugging log
        setPkmn(result.data);
        setErr(null); // Clear error
      })
      .catch((error) => {
        // Failed API call
        console.error('Error: Data could not be retrieved:', error);
        setPkmn(null); // Clear Pokémon data
        setErr('No Pokémon found!'); // Set error message
      });
  }, [searchReq]); // Runs whenever searchReq changes

  // JSX Output
  return (
    <div className="App">
      <h1>Pokémon Options:</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pokédex!"
        value={searchReq}
        onChange={(e) => setSearchReq(e.target.value)}
      />

      {/* Error Message */}
      {err && <p style={{ color: 'red' }}>{err}</p>}

      {/* Pokémon Information */}
      {pkmn && (
        <div>
          <h2>{pkmn.name}</h2>
          <img src={pkmn.sprites.front_default} alt={pkmn.name} />
          <p>Height: {pkmn.height}</p>
          <p>Weight: {pkmn.weight}</p>
          <h3>Type(s):</h3>
          <ul>
            {pkmn.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchPokemon;
