import { ImageBackground, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView } from 'react-native'
import Welcome from '../components/home/Welcome'
import ProductAligner from '../components/products/ProductAligner'
import { Platform } from 'react-native'

const Home = () => {
  let visibleIndexCounter = 0;

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
      </View >
      <ScrollView>
        <Welcome />
        <ProductAligner visableIndexCounter={visibleIndexCounter} />
        <ProductAligner visableIndexCounter={Platform.OS === 'web' ? visibleIndexCounter + 3 : visibleIndexCounter + 2} />
      </ScrollView>
    </SafeAreaView >
  )
}

export default Home

