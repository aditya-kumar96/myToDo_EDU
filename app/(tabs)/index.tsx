import { api } from "@/convex/_generated/api";
import useColorScheme from "@/hooks/useColorScheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {toggleDarkMode} = useColorScheme()
  const getTodo = useQuery(api.todos.getTodos);
    console.log(getTodo);
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodo = useMutation(api.todos.clearAllTodos)

    
  return (
    <View
      style={style.container}
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
const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  }
})