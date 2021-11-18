import dotenv from "dotenv";
dotenv.config()

import { allCards } from "./pipefy.api.js";

async function cleanPipe(pipeId) {
    try {
        const response = await allCards(pipeId)

        console.log(JSON.stringify(response.data))
    } catch (error) {
        console.error(error)
    }
}

cleanPipe('301716578')