import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'

const ProductDetails = ({ navigation }) => {

    // To toggle the put product in favorite function
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddedFromImage, setIsAddedToCartFromImage] = useState(false);
    const [isAddedFromButtom, setIsAddedToCartFromButtom] = useState(false);

    const route = useRoute();
    const { product } = route.params;

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const toggleAddedToCartImage = () => {
        setIsAddedToCartFromImage(!isAddedFromImage);
    };

    const toggleAddedToCartFromButton = () => {
        setIsAddedToCartFromButtom(!isAddedFromButtom);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{
                marginHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                top: 20,
                width: "90%",
                zIndex: 999
            }} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name='arrow-back-outline' size={30} style={{ top: 15 }} />
                </TouchableOpacity>
            </View>

            {Platform.OS === 'web' ? (
                <Image
                    source={{ uri: product.imageURL }}
                    style={{
                        aspectRatio: 1,
                        position: "absolute",
                        width: "30%", // Adjust the width for web
                        height: "70%", // Adjust the height for web
                        bottom: "20%",
                        left: "50%", // Adjust the position as needed
                        transform: [{ translateX: "-50%" }] // Center the image horizontally
                    }}
                    resizeMode='cover'
                />
            ) : (
                <Image
                    source={require('../assets/images/Gant_Sweatshirt.jpg')}
                    style={{
                        aspectRatio: 1,
                        position: "absolute",
                        width: "100%",
                        height: "80%",
                        bottom: "20%",
                        alignItems: "center",
                    }}
                    resizeMode='cover'
                />
            )}

            <View style={{
                marginBottom: 20,
                width: "100%",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,


            }}>
                <View
                    style={{
                        marginHorizontal: 20,
                        paddingBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "85%",
                        top: 500,
                    }} >
                    {Platform.OS === 'web' ?
                        (
                            <View style={{ marginLeft: '70%', flexDirection: "row", bottom: 400 }}>
                                <TouchableOpacity onPress={toggleAddedToCartImage} style={{ marginRight: 10 }}>
                                    <Ionicons name={isAddedFromImage ? 'cart-sharp' : "cart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleFavorite} >
                                    <Ionicons name={isFavorite ? 'heart-sharp' : "heart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                            </View>
                        ) :
                        (
                            <View style={{ marginLeft: "80%", flexDirection: "row", top: 161 }}>
                                <TouchableOpacity onPress={toggleAddedToCartImage} style={{ marginRight: 10 }}>
                                    <Ionicons name={isAddedFromImage ? 'cart-sharp' : "cart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleFavorite} >
                                    <Ionicons name={isFavorite ? 'heart-sharp' : "heart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                            </View>
                        )}
                </View>
                <View style={{
                    marginHorizontal: 16,
                    paddingBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    top: 600,

                }}>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name='truck-fast' size={20} />
                            <Text> Fast Delivery</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", fontSize: 30 }} >Product {product.price}</Text>
                    </View>
                </View>
                <View style={{ marginTop: Platform.OS === 'web' ? 600 : 600 }}>
                    <View style={{ marginHorizontal: 16 }}>
                        <Text style={{ fontWeight: "bold" }}>Product Description</Text>
                        <Text>
                            {product.description}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
                    <TouchableOpacity onPress={() => {
                        toggleAddedToCartFromButton()
                    }}
                        style=
                        {Platform.OS === 'web'
                            ? { flexDirection: "row", backgroundColor: "black", width: "20%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }
                            : { flexDirection: "row", backgroundColor: "black", width: "55%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }}>

                        <Text style={Platform.OS === 'web'
                            ? { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 30 }
                            : { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 12 }}> Add To Cart </Text>

                        {Platform.OS === 'web'
                            ? <Ionicons name={isAddedFromButtom ? 'cart-sharp' : "cart-outline"} size={30} color={"white"} style={{ marginLeft: "2%" }} />
                            : <Ionicons name={isAddedFromButtom ? 'cart-sharp' : "cart-outline"} size={30} color={"white"} style={{ marginLeft: "3%", bottom: "2%" }} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}

export default ProductDetails

const styles = StyleSheet.create({})