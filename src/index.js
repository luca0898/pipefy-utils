import dotenv from "dotenv";
dotenv.config()

import { allCards, deleteCard } from "./pipefy.api.js";

async function cleanPipe(pipeId) {
    try {
        const { data: response } = await allCards(pipeId)

        if (!response.data.allCards){
            console.log(`Pipe ${pipeId} is empty`)
            return;
        }

        const ids = response.data.allCards.edges.map(item => item.node.id)
        console.log(ids)

        for (var id of ids) {
            setTimeout(async () => {
                const { data } = await deleteCard(id)
                const { success } = data.data.deleteCard

                if (!data.data.deleteCard){
                    console.log(`Card ${id} was not deleted`, JSON.stringify(data.data.deleteCard))
                    break; // jump to next card
                }

                console.log(`Card ${id} delete ${success ? 'success' : 'fail'}`)
            }, 1000)
        }

    } catch (error) {
        console.error(error)
    }
}

cleanPipe('301716578')