import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const Cart = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Alex & John's </Text>
                    <Ionicons name='pricetag-outline' size={20} />
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