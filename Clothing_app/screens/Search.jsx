import { FlatList, StyleSheet, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import axios from "axios"
import SearchRow from '../components/products/SearchRow';
import apiUrl from '../config';
import ProductArray from '../components/products/ProductCollection';

const Search = () => {
  const [searchState, setSearchState] = useState('')
  const [retrievedData, setRetrievedData] = useState(undefined)
  const [err, setError] = useState(null);

  const getDataOnSearch = async () => {
    try {
      const response = await axios.get(`https://540f-37-119-209-132.ngrok-free.app/api/products/search/${searchState}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setRetrievedData(response.data)

    } catch (err) {
      setError(err)
    }
  }

  const handleSearch = async ({ }) => {

    try {
      const response = await axios.get(`${apiUrl}/api/products/search/${searchState}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setRetrievedData(response.data)

    } catch (err) {
      setError(err)
    }

  };

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
        <TouchableOpacity onPress={() => getDataOnSearch()} on>
          <Feather
            name='search'
            size={30}
            style={{
              marginHorizontal: 5,
              color: "purple",
              fontWeight: 'bold'
            }} />
        </TouchableOpacity>
        <View style={{
          flex: 1,
          backgroundColor: "white",
          marginRight: 20,
          borderRadius: 13,
          height: 33
        }}>
          {Platform.OS === 'web' ? (
            <TextInput
              style={{
                fontWeight: 'bold',
                width: 'auto',
                height: 'auto',
                marginTop: -3,
                padding: 10,
              }}
              value={searchState}
              onChangeText={setSearchState}
              onSubmitEditing={handleSearch}
              placeholder='Search for products'
            />
          ) : (
            <TextInput
              style={{
                fontWeight: 'bold',
                width: 'auto',
                height: 'auto',
                marginTop: 7,
                paddingHorizontal: 10,
              }}
              value={searchState}
              onChangeText={setSearchState}
              onSubmitEditing={handleSearch}
              placeholder='Search for products'
            />
          )}
        </View>
      </View>
      {retrievedData === undefined
        ? (
          <ProductArray />
        )
        : retrievedData.length === 0
          ? (
            <View style={{ flex: 1 }}>
              <Image source={require('../assets/images/error_404.jpeg')} style={{ marginTop: 100 }} />
            </View>
          )
          : <FlatList
            data={retrievedData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <SearchRow product={item} />}
          />
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Search

