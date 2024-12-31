import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // State Variables
  const [pkmn, setPkmn] = useState(null); // Pokémon Data
  const [err, setErr] = useState(null); // Error Message
  const [searchReq, setSearchReq] = useState(""); // Search Request Input
  const [team, setTeam] = useState([]); // Pokémon Team
  const [teamErr, setTeamErr] = useState(null); // Team Error Message

  // Function to Fetch Pokémon
  useEffect(() => {
    if (searchReq.trim() === "") {
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
        console.error("Error: Data could not be retrieved:", error);
        setPkmn(null); // Clear Pokémon data
        setErr("No Pokémon found!"); // Set error message
      });
  }, [searchReq]); // Runs whenever searchReq changes

  // Function to Add Pokémon to Team
  const addToTeam = () => {
    if (pkmn && !team.some((p) => p.name === pkmn.name)) {
      if (team.length < 6) {
        setTeam([...team, pkmn]);
        setTeamErr(null); // Clear team error
      } else {
        setTeamErr("Team can only have up to 6 Pokémon.");
      }
    }
  };

  // Function to Remove Pokémon from Team
  const removeFromTeam = (name) => {
    setTeam(team.filter((p) => p.name !== name));
    setTeamErr(null); // Clear team error
  };

  // JSX Output
  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Options:</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pokédex!"
        value={searchReq}
        onChange={(e) => setSearchReq(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />

      {/* Error Message */}
      {err && <p className="text-red-500 mb-4">{err}</p>}

      {/* Pokémon Information */}
      {pkmn && (
        <div className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold">{pkmn.name}</h2>
          <img
            src={pkmn.sprites.front_default}
            alt={pkmn.name}
            className="mb-2"
          />
          <p>Height: {(pkmn.height * 3.93701).toFixed(2)} inches</p>
          <p>Weight: {(pkmn.weight * 0.220462).toFixed(2)} lbs</p>
          <h3 className="font-semibold mt-2">Type(s):</h3>
          <ul className="list-disc list-inside">
            {pkmn.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
          <button
            onClick={addToTeam}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add to Team
          </button>
        </div>
      )}

      {/* Team Error Message */}
      {teamErr && <p className="text-red-500 mb-4">{teamErr}</p>}

      {/* Pokémon Team */}
      <h1 className="text-2xl font-bold mb-4">Your Pokémon Team:</h1>
      {team.length > 0 ? (
        <ul>
          {team.map((teamPkmn, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-semibold">{teamPkmn.name}</h2>
              <img
                src={teamPkmn.sprites.front_default}
                alt={teamPkmn.name}
                className="mb-2"
              />
              <button
                onClick={() => removeFromTeam(teamPkmn.name)}
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Pokémon in your team yet!</p>
      )}
    </div>
  );
};

export default App;
