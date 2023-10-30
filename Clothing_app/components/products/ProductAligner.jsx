import { ActivityIndicator, FlatList, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import useFetch from '../../hook/useFetch'
import { Platform } from 'react-native'

const ProductAligner = ({ visableIndexCounter }) => {
    let visibleData;
    const { data, isLoading, err } = useFetch()

    if (!isLoading) {
        Platform.OS === 'web' ?
            visibleData = data.slice(visableIndexCounter, visableIndexCounter + 3)
            : visibleData = data.slice(visableIndexCounter, visableIndexCounter + 2)
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
                    scrollEnabled={false}
                    contentContainerStyle={{ columnGap: -50 }}
                />


            )
            }
        </View >
    )
}

export default ProductAligner