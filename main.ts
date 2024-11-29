// deno-lint-ignore-file
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { MongoClient } from "mongodb";
import { vuelosModel } from "./types.ts";
import { gqlschema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";

const urlMongo = Deno.env.get("MONGO_URL");

if(!urlMongo) {
  console.log("No se ha podido conectar a la URL");
  Deno.exit(1);
}

const client = new MongoClient(urlMongo);
const dbName = 'vuelosComaniaAerea';

await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const vuelosCollection = db.collection<vuelosModel>('vuelos');

const server = new ApolloServer({
  typeDefs: gqlschema,
  resolvers: resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ vuelosCollection })
});

console.log(`🚀  Server ready at: ${url}`);