import {config} from "../config";
import type { Cliente } from "../models/responses/Cliente";

const API_URL = `${config.api.url}/cliente`;

export async function getProducts(): Promise<Cliente []>{ 
    try {
        const response =  await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener los clientes")
        }

        return await response.json();
    } catch (error) {
        console.error("Error en ClienteService:", error);
        throw error;
    }
}