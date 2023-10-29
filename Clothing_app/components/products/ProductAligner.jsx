import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import useFetch from '../../hook/useFetch'

const ProductAligner = ({ visableIndexCounter }) => {
    let visibleData;
    const { data, isLoading, err } = useFetch()
    if (!isLoading) {
        visibleData = data.slice(visableIndexCounter, visableIndexCounter + 3);
    }

    return (
        <View style={{ marginTop: 20 }}>
            {isLoading ? (
                <ActivityIndicator size={30} color={"blue"} />
            ) : err ? (
                <Text style={{ fontWeight: 'bold' }}>Error</Text>
            ) : (
                <FlatList
                    data={visibleData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProductCard pageType="Home" product={item} />}
                    horizontal={true}
                    contentContainerStyle={{ columnGap: -50 }}
                />
            )
            }
        </View>
    )
}

export default ProductAligner