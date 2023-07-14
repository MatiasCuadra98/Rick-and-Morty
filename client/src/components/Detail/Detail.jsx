import style from "./Detail.module.css";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((err) => window.alert("Error"));

    return () => {
      console.log("Me desmonto, adios!");
    };
  }, []);

  return(
    <div className={style.container} >
      <div>
        <div>
          <button>
            <Link to='/home' className={style.link} >Home</Link>
          </button>
          <h1>{character?.name}</h1>
        </div>

        <div className={style.detail} >
          <div className={style.containerImg} >
            <img src={character?.image} alt={character?.name} />
          </div>

          <div>
            <label htmlFor="status">Status: </label>
            <p>{character?.status}</p>
            <label htmlFor="specie">Specie: </label>
            <p>{character?.species}</p>
            <label htmlFor="gender">Gender: </label>
            <p>{character?.gender}</p>
            <label htmlFor="origin">Origin: </label>
            <p>{character?.origin?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;