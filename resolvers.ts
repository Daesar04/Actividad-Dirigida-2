import { type Collection, ObjectId } from "mongodb";
import { vuelos, vuelosModel } from "./types.ts";
import { fromModelToVuelo } from "./utils.ts";

export const resolvers = {
    Query: {
        getFlights: async (
            _: unknown,
            args: { origen: string, destino: string },
            context: { vuelosCollection: Collection<vuelosModel> }
        ): Promise<vuelos[]> => {
            if(args.origen && args.destino) 
            {
                const findVuelo = await context.vuelosCollection.find({origen: {$regex:`.*${args.origen}`, $options:"i"}, destino: {$regex:`.*${args.destino}`, $options:"i"}}).toArray();
                return findVuelo.map((v: vuelosModel) => fromModelToVuelo(v));
            }
            else if(args.origen)
            {
                const findVuelo = await context.vuelosCollection.find({origen: {$regex:`.*${args.origen}`, $options:"i"}}).toArray();
                return findVuelo.map((v: vuelosModel) => fromModelToVuelo(v));
            }
            else if(args.destino)
            {
                const findVuelo = await context.vuelosCollection.find({destino: {$regex:`.*${args.destino}`, $options:"i"}}).toArray();
                return findVuelo.map((v: vuelosModel) => fromModelToVuelo(v));
            }

            const findVuelo = await context.vuelosCollection.find().toArray();
            return findVuelo.map((v: vuelosModel) => fromModelToVuelo(v));
        },
        getFlight: async (
            _: unknown,
            args: { id: string },
            context: { vuelosCollection: Collection<vuelosModel> }
        ): Promise<vuelos | null> => {
            const findVuelo = await context.vuelosCollection.findOne({_id: new ObjectId(args.id)});

            if (!findVuelo)
                return null;
            return fromModelToVuelo(findVuelo);
        }
    },
    Mutation: {
        addFlight: async (
            _: unknown,
            args: { origen: string, destino: string, fechayhora: string },
            context: { vuelosCollection: Collection<vuelosModel> }
        ): Promise<vuelos> => {
            const { insertedId } = await context.vuelosCollection.insertOne({
                origen: args.origen,
                destino: args.destino,
                fechayhora: args.fechayhora
            });

            const vuelo = {
                _id: insertedId,
                origen: args.origen,
                destino: args.destino,
                fechayhora: args.fechayhora
            }
            return fromModelToVuelo(vuelo!);
        }
    }
};