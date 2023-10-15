import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'

import React from 'react'

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Alex & John's </Text>
          <Ionicons name='pricetag-outline' size={20} />
        </View>
      </View>
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 2,
        marginVertical: 16,
        marginHorizontal: 10
      }}>

        <TouchableOpacity>
          <Feather
            name='search'
            size={24}
            style={{
              marginHorizontal: 5,
              color: "black",
            }} />
        </TouchableOpacity>

        <View style={{
          flex: 1,
          backgroundColor: "lightgray",
          marginRight: 20,
          borderRadius: 20
        }}>

          <TextInput
            style={{
              fontWeight: "bold",
              width: "auto",
              height: "auto",
              marginTop: 3,
              paddingHorizontal: 10,
              textAlign: "center"
            }}
            value=''
            onPressIn={() => { }}
            placeholder='Search for products'
          />

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});