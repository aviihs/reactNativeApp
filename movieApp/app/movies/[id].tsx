import { View, Text, Image, ScrollView } from "react-native";
import React, { use } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">•</Text>
            <Text className="text-light-200 text-sm">{movie?.runtime} min</Text>
          </View>

          <View className="flex-row bg-dark-100 items-center px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm font-bold">
              {Math.round(movie?.vote_average ?? 0)} / 10
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
