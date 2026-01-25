import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-rubik  text-blue-500">
        Welcome to RealState!
      </Text>

<Link href="/Signin">SignIn</Link>
<Link href="/Explore">Explore</Link>
<Link href="/Profile">Profile</Link>
<Link href="/properties/123">Property</Link>

    </View>
  );
}
 