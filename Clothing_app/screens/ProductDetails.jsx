import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import addToCart from '../hook/addToCart'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProductDetails = ({ navigation }) => {

    const [count, SetCount] = useState(1);
    const [userIn, setUserIn] = useState(false);

    const increase = () => {        // increase the number of items in the cart
        SetCount(count + 1);        // decrease the number of items in the cart
    }
    const decrease = () => {
        if(count > 1){SetCount(count - 1);}
    };

    const controlUser = async () => {
        try {
            console.log(userIn)
            const userId = await AsyncStorage.getItem("id")
            if (userId !== null){
                setUserIn(true);
                console.log(userIn)
            }
            else{
                console.log("The user is not logged in")

            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        controlUser();
    }, []);

    // To toggle the put product in favorite function
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAdded, setIsAddedToCart] = useState(false);

    const route = useRoute();
    const { product } = route.params;

    const toggleFavorite = () => {
        controlUser();
        if(userIn){
            setIsFavorite(!isFavorite);
        }else{
            navigation.navigate('Login')
        }
    };

    const toggleAddedToCart = () => {
        controlUser();
        if(userIn){
            if(isAdded === false){
                addToCart(product._id, count);
                setIsAddedToCart(true);

            }
            else{
                setIsAddedToCart(false);
            }
        }
        else{
            navigation.navigate('Login')
        }
    };
    
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
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
                    source={{ uri: product.imageURL }}
                    style={{
                        aspectRatio: 1,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        bottom: "10%",
                        alignItems: "center",

                    }}
                    resizeMode='contain'
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
                                <TouchableOpacity onPress={toggleAddedToCart} style={{ marginRight: 10 }}>
                                    <Ionicons name={isAdded ? 'cart-sharp' : "cart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleFavorite}>
                                    <Ionicons name={isFavorite ? 'heart-sharp' : "heart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                            </View>
                        ) :
                        (
                            <View style={{ marginLeft: "80%", flexDirection: "row", top: 161 }}>
                                <TouchableOpacity onPress={toggleAddedToCart} style={{ marginRight: 10 }}>
                                    <Ionicons name={isAdded ? 'cart-sharp' : "cart-outline"} size={30} color={"red"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress= {toggleFavorite} >
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
                    <TouchableOpacity onPress={toggleAddedToCart}
                        style=
                        {Platform.OS === 'web'
                            ? { flexDirection: "row", backgroundColor: "black", width: "20%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }
                            : { flexDirection: "row", backgroundColor: "black", width: "55%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }}>


                        <Text style={Platform.OS === 'web'
                            ? { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 30 }
                            : { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 12 }}> Add To Cart </Text>

                        {Platform.OS === 'web'
                            ? <Ionicons name={isAdded ? 'cart-sharp' : "cart-outline"} size={30} color={"white"} style={{ marginLeft: "2%" }} />
                            : <Ionicons name={isAdded ? 'cart-sharp' : "cart-outline"} size={30} color={"white"} style={{ marginLeft: "3%", bottom: "2%" }} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
                    <TouchableOpacity onPress={() => increase()}
                        style={Platform.OS === 'web'
                            ? { flexDirection: "row", backgroundColor: "black", width: "5%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }
                            : { flexDirection: "row", backgroundColor: "black", width: "55%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }}>

                        <Text style={Platform.OS === 'web'
                            ? { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: "40%" }
                            : { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 12 }}>+</Text>
                    </TouchableOpacity>

                    <Text>{count}</Text>

                    <TouchableOpacity onPress={() => decrease()}
                        style={Platform.OS === 'web'
                            ? { flexDirection: "row", backgroundColor: "black", width: "5%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }
                            : { flexDirection: "row", backgroundColor: "black", width: "55%", padding: 12, borderRadius: 24, marginLeft: 12, marginTop: 7 }}>

                        <Text style={Platform.OS === 'web'
                            ? { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: "40%" }
                            : { fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 12 }}>-</Text>
                    </TouchableOpacity>
                </View>






            </View>
        </ScrollView >
    )
}

export default ProductDetails

const styles = StyleSheet.create({})