import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const CartTile = ({ item, onPress, select }) => {
  console.log(item.cartProduct.imageURL);

  return (
    <TouchableOpacity
        style={{
        flexDirection: 'row',
        marginBottom: 12,
        padding: 16,
        borderRadius: 12,
        backgroundColor: select ? 'lightblue' : '#FFF',
        shadowColor: 'white',
    }}
        onPress={onPress}
    >
      <Image
        source={{ uri: item.cartProduct.imageURL }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} numberOfLines={1}>
          {item.cartProduct.name}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: 'regular', color: 'gray', marginTop: 3 }} numberOfLines={1}>
          {item.cartProduct.brand}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: 'regular', color: 'gray', marginTop: 3 }} numberOfLines={1}>
          {item.cartProduct.price} * {item.quantity}
        </Text>
      </View>
      <TouchableOpacity style={{ paddingBottom: 20, paddingLeft: 75 }} onPress={() => {}}>
        <AntDesign name="delete" size={18} color={'red'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartTile;
