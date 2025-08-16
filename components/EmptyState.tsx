import { createHomeStyles } from '@/assets/styles/home.styles'
import useColorScheme from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'

const EmptyState = () => {
    const {colors} = useColorScheme()
    const homestyles = createHomeStyles(colors)

  return (
    <View style={homestyles.emptyContainer}>
        <LinearGradient colors={colors.gradients.empty} style={homestyles.emptyIconContainer}>
            <Ionicons name='clipboard-outline' size={60} color={colors.textMuted}/>
        </LinearGradient>
      <Text style={homestyles.emptyText}>No Todo Yet !</Text>
      <Text style={homestyles.emptySubtext}> Add your first Todo above to get started</Text>
    </View>
  )
}

export default EmptyState