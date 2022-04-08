const { ApolloServer, gql } = require("apollo-server-express");
const axios = require("axios");
//type defintions
const typeDefs = gql`
  type People {
    name: String
    mass: String
    gender: String
    homeworld: String
    height: String
  }
  type Query {
    people: [People]
    person(name: String!): People
    page(num: Int!): People
  }
`;

//Query Resolvers
const resolvers = {
  Query: {
    // Make an api call with axios and async await and return an object  containing character details
    people: async () => {
      try {
        const people = await axios.get("https://swapi.dev/api/people");
        return people.data.results.map(
          ({ name, gender, homeworld, mass, height }) => ({
            name,
            mass,
            gender,
            homeworld,
            height,
          })
        );
      } catch (error) {
        throw error;
      }
    },

    // Make an api call with axios and async await and return an array of a single object that contains a single character details. NB: the API call take in an argument that takes the character name as  a parameter
    person: async (_, args) => {
      try {
        const person = await axios.get(
          `https://swapi.dev/api/people/?search=${args.name}`
        );
        return {
          name: person.data.results[0].name,
          gender: person.data.results[0].gender,
          homeworld: person.data.results[0].homeworld,
          mass: person.data.results[0].mass,
          height: person.data.results[0].height,
        };
      } catch (error) {
        throw error;
      }
    },
    //This one make an API call and resolves the query to get a paticular page while taking in page number as an arguement
    page: async (_, args) => {
      try {
        const people = await axios.get(
          `https://swapi.dev/api/people/?page=${args.num}`
        )
        return people.data.results.map(
            ({ name, gender, homeworld, mass, height }) => ({
              name,
              mass,
              gender,
              homeworld,
              height,
            })
          );
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
