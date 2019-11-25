import { ApolloServer, gql } from "apollo-server";

// typeDefs are types
const typeDefs = gql`
    # schéma Graphql les symboles (#) permettent de commenter
    
    type User {
        id: ID!
        name: String!
    }
    
    type Query {
        # le type Query contient les requêtes que peux faire le client pour
        # récupérer des données
        users(name: String): [User]
    }

    type Mutation {
        # le type Mutation contient les requêtes qui réalisent une modification des données
        createUser(name: String!): User
    }
`;

interface User {
    id: string,
    name: string
}

const idGenerator = function* () {
    let i = 0
    while (true) {
        i++;
        yield ''+i;
    }
}();

const users: User[] = [
    {
        id: idGenerator.next().value,
        name: "James Hetfield",
    },
    {
        id: idGenerator.next().value,
        name: "Dave Mustaine",
    }
];
//
const resolvers = {
    Query: {
        users: (parent:any, {name}:{name:string}) => {
            return name ? users.filter(user => user.name.toLowerCase().indexOf(name.toLowerCase()) > -1) : users;
        }
    },
    Mutation: {
        createUser: (parent: any, {name}: {name:string}) => {
            const user = {
                id: idGenerator.next().value,
                name
            };
            users.push(user);
            return user;
        }
    }
}



// Le serveur Apollo a besoin de 2 paramètres, le schéma de données et l'ensemble des résolveurs
const server = new ApolloServer({typeDefs, resolvers});

// La méthode listen exécute le serveur
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});