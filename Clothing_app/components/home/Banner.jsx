import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Banner = () => {
    const images = [
        require('../../assets/images/Welcome_image1.jpg'),
        require('../../assets/images/Welcome_image2.jpg'),
    ]
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <SliderBox images={images}
                ImageComponentStyle={{ borderRadius: 3, width: "100%", marginTop: 5 }}
                autoplay={true}
                dotStyle={{ width: 0, height: 0 }}
                autoplayInterval={5000}
            />
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({})