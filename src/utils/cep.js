const axios = require('axios')
const Nominatim = require('nominatim-geocoder')

const geocoder = new Nominatim()

async function consultaCep(cep) {
    try {
        const buscaCep = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${cep}&format=json&addressdetails=1&limit=1`)
        if (buscaCep.data.length > 0) {
            const result = response.data[0]
            return {
                endereco: result.address,
                latitude: result.lat,
                longitude: result.lon
            }
        } else {
            throw new Error('CEP não encontrado')
        }
    } catch (error) {
        throw new Error(`Erro ao consultar o CEP: ${error.message}`)
    }
}

module.exports = { consultaCep }
