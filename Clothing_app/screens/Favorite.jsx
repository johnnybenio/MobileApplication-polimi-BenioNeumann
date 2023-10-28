import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

import React from 'react'

const Favorite = () => {
    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Alex & John's </Text>
                    <Ionicons name='pricetag-outline' size={20} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Favorite

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});