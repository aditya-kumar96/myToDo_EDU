import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import { api } from "@/convex/_generated/api";
import useColorScheme from "@/hooks/useColorScheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {toggleDarkMode , colors} = useColorScheme()
  const getTodo = useQuery(api.todos.getTodos);
    console.log(getTodo);
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodo = useMutation(api.todos.clearAllTodos)

    const styles = createHomeStyles(colors)

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
    <SafeAreaView
      style={styles.safeArea}
    >


    <Header/>



      <TouchableOpacity onPress={()=>toggleDarkMode()}> 
        <Text>Toogle Mode</Text>
      </TouchableOpacity>
     <Text>Hi </Text>
    </SafeAreaView>
    </LinearGradient>
  );
}

