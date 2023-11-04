import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl } from '../config';
import axios from "axios";

const addToCart = async(productId, quantity) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const endpoint = `${apiUrl}/api/cart`;

        const data = {
            cartProduct: productId,
            quantity: quantity
        }
        const headers = {
            "Content-Type":"application/json",
            "token":"Bearer " + JSON.parse(token)
        };


        await axios.post(endpoint, data, {headers})
    } catch (err) {
        throw new Error(err.messege)
    }
};

export default addToCart;