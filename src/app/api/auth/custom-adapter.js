import { MongoDBAdapter } from "@auth/mongodb-adapter";

const CustomMongoDBAdapter = (clientPromise) => {
  const adapter = MongoDBAdapter(clientPromise);

  return {
    ...adapter,
    async getUserByAccount(account) {
      // Skip linking accounts, just find user by email instead of by provider
      return null;
    },
  };
};

export default CustomMongoDBAdapter;
