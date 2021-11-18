import axios from "axios";

export const pipefyApi = axios.create({
    baseURL: 'https://api.pipefy.com',

})

export const allCards = async (pipeId) => {
    return await pipefyApi.post('graphql', `{"query": "{ allCards(pipeId: ${pipeId}) { edges { node { id } } } }" }`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PIPEFY_AUTHORIZATION_TOKEN}`
        }
    })
}

export const deleteCard = async (cardId) => {
    const data = `{"query":"mutation deleteCard($input: DeleteCardInput!) { deleteCard(input: $input) { success } } ","variables":{"input":{"id":"${cardId}"}},"operationName":"deleteCard"}`

    return await pipefyApi.post('graphql', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PIPEFY_AUTHORIZATION_TOKEN}`
        }
    })
}