import { createHomeStyles } from '@/assets/styles/home.styles'
import { api } from '@/convex/_generated/api'
import useColorScheme from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View } from 'react-native'

const TodoInput = () => {
    const { colors } = useColorScheme()
    const homeStyle = createHomeStyles(colors)
    const [newTodo, setNewTodo] = useState("");

    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
            if (newTodo.trim()) {
                try {
                    await addTodo({text:newTodo.trim()})
                    setNewTodo("")
                } catch (error) {
                    console.log("error in adding todo " , error);
                    
                        Alert.alert("Error","Failed to add Todo")
                }
            }
    }

    return (
        <View style={homeStyle.inputSection}>
            <View style={homeStyle.inputWrapper}>
                <TextInput
                    style={homeStyle.input}
                    placeholder='What needs to be done ?'
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={handleAddTodo}
                    placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity
                    onPress={handleAddTodo}
                    activeOpacity={0.8}
                    disabled={!newTodo.trim()}
                >
                    <LinearGradient
                        colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyle.addButton, !newTodo.trim() && homeStyle.addButtonDisabled]}
                    >
                        <Ionicons
                            name='add'
                            size={24}   
                            color="#FFF"
                        />
                    </LinearGradient>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput