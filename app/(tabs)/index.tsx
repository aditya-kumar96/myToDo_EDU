import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useColorScheme from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, FlatList, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">
export default function Index() {
  const { toggleDarkMode, colors } = useColorScheme()
  const getTodo = useQuery(api.todos.getTodos);
  console.log(getTodo);
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodo = useMutation(api.todos.clearAllTodos)
  const toggleTask = useMutation(api.todos.toggleTodo)
  const styles = createHomeStyles(colors)

  const isLoading = getTodo === undefined;

  const handleTodoToggle = async (id: Id<"todos">) => {
    try {
      await toggleTask({ id })
    } catch (error) {
      console.log("error during Toggle");
      Alert.alert("Error", "Failed to Complete Task")

    }
  }

  if (isLoading) return <LoadingSpinner />


  const renderTODOItem = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface}
          style={styles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleTodoToggle(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={
                [styles.checkboxInner, {
                  borderColor: item?.isCompleted ? "transparent" : colors.border
                }]}>
              {
                item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />
              }

            </LinearGradient>
          </TouchableOpacity>

        </LinearGradient>
      </View>
    )
  }


  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header />
        <TodoInput />
        <FlatList
          data={getTodo}
          renderItem={renderTODOItem}
          keyExtractor={(item) => item._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
        />

      </SafeAreaView>
    </LinearGradient>
  );
}

