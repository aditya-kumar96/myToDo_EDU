import { createHomeStyles } from '@/assets/styles/home.styles'
import { api } from '@/convex/_generated/api'
import useColorScheme from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'

const Header = () => {

    const { colors } = useColorScheme()
    const headerStyle = createHomeStyles(colors);

    const todos = useQuery(api.todos.getTodos)

    const completedTasks = todos ? todos?.filter((todo) => todo.isCompleted).length : 0;
    const totoalCount = todos ? todos.length : 0
    const progressPercentage = totoalCount > 0 ? (completedTasks / totoalCount) * 100 : 0;


    return (
        <View style={headerStyle.header}>
            <View style={headerStyle.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={headerStyle.iconContainer}>
                    <Ionicons name='flash-outline' size={28} color="#ffffff" />
                </LinearGradient>

                <View style={headerStyle.titleTextContainer}>
                    <Text style={headerStyle.title}>
                        Today&apos;s Tasks
                    </Text>
                    <Text style={headerStyle.subtitle}>
                        {completedTasks} of {totoalCount} Completed
                    </Text>
                </View>
            </View>

            {totoalCount > 0 && (
                <View style={headerStyle.progressContainer}>
                    <View style={headerStyle.progressBarContainer}>
                        <View style={headerStyle.progressBar}>
                            <LinearGradient
                                colors={colors.gradients.success}
                                style={[headerStyle.progressFill, { width: `${progressPercentage}%` }]}
                            />
                        </View>
                        <Text style={headerStyle.progressText}>{Math.round(progressPercentage)}%</Text>
                    </View>
                </View>
            )}


        </View>
    )
}

export default Header