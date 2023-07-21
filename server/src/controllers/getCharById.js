const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async ( req, res ) => {
  try {
    const {id} = req.params
    const {data} = await axios (`${URL}/${id}`)
    if (!data.name) throw  Error(`ID: ${id} Not found`)
    const character = {
      id: data.id,
      name: data.name,
      species: data.species,
      origin: data.origin,
      image: data.image,
      status: data.status,
      gender: data.gender
    }
        return res.status(200).json(character)
    
  } catch (error) {
   return error.massage.includes('ID')
   ? res.status(404).send(error.massage)
   : res.status(500).send(error.message)
  }

}
module.exports = { getCharById };