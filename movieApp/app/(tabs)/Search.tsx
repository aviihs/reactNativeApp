import { View, Image, FlatList } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import MoviesCard from "@/components/MoviesCard";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";

const Search = () => {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

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
          </>
        }
      ></FlatList>
    </View>
  );
};

export default Search;
