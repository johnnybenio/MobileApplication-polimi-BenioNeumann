import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ProductCard = ({ pageType, product }) => {
  let marginLeftValue;
  let marginEndValue;
  let widthValue;
  let heightValue;
  let leftValue;

  if ((pageType === "Home" || pageType === "Search") && Platform.OS === 'web') {
    marginEndValue = 20;
    marginLeftValue = 20;
    widthValue = 400;
    heightValue = 420;
    leftValue = 105;
  }

  else if (pageType === "Home") {
    marginLeftValue = 10;
    marginEndValue = 40;
    widthValue = 200;
    heightValue = 380;
    leftValue = -7;
  }

  else if (pageType === "Search") {
    marginLeftValue = 10;
    marginEndValue = 5;
    widthValue = 180;
    heightValue = 380;
    leftValue = 3;
  }

  const navigation = useNavigation();

  // To toggle the put product in favorite function
  const [isFavorite, setIsFavorite] = useState(false);
  const [userIn, setUserIn] = useState(false);


  const toggleFavorite = async () => {
    controlUser();
    if (userIn) {
      handleFavorite()
    } else {
      navigation.navigate('Login')
    }
  };

  const controlUser = async () => {
    try {
      const userId = await AsyncStorage.getItem("id")
      if (userId !== null) {
        setUserIn(true);
      }
      else {
        setUserIn(false)
        console.log("The user is not logged in")

      }
    } catch (err) {
      console.log(err)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      controlUser()
      checkIfFavorite()
    }, [])
  );

  const checkIfFavorite = async () => {
    const id = await AsyncStorage.getItem('id')
    const userId = JSON.parse(id)
    const favoriteId = `fav${userId}`

    try {
      const favorite_ = await AsyncStorage.getItem(favoriteId)
      if (favorite_ !== null) {
        const favorite = JSON.parse(favorite_)
        if (favorite[product._id] !== undefined) {
          setIsFavorite(true)
        }
        else {
          setIsFavorite(false)
        }
      }
      else {
        setIsFavorite(false)
      }

    }
    catch (err) {
      console.log(err)
    }
  };


  const handleFavorite = async () => {

    const id = await AsyncStorage.getItem('id')
    const userId = JSON.parse(id)
    const favoriteId = `fav${userId}`

    let product_ = {
      name: product.name,
      brand: product.brand,
      _id: product._id,
      price: product.price,
      imageURL: product.imageURL
    }

    try {
      const itemExists = await AsyncStorage.getItem(favoriteId)

      let favorite_ = null;
      if (itemExists) {
        favorite_ = JSON.parse(itemExists)
      }
      else {
        favorite_ = {}
      }

      if (favorite_[product._id]) {
        delete favorite_[product._id]
        console.log("deleted from fav")
        setIsFavorite(false)
      }
      else {
        favorite_[product._id] = product_
        console.log("Added to fav")
        setIsFavorite(true)
      }
      await AsyncStorage.setItem(favoriteId, JSON.stringify(favorite_))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product })}>
      <View style={[styles.productCardContainer, {
        marginEnd: marginEndValue,
        marginLeft: marginLeftValue,
        width: widthValue,
        height: heightValue,
        left: leftValue
      }]}>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart-sharp" : "heart-outline"}
            style={styles.heartIconContainer}
            size={25} color={"red"}
          />
        </TouchableOpacity>

        <View style={styles.productCardImageContainer}>
          <Image
            source={{ uri: product.imageURL }}
            style={{
              aspectRatio: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              borderRadius: 10,
              marginLeft: Platform.OS === 'web' ? -60 : -5,
            }} resizeMode='center'
          />
        </View>

        <View style={{ padding: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: Platform.OS === 'web' ? 20 : 9, marginBottom: 5, marginLeft: -40 }} numberOfLines={3}>
            {product.name}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: Platform.OS === 'web' ? 20 : 10, color: "gray", marginLeft: -40 }}>
            {product.brand}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: Platform.OS === 'web' ? 20 : 10, marginLeft: -40 }}>
            {product.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  productCardContainer: {
    borderRadius: 12,
    alignItems: "center", // This centers the content horizontally
    justifyContent: "center", // This centers the content vertically
    /*
    ...Platform.select({
      web: {
        width: 400,
        height: 420,
        left: 105
      },
      default: {
        width: 200, 
        height: 380 
    */
  },
  productCardImageContainer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    borderRadius: 15
  },
  heartIconContainer: {
    position: "relative", // Position the heart icon absolutely
    top: 0, // Place it at the top
    left: 50, // Place it at the right
    padding: 10, // Add some padding for spacing
  },
})

export default ProductCard