// Track the searches made by users
// Check if a record of that search query already exists
// if a document is found increment the searchCount field
// if no document is found,
//  create a new document in Appwrite Database -> 1

import { Client, Databases, ID, Query } from "react-native-appwrite";

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);


const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(databaseId, collectionID, [
      Query.equal("searchTerm", [query]), 
    ]);

    console.log(result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      // Increment the searchCount field
      await databases.updateDocument(databaseId, collectionID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      // Create a new document for this search query
      await databases.createDocument(databaseId, collectionID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};


export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
      const result = await databases.listDocuments(databaseId, collectionID, [
      Query.limit(5), 
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];

  } catch (error) {
    console.log(`Error: ${error}`);
    return undefined;
  }
}; 