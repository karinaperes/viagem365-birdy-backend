const axios = require('axios')

async function consultaCidade(coordenadas_geo) {
    try {
        const [lat, lon] = coordenadas_geo.split(',')
        const busca = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)        

        if (busca.data.address && busca.data.address.city && busca.data.address.state) {
            const cidade = busca.data.address.city
            const uf = busca.data.address.state
            return { cidade:cidade, uf:uf }
        } else {
            throw new Error('Cidade e UF não foram encontradas para as coordenadas fornecidas')
        }
    } catch (error) {
        throw new Error(`Erro ao consultar a cidade e o estado (UF): ${error.message}`)
    }
}

module.exports = { consultaCidade }
