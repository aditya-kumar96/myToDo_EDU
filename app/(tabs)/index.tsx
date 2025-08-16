import useColorScheme from "@/hooks/useColorScheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {toggleDarkMode} = useColorScheme()
  return (
    <View
      style={style.container}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'red'
  }
})