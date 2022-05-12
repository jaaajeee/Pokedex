import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { HiSearchCircle } from 'react-icons/hi';
import Progress from './components/progressbar';

const logo = require('./pokeball.png');

function App() {
  const [pokemonNames, setPokemonNames] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
  });

  const EnterKeyPressed = (e) => {
    if (e.key === "Enter") {
      SearchPokemon();
    }else{
      return;
    }
  }

  const SearchPokemon = async() => {
    await axios.get (`https://pokeapi.co/api/v2/pokemon/${pokemonNames}`)
    .then(res => {
      setPokemonData({
        name: pokemonNames, 
        species: res.data.species.name,
        img: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        });
      setIsSearching(true);
    }
    )
    .catch(error => {
      setIsSearching(false);
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No pokemon found!',
        })
      }
    }
    )
  }
  return (
    <div className="App">
      <div className="container">
        <img className='App-logo' src={logo}></img>
        <h1>Pokédex</h1>
        </div>
      <div className="Search-box">
        <input type="text" placeholder="Search..." className="Search-input" onChange={(event) => {setPokemonNames(event.target.value)}} onKeyPress={(e) => EnterKeyPressed(e)} />
        <a href="#" onClick={SearchPokemon} className="Search-button">
          <span><HiSearchCircle 
          className='Search-icon'
          size="50px"
          color="#5c5757"
          /></span>
        </a>
      </div>

      <div className='Card-Display'>
        <div className='Card'>
          <h2>{pokemonNames}</h2>
          <div className='isSearching'> {!isSearching ? (<p>Please insert pokemon name</p>) : (
          <div className='card-body'>          
            <img src={pokemonData.img} alt={pokemonData.name}/>
            <h3>{(pokemonData.name.toUpperCase())}</h3>
            <p>HP<span><Progress done={pokemonData.hp}/></span> 
            </p>
            <p>ATTACK <span><Progress done={pokemonData.attack}/></span></p>
            <p>DEFENSE <span><Progress done={pokemonData.defense}/></span></p>
          </div>
          )}</div>
          </div>
      </div>
    </div>
  );
}

export default App;
