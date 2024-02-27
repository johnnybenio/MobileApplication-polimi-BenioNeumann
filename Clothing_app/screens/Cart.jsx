import { StyleSheet, Text, View, ImageBackground, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React, {useState} from 'react'
import retrieveCart from '../hook/retrieveCart'
import CartTile from '../components/cart/cartTile'
import { FlatList } from 'react-native'
import { useEffect } from 'react'

const Cart = () => {
    const {data, isLoading, err, refetch} = retrieveCart();
    const [selected, setSelected] = useState(null);
    const [select, setSelect] = useState(false)
    useEffect(() => {
        refetch();
      }, []);
    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    <ImageBackground source={require('../assets/images/jaguar.jpg')} resizeMode="cover" style={{ width: "100%", height: "100%" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: "center", color: "white" }}>Alex & John's </Text>
                            <Ionicons name='pricetag-outline' size={20} color={"white"} />
                        </View>
                    </ImageBackground>
                </View>
            </View>
            {isLoading ? (<ActivityIndicator/>) : (
            
            <FlatList
            data = {data}
            
            keyExtractor = {(item) => item._id} 
            renderItem = {({item}) => <CartTile item={item} onPress={() => {setSelect(!select), setSelected(item)}} select={select} />}
            
            />)}

        </SafeAreaView>
    )
}

{select === false ? (<View></View>): (< Button title={'Checkout'} isValid={select} onPress={() => {}} />) }

const styles = StyleSheet.create({
    cartCount: {
        position: 'absolute',
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'purple',
        justifyContent: "center",
        zIndex: 999
    }
});

export default Cart