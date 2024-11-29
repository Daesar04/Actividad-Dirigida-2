import { vuelos, vuelosModel } from "./types.ts";

export const fromModelToVuelo = (
    vuelo: vuelosModel
): vuelos => {
    return {
        id: vuelo._id!.toString(),
        origen: vuelo.origen,
        destino: vuelo.destino,
        fechayhora: vuelo.fechayhora
    }
};