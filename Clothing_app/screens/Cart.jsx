import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const Cart = () => {
    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    <ImageBackground source={require('../assets/images/jaguar.jpg')} resizeMode="cover" style={{ width: "100%", height: "100%" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: "center", color: "white" }}>Alex & John's </Text>
                            <Ionicons name='pricetag-outline' size={20} color={"white"} />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cartCount: {
        position: 'absolute',
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'purple',
        justifyContent: "center",
        zIndex: 999
    }
});

export default Cart