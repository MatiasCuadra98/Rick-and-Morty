import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';


//solo vamos a poder ingresar con este mail y contraseña DE MOMENTO 
const email = 'mati@gmail.com';
const password = '123asd';

function App() {
   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access])

   function onSearch(dato) {
      axios(`https://rickandmortyapi.com/api/character/${dato}`)
        .then((respuesta) => {
          if (respuesta.data.name) {
     
            setCharacters((oldChars) => [...oldChars, respuesta.data]);
          } else {
          }
        })
        .catch((err) => window.alert("¡No hay personajes con este ID!"));
    }
   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersFiltered)
   }

   return (
      <div className='App'>
         {
            location.pathname !== '/' && <Nav onSearch={onSearch} setAccess={setAccess} />
         }
         
         <Routes>
            <Route path='/' element={<Form login={login}/>} />
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose}/> }/>
            <Route path='/about' element={<About/>} />
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/favorites' element={<Favorites/>} />
         </Routes>
        
      </div>
   );
}

export default App;
