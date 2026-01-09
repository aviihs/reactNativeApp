import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  if (focused) {
  return (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row flex-1 w-full min-w-[110px] min-h-[70px] mt-4 justify-center items-center rounded-full overflow-hidden"
    >
      <Image source={icon} tintColor="#151312" className="size-5" />
      <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
    </ImageBackground>
  );
  }
  else {
    return (
     <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
  
};

const _layout = () => {
  return (
    <Tabs 
      screenOptions={
        {
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          },
          tabBarStyle: {
            backgroundColor: '#0f0D23',
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#0f0D23'
          }
        }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon 
          focused={focused}
          icon={icons.home}
          title="Home"
          />
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon 
          focused={focused}
          icon={icons.person}
          title="Profile"
          />,
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon 
          focused={focused}
          icon={icons.save}
          title="Saved"
          />,
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon 
          focused={focused}
          icon={icons.search}
          title="Search"
          />,
        }}
      />
    </Tabs>
  );
};

export default _layout;


