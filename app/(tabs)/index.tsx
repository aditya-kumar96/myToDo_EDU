import { api } from "@/convex/_generated/api";
import useColorScheme, { ColorScheme } from "@/hooks/useColorScheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {toggleDarkMode , colors} = useColorScheme()
  const getTodo = useQuery(api.todos.getTodos);
    console.log(getTodo);
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodo = useMutation(api.todos.clearAllTodos)

    const styles = createStyle(colors)

  return (
    <View
      style={styles.container}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>addTodo({text:"Adding first Todo "})}>
        <Text>Add First Todo</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>clearAllTodo()}>
        <Text>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyle = (colors:ColorScheme)=>{
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:colors.bg
    }
  })
  return styles
}