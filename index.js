const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Tweet {
    id: ID!
    body: String
    date: Date
    Author: User
    Stats: Stat
  }

  type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: Url
  }

  type Stat {
    views: Int
    likes: Int
    retweets: Int
    responses: Int
  }

  type Notification {
    id: ID
    date: Date
    type: String
  }

  type Meta {
    count: Int
  }

  scalar Url

  scalar Date

  type Query {
    Tweet(id: ID!): Tweet
    Tweets(
      limit: Int
      skip: Int
      sort_field: String
      sort_order: String
    ): [Tweet]
    TweetsMeta: Meta
    User(id: ID!): User
    Notifications(limit: Int): [Notification]
    NotificationsMeta: Meta
  }

  type Mutation {
    createTweet(body: String): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
  }
`;

const users = [
  {
    id: "user1",
    username: "User Name",
    first_name: "First Name",
    last_name: "Last Name",
    full_name: "Full Name",
    name: "Name",
    avatar_url: "wwww.google.com",
  },
  {
    id: "user2",
    username: "User Name 2",
    first_name: "First Name 2",
    last_name: "Last Name 2",
    full_name: "Full Name 2",
    name: "Name 2",
    avatar_url: "wwww.google2.com",
  },
];

const stats = [
  {
    id: "stats1",
    views: 1,
    likes: 1,
    retweets: 1,
    responses: 1,
  },

  {
    id: "stats2",
    views: 2,
    likes: 2,
    retweets: 2,
    responses: 2,
  },
];

const meta = [
  {
    count: 1,
  },
  { count: 2 },
  { count: 2 },
  { count: 2 },
];

const notification = [
  {
    id: "notification1",
    date: 12 / 3 / 2022,
    type: "notification1",
  },
  {
    id: "notification2",
    date: 13 / 3 / 2022,
    type: "notification3",
  },
];

const tweets = [
  {
    id: "tweet1",
    body: "tweet1",
    date: 12 / 3 / 2022,
    AuthorId: "user1",
    StatsId: "stats1",
    status: "read",
    meta: 1,
  },
  {
    id: "tweet2",
    body: "tweet2",
    date: 13 / 3 / 2022,
    AuthorId: "user2",
    StatsId: "stats2",
    status: "not read",
    meta: 2,
  },
];

const resolvers = {
  Query: {
    Tweet: (parent, args, context) => {
      const { id } = args;
      return tweets.find((tweet) => tweet.id === id);
    },
    Tweets: (parent, args, context) => {
      return tweets;
    },

    TweetsMeta: () => meta,

    User: (parent, args, context) => {
      const { id } = args;
      return users.find((user) => user.id == id);
    },

    Notifications: (parent, args, context) => {
      const { limit } = args;
      return notification.slice(0, limit);
    },
    NotificationsMeta: () => {
      return meta;
    },
  },
  Tweet: {
    Stats: (parent, args) => {
      const { id } = parent;
      return stats.find((stat) => stat.tweetId === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
