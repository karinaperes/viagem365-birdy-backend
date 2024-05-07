const axios = require('axios')

async function consultaCep(cep) {
    try {
        const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (buscaCep.data.cep) {
            return {
                endereco: buscaCep.data.logradouro,
                cidade: buscaCep.data.localidade,
                uf: buscaCep.data.uf,
                latitude: buscaCep.data.latitude,
                longitude: buscaCep.data.longitude
            }
        } else {
            throw new Error('CEP não encontrado')
        }
    } catch (error) {
        throw new Error(`Erro ao consultar o CEP: ${error.message}`)
    }
}

module.exports = { consultaCep }