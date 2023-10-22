import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const ProductCard = () => {

  const navigation = useNavigation();

  // To toggle the put product in favorite function
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('isFavorite:', isFavorite); // Add this line for debugging
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
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
            source={require('../../assets/images/Gant_Sweatshirt.jpg')}
            style={{
              aspectRatio: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
            }} resizeMode='contain'
          />
        </View>

        <View style={{ padding: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 5, marginLeft: 20 }} numberOfLines={1}>
            Product name
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 14, color: "gray", marginLeft: 20 }} numberOfLines={1}>
            Brand
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 20 }}>
            $4.99
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
    borderRadius: 12,

  },
  heartIconContainer: {
    position: "relative", // Position the heart icon absolutely
    top: 0, // Place it at the top
    left: 60, // Place it at the right
    padding: 10, // Add some padding for spacing
  },
})

export default ProductCard