import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({ pageType, product }) => {

  let marginLeftValue = 0;
  let marginEndValue = 0;

  if (pageType === "Home" && Platform.OS === 'web') {
    marginEndValue = 20;
    marginLeftValue = 20;
  }

  else if (pageType === "Home") {
    marginLeftValue = 25;
    marginEndValue = 20;
  }

  else if (pageType === "Search") {
    marginLeftValue = 0;
    marginEndValue = 0;
  }

  const navigation = useNavigation();

  // To toggle the put product in favorite function
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product })}>
      <View style={[styles.productCardContainer, { marginEnd: marginEndValue, marginLeft: marginLeftValue }]}>
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
              marginLeft: Platform.OS === 'web' ? -60 : -15,
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
    ...Platform.select({
      web: {
        width: 400,
        height: 420,
        left: 105
      },
      default: {
        width: 190,
        height: 380
      },
    })
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
    left: 30, // Place it at the right
    padding: 10, // Add some padding for spacing
  },
})

export default ProductCard