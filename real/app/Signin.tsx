import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";

const Signin = () => {
  const handleLogin = async () => {
    const result = await login();

    if(result){
      console.log(`Login Successfull`)
    }
    else{
      Alert.alert('Error:', 'Failed to login')
    }

  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to RealState!
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2 capitalize">
            Let{"'"}s get you closer to
            <Text className="text-primary-300"> your ideal home</Text>
          </Text>
          <Text className="text-center mt-6 font-rubik text-lg">
            Login to Real Estate with Google
          </Text>

          <TouchableOpacity
            className="shadow-md shadow-zinc-400 mt-5 py-4 bg-white rounded-full w-full"
            onPress={handleLogin}
          >
            <View className=" flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="h-5 w-5"
                resizeMode="contain"
              />
              <Text className="text-black-300 ml-2  font-rubik-medium text-lg">Sign up with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
