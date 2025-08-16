import useColorScheme from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
    const {colors} = useColorScheme()
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:colors.primary,
                tabBarInactiveTintColor:colors.textMuted,
                tabBarStyle:{
                    backgroundColor:colors.surface,
                    borderTopWidth:1,
                    borderTopColor:colors.border,
                    height:90,
                    paddingBottom:30,
                    paddingTop:10,
                    
                },
                tabBarLabelStyle:{
                    fontSize:14,
                    fontWeight:'600'
                },
                headerShown:false
            }}
        >
            <Tabs.Screen name='index' options={{
                title: "Todos",
                tabBarIcon:({size , color})=>(
                    <Ionicons name='flash-outline' size={size} color={color}/>
                ),

            }} />
            <Tabs.Screen name='Settings' options={{
                title: "Settings",
                tabBarIcon:({size , color})=>(
                    <Ionicons name='settings' size={size} color={color}/>
                ),

            }} />
        </Tabs>
    )
}

export default TabLayout