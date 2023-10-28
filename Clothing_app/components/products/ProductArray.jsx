import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import useFetch from '../../hook/useFetch'
import ProductCard from './ProductCard'

const ProductArray = () => {
    const { data, isLoading, err } = useFetch()

    return (isLoading
        ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                <ActivityIndicator size="5" color="blue" />
            </View>)
        : (

            <View style={{ alignItems: "center", paddingLeft: 6 }}>

                <FlatList
                    data={data}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    contentContainerStyle={{ alignContent: "center" }}
                    ItemSeperatorComponent={() => <View style={{ height: 10 }} />}
                />
            </View>
        )
    )
}

export default ProductArray

const styles = StyleSheet.create({})