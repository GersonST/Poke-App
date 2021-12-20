import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  //Testando como realizar Pull Requests

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
    await console.log(allPokemons);
  };
  useEffect(() => {
    getAllPokemons();
  });

  return (
    <div className="app-container">
      <h1> Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container"></div>
        {allPokemons.map((pokemon, index) => (
          <PokemonThumbnail
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other["official-artwork"].front_default}
            type={pokemon.types[0].type.name}
            key={index}
          />
        ))}
      </div>
      <button className="load-more" onClick={() => getAllPokemons()}>
        Load more
      </button>
    </div>
  );
}

export default App;
