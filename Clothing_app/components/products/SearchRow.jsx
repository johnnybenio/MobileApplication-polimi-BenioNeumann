import { Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"

const SearchRow = ({ product }) => {
    // To navigate from a child componanent and pass the product information 
    const navigator = useNavigation()

    return (
        <View>
            <TouchableOpacity onPress={() => navigator.navigate('ProductDetails', { product })} style={{
                flex: 1, justifyContent: "space-between",
                alignItems: "center", marginTop: -10,
                flexDirection: "row", padding: 20,
                borderRadius: 30, backgroundColor: "white",

            }}>
                <View style={{ width: 50, backgroundColor: "white", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                    <Image source={{ uri: product.imageURL }} style={{ width: "100%", height: 68, borderRadius: 5, resizeMode: "cover" }} />
                </View>
                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>{product.name}</Text>
                    <Text style={{ fontSize: 10, fontStyle: "italic", color: "gray", marginTop: 2 }}>{product.price}</Text>
                    <Text style={{ fontSize: 10, fontStyle: "italic", color: "gray", marginTop: 2 }}>{product.brand}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SearchRow