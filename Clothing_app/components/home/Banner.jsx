import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Banner = () => {
    const images = [
        require('../../assets/images/Hugo_Sweatshirt.jpg'),
        require('../../assets/images/Gant_Sweatshirt.jpg'),
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