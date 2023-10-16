import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView } from 'react-native'
import Welcome from '../components/home/Welcome'
import ProductAligner from '../components/products/ProductAligner'

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Alex & John's </Text>
          <Ionicons name='pricetag-outline' size={20} />
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <ProductAligner />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

