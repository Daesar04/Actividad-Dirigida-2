export const gqlschema = `#graphql
    type vuelos {
        id: ID!,
        origen: String!,
        destino: String!,
        fechayhora: String!
    }

    type Query {
        getFlights(origen: String, destino: String): [vuelos!]!
        getFlight(id: ID!): vuelos
    }

    type Mutation {
        addFlight(origen: String!, destino: String!, fechayhora: String!): vuelos!
    }
`;