import { View, Image, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MoviesCard from "@/components/MoviesCard";
// import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import SearchBAr from "@/components/SearchBAr";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
  data: movies,
  loading: moviesLoading,
  error: moviesError,
  refetch,
  reset,
} = useFetch(() => fetchMovies({ query: searchQuery }), false);

 useEffect(()  => {

   
   const timeout = setTimeout(async() => {
     if (searchQuery.trim()) {
       await refetch();
       if(movies?.length > 0 && movies?.[0])
         await updateSearchCount(searchQuery, movies[0]);  // Update search count in Appwrite
  }
  else {
    reset();                                              //Debouncingggg
  }
}, 500);
return () => clearTimeout(timeout);
 }, [searchQuery]);


const handleSearch = () => {
  if (!searchQuery.trim()) return;
  refetch();  
};

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MoviesCard {...item} />}
        keyExtractor={(item)=> item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "center", gap: 16, marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}

        ListHeaderComponent={
          <>
          <View className="w-full flex-row justify-center items-center mt-20"> 
          <Image source={icons.logo} className="w-12 h-10" resizeMode="contain" />
          </View>

          <View className="my-5">
            <SearchBAr onPress={handleSearch} placeholder="Search Movies..." value={searchQuery} onChangeText={(text: string) => setSearchQuery(text)} 
              />
          </View>

          {moviesLoading && (
            <ActivityIndicator size="large" color="#0000ff" className="my-3" />
          )}

          {moviesError && (
            <View className="my-3">
              <Text className="text-red-500 text-center">
                Error: {moviesError?.message}
              </Text>
            </View>
          )}

          {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
          <Text className="text-xl text-white font-bold"> Search Results for{' '}
                <Text className="text-accent  font-bold">{searchQuery}</Text>
          </Text>
          )}

          </>
        }

        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5"> 
            <Text className="text-gray-500 text-center">
              {searchQuery.trim() ? 'No results found.' : 'Start typing to search for movies.'}
            </Text>
            </View>
          ): null
        }
      ></FlatList>
    </View>
  );
};

export default Search;
