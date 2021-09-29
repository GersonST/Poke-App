import { useState } from "react";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = res.json();

    console.log(data);
  };

  return (
    <div className="app-container">
      <h1> Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container"></div>
      </div>
      <button className="load-more">Load more</button>
    </div>
  );
}

export default App;
