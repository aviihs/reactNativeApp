// Track the searches made by users
// Check if a record of that search query already exists
    // if a document is found increment the searchCount field
    // if no document is found,
    //  create a new document in Appwrite Database -> 1

import { Client, Databases, ID, Query } from "react-native-appwrite";

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const matrixId = process.env.EXPO_PUBLIC_APPWRITE_MATRIX_ID!;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {

    try {
        const result = await databases.listDocuments(databaseId, matrixId, [
        Query.equal('query', [query])
    ]);

    console.log(result);

    if(result.documents.length > 0) {
        const existingMovie = result.documents[0];
        // Increment the searchCount field
        await databases.updateDocument(databaseId, matrixId, existingMovie.$id, {
            count: existingMovie.count + 1
        });
    }
    else {
        // Create a new document for this search query
        await databases.createDocument(databaseId, matrixId, ID.unique(), {
            query: query,
            movieId: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `http://image.tmdb.org/t/p/w500${movie.poster_path}`
        });
    }

    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
    

}