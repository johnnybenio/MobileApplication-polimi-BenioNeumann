import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import addToCart from '../hook/addToCart'
import AsyncStorage from '@react-native-async-storage/async-storage'
import retrieveCart from '../hook/retrieveCart'
import deleteCartProduct from '../hook/deleteCartProduct';


const ProductDetails = ({ navigation }) => {

    const [count, SetCount] = useState(1);
    const [userIn, setUserIn] = useState(false);
    const {data, isLoading, err, refetch} = retrieveCart();
    const increase = () => {        // increase the number of items in the cart
        SetCount(count + 1);        // decrease the number of items in the cart
        console.log(count);
    }
    const decrease = () => {
        if (count > 1) { SetCount(count - 1); }
        console.log(count);
    };

    const controlUser = async () => {
        try {
            const userId = await AsyncStorage.getItem("id")
            if (userId !== null) {
                setUserIn(true);
            }
            else {
                setUserIn(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        controlUser();
        checkIfFavorite();
        checkIfAddedToCart();
    }, []);

    const checkIfAddedToCart = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = JSON.parse(id)
        const cartId = `cart${userId}`

        try{
            const cart_ = await AsyncStorage.getItem(cartId)

            if (cart_ !== null){
                const cart = JSON.parse(cart_)
                if(cart[product._id]){
                    setIsAddedToCart(true)
                }
            }
            else{
                setIsAddedToCart(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    const checkIfFavorite = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = JSON.parse(id)
        const favoriteId = `fav${userId}`

        try {
            const favorite_ = await AsyncStorage.getItem(favoriteId)

            if (favorite_ !== null) {
                const favorite = JSON.parse(favorite_)
                if (favorite[product._id]) {

                    setIsFavorite(true)
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

    // To toggle the put product in favorite function
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAdded, setIsAddedToCart] = useState(false);

    const route = useRoute();


    const { product } = route.params; 

    const toggleFavorite = async () => {
        console.log("PRESSED")
        controlUser();
        if (userIn) {
            handleFavorite()
        } else {
            navigation.navigate('Login')
        }
    };

    const toggleAddedToCart = () => {
        controlUser();
        if (userIn) {
            if (isAdded === false) {
                setIsAddedToCart(true);
                addToCart(product._id, count);
                handleCart();
            }
            else {
                setIsAddedToCart(false);
                deleteCartProduct(product._id);
                handleCart();
            }
        }
        else {
            navigation.navigate('Login')
        }
    };

    const handleCart = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = JSON.parse(id)
        const cartId = `cart${userId}`
        let product_ = {
            name: product.name,
            brand: product.brand,
            _id: product._id,
            price: product.price,
            imageURL: product.imageURL
        }
        try {
            const itemExists = await AsyncStorage.getItem(cartId)

            let cart_ = null;
            if (itemExists) {
                cart_ = JSON.parse(itemExists)
                console.log(cart_)
            }
            else {
                cart_ = {}
            }

            if (cart_[product._id]) {
                delete cart_[product._id]
                setIsAddedToCart(false)
            }
            else {
                cart_[product._id] = product_
                setIsAddedToCart(true)
            }
            await AsyncStorage.setItem(cartId, JSON.stringify(cart_))
        }
        catch (err) {
            console.log(err)
        }
    }

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
                setIsFavorite(false)
            }
            else {
                favorite_[product._id] = product_
                setIsFavorite(true)
            }
            await AsyncStorage.setItem(favoriteId, JSON.stringify(favorite_))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
            <View style={{
                marginHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: 15,
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
                            <View style={{ marginLeft: "80%", flexDirection: "row", top: 161, zIndex: 999 }}>
                                <TouchableOpacity onPress={toggleAddedToCart} style={{ marginRight: 10 }}>
                                    <Ionicons name={isAdded ? 'cart-sharp' : "cart-outline"} size={30} color={"red"} />
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