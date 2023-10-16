import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'

const ProductAligner = () => {
    const data = [1, 2]
    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={data}
                renderItem={({ product }) => <ProductCard />}
                horizontal={true}
                contentContainerStyle={{ columnGap: -50 }}
            />
        </View>
    )
}

export default ProductAligner