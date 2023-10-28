import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductArray from '../components/products/ProductArray';

const ProductCollection = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ProductArray />
        </SafeAreaView>
    )
}

export default ProductCollection