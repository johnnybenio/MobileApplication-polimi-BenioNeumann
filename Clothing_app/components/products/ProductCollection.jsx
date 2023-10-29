import { ActivityIndicator, View, FlatList, ScrollView, Platform } from 'react-native'
import React from 'react'
import useFetch from '../../hook/useFetch'
import ProductCard from './ProductCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProductCollection = () => {
    const { data, isLoading, err } = useFetch()

    return (isLoading
        ? (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator size={5} color="blue" />
                </View>
            </SafeAreaView>
        )
        : (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {Platform.OS === 'web' ? (
                    <ScrollView>
                        <View style={{ alignItems: "center", paddingLeft: 0 }}>
                            <FlatList
                                data={data}
                                numColumns={2}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => <ProductCard pageType="Search" product={item} />}
                                contentContainerStyle={{ alignContent: "center" }}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                            />
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{ alignItems: "center", paddingLeft: 0 }}>
                        <FlatList
                            data={data}
                            numColumns={2}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => <ProductCard product={item} />}
                            contentContainerStyle={{ alignContent: "center" }}
                            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        />
                    </View>
                )}
            </SafeAreaView>

        )
    )
}

export default ProductCollection