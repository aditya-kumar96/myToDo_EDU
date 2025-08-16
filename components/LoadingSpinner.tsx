import { createHomeStyles } from '@/assets/styles/home.styles'
import useColorScheme from '@/hooks/useColorScheme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const LoadingSpinner = () => {
    const {colors} = useColorScheme()
    const homeStyle = createHomeStyles(colors)

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyle.container}>
        <View style={homeStyle.loadingContainer}>
            <ActivityIndicator size={'large'} color={colors.primary}/>
            <Text style={homeStyle.loadingText}>Loading Todos...</Text>
        </View>
      <Text>LoadingSpinner</Text>
    </LinearGradient>
  )
}

export default LoadingSpinner