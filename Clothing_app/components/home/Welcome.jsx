import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RollingText from "react-native-rolling-text";
import RollingContent from 'react-native-rolling-bar';
import Banner from './Banner';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={{ width: "100%" }}>
      <View>
        <RollingContent interval={3000} defaultStyle={false}>
          <Text style={{
            backgroundColor: "black",
            color: "white", textAlign: "center"
          }}>FREE SHIPPING & FREE RETURNS OVER 4.99$</Text>
          <Text style={{
            backgroundColor: "black",
            color: "white", textAlign: "center"
          }}>SALES UP TO 70%</Text>
        </RollingContent>

      </View>
      <View style={{ overflow: 'hidden' }}>
        <RollingText durationMsPerWidth={10} style={{ fontStyle: "italic", fontSize: 40, color: "darkgreen", fontWeight: "bold", marginTop: 10 }}>
          {"Welcome to the clothing shop"}
        </RollingText>
      </View>
      <Banner />
    </View >

  )
}
export default Welcome