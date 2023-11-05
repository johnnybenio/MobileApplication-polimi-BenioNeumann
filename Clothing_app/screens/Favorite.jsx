import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList, Image, Platform, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const Favorite = ({ }) => {
    const [favorites, setFavorites] = useState([])
    const [userIn, setUserIn] = useState(false);

    const navigation = useNavigation()
    useFocusEffect(
        React.useCallback(() => {
            controlUser();
            checkIfFavorite();
        }, [userIn])
    );

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

    const checkIfFavorite = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = JSON.parse(id)
        const favoriteId = `fav${userId}`

        try {
            const favorite_ = await AsyncStorage.getItem(favoriteId)
            if (favorite_ !== null) {
                const favorite = JSON.parse(favorite_)
                const favorites = Object.values(favorite)

                setFavorites(favorites)
            }

        } catch (err) {
            console.log(err)
        }
    };

    return (
        userIn === true ? (<SafeAreaView style={{ backgroundColor: "white", height: "100%" }} >
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    <ImageBackground source={require('../assets/images/jaguar.jpg')} resizeMode="cover" style={{ width: "100%", height: "100%" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: "center", color: "white" }}>Alex & John's </Text>
                            <Ionicons name='pricetag-outline' size={20} color={"white"} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={{
                    marginTop: 20,
                    marginHorizontal: 20
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "5%",
                        marginBottom: 12
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={20} color={"black"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>

                </View>

                <FlatList
                    data={favorites}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product: item })}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    ...(Platform.OS === 'web' ? { padding: "1%" } : { padding: "10%" }),

                                    backgroundColor: "white"
                                }}>
                                    <View style={{
                                        width: "20%",
                                        borderRadius: 15,
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }}>
                                        <Image
                                            source={{ uri: item.imageURL }}
                                            style={{
                                                aspectRatio: 1,
                                                ...(Platform.OS === 'web' ? { width: "50%", height: "50%" } : { width: "150%", height: "150%" }),
                                                alignItems: "center",
                                                borderRadius: 10,
                                                marginLeft: Platform.OS === 'web' ? -60 : -5,

                                            }} resizeMode='contain'

                                        />
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        marginHorizontal: 15
                                    }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, marginLeft: 20 }}>{item.name}</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, marginLeft: 20 }}>{item.brand}</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, marginLeft: 20 }}>{item.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                    }
                    }
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>
        </SafeAreaView >) :
            (
                <SafeAreaView>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                            <ImageBackground source={require('../assets/images/jaguar.jpg')} resizeMode="cover" style={{ width: "100%", height: "100%" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: "center", color: "white" }}>Alex & John's </Text>
                                    <Ionicons name='pricetag-outline' size={20} color={"white"} />
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{
                            marginTop: 20,
                            marginHorizontal: 20
                        }}>
                            <View style={{

                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                    Please log in to set favorites
                                </Text>
                            </View>

                        </View>
                    </View></SafeAreaView>
            )

    )
}

export default Favorite
