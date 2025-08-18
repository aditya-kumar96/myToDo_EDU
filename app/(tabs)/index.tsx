import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useColorScheme from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">
export default function Index() {
  const {  colors } = useColorScheme()
  const [editingId,setEditingId] = useState<Id<"todos"> | null>(null)
  const [editText,setEditText] = useState("");
  
  
  
  const getTodo = useQuery(api.todos.getTodos);
  
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodo = useMutation(api.todos.clearAllTodos)
  const updateTask = useMutation(api.todos.updateTodo)
  const deletetask = useMutation(api.todos.DeleteTodo)
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

  const handleUpdateTask = async (todo:Todo) => {
      setEditText(todo.text);
      setEditingId(todo._id)
  }

  const handleSaveTask = async () => {
    if (editingId) {
    try {
        await updateTask({id:editingId , text:editText.trim()})
        setEditText("")
        setEditingId(null)
      } catch (error) {
        console.log("Error in updating todo",error);
        
        Alert.alert("Error","Failed to Update Todo")
      }
    }
  }

  const handleCancelTask =  () => {
      setEditingId(null);
      setEditText("")
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      Alert.alert("Delete Todo", "Are you sure you want to delete this Todo?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await deletetask({ id })
            }
          }
        ]
      );


    } catch (error) {
      console.log("error during Toggle");
      Alert.alert("Error", "Failed to Delete Task")
    }
  }

  if (isLoading) return <LoadingSpinner />


  const renderTODOItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id ;
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

          {
            isEditing ? (
              <View style={styles.editContainer}>
                  <TextInput
                    style={styles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                    autoFocus
                    multiline
                    placeholder="Edit Your Todo..."
                    placeholderTextColor={colors.textMuted}
                  />
                  <View style={styles.editButtons}>
                    <TouchableOpacity onPress={handleSaveTask} activeOpacity={0.8}>
                        <LinearGradient colors={colors.gradients.success}
                          style={styles.editButton}
                          >
                            <Ionicons name="checkmark" size={16} color="#fff"/>
                            <Text style={styles.editButtonText}> Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelTask} activeOpacity={0.8}>
                        <LinearGradient colors={colors.gradients.muted}
                          style={styles.editButton}
                          >
                            <Ionicons name="close" size={16} color="#fff"/>
                            <Text style={styles.editButtonText}> Cancel</Text>
                        </LinearGradient>
                    </TouchableOpacity>



                  </View>
              </View>
            ) : (
              <View style={styles.todoTextContainer}>
            <Text
              style={
                [
                  styles.todoText,
                  item.isCompleted && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6
                  }]}>
              {item.text}
            </Text>
            <View style={styles.todoActions}>
              <TouchableOpacity
                onPress={() => handleUpdateTask(item)}
                activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning}
                  style={styles.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning}
                  style={styles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
            )
          }
        </LinearGradient>
      </View>
    )
  }


  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={styles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={getTodo ? getTodo : []}
          renderItem={renderTODOItem}
          keyExtractor={(item) => item._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    </LinearGradient>
  );
}

