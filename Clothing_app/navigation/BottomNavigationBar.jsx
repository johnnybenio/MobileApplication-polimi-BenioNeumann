import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { Home, Search, Cart, Favorite, Me } from '../screens/index'
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

const barOptions = {
    tabBarShowLabel: true,
    tabBarLabelStyle: {
        ...(Platform.OS === 'web' && { marginLeft: 25 }),
        color: 'black'
    },
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        height: 70
    },
    tabBarBackground: () => (
        <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
    ),
}

const styles = StyleSheet.create({
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: -7,
        backgroundColor: 'green', // Background color of the badge
        borderRadius: 15, // Half of the height for a circular badge
        paddingHorizontal: 4, // Adjust padding as needed
    },
    cartBadgeText: {
        color: 'white', // Color of the text inside the badge
        fontSize: 13, // Adjust font size as needed
        fontWeight: 'bold',
    },
});

const Bar = createBottomTabNavigator();

/* Create navigation bar, if component is selected, make it focused icon */
const BottomNavigationBar = () => {
    return (
        <Bar.Navigator screenOptions={barOptions}>
            <Bar.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "home-sharp" : "home-outline"}
                        size={26}
                        color={focused ? 'black' : 'gray'}
                    />
                )
            }} />

            <Bar.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "search-sharp" : "search-outline"}
                        size={26}
                        color={focused ? 'black' : 'gray'}
                    />
                )
            }} />

            <Bar.Screen name="Cart" component={Cart} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Ionicons
                            name={focused ? "cart-sharp" : "cart-outline"}
                            size={26}
                            color={focused ? 'black' : 'gray'}
                        />
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>8</Text>
                        </View>
                    </View>

                )
            }} />

            <Bar.Screen name="Favorite" component={Favorite} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "heart" : "heart-outline"}
                        size={26}
                        color={focused ? 'black' : 'gray'}
                    />
                )
            }} />

            <Bar.Screen name="Me" component={Me} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "person-sharp" : "person-outline"}
                        size={26}
                        color={focused ? 'black' : 'gray'}
                    />
                )
            }} />
        </Bar.Navigator>
    )
}

export default BottomNavigationBar;
