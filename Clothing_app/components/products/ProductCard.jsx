import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({ product }) => {

  const navigation = useNavigation();

  // To toggle the put product in favorite function
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product })}>
      <View style={styles.productCardContainer}>
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
              width: "30%",
              height: "100%",
              alignItems: "center",
              borderRadius: 10,
              marginLeft: 60,

            }} resizeMode='contain'
          />
        </View>

        <View style={{ padding: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5, marginLeft: -40 }} numberOfLines={3}>
            {product.name}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 14, color: "gray", marginLeft: -40 }} numberOfLines={3}>
            {product.brand}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: -40 }}>
            {product.price}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  productCardContainer: {
    width: 240,
    height: 240,
    marginEnd: 0,
    borderRadius: 12,
    alignItems: "center", // This centers the content horizontally
    justifyContent: "center", // This centers the content vertically
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
    left: 60, // Place it at the right
    padding: 10, // Add some padding for spacing
  },
})

export default ProductCard