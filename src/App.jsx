import { useEffect } from "react";
import { useState } from "react";

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  return data.results;
}

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonShown, setPokemonShown] = useState(null);
  useEffect(() => {
    fetchPokemon().then((result) => setPokemon(result));
  }, []);

  const showDetails = async (url) => {
    const data = await fetch(url).then((result) => result.json());
    console.log(data);
    setPokemonShown(data);
  };

  return (
    <div className="app">
      <div>
        <h2>Pokedex</h2>
        <ul className="pokemon">
          {pokemon.map((poke) => (
            <li key={poke.name}>
              <span>{poke.name.toUpperCase()}</span>
              <button onClick={() => showDetails(poke.url)}>
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name.toUpperCase()}</h2>
          <img src={pokemonShown.sprites.front_default} alt="" />
          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name.toUpperCase()} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>
            {pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>
            {pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name.toUpperCase()}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name.toUpperCase()}
                  {is_hidden && " (Secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
