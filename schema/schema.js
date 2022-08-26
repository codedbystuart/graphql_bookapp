const graphql = require('graphql');
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const books = [
  {id: '1', name: 'The King of the Jungle', genre: 'Scifi'},
  {id: '2', name: 'The Wolf at Holme Stree', genre: 'Scifi'},
  {id: '3', name: 'Jumping Goat', genre: 'Scifi'},
  {id: '4', name: 'The Jungle Rolex', genre: 'Scifi'},
]

const authors = [
  {id: '1', name: 'Kent Jones', age: 23},
  {id: '2', name: 'John Woo', age: 35},
  {id: '3', name: 'Jaan Chan', age: 53},
  {id: '4', name: 'Brendan Roman', age: 43},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, {id: args.id})
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return books;
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
