import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUrl } from '../config';
import axios from "axios";

const deleteCartProduct = async (productId) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const endpoint = `${apiUrl}/api/cart/${productId}`; // Assuming the productId is used in the endpoint

        const headers = {
            "Content-Type":"application/json",
            "token":"Bearer " + JSON.parse(token),
            'ngrok-skip-browser-warning': 'true'

        };

        await axios.delete(endpoint, { headers });
    } catch (err) {
        throw new Error(err.message);
    }
};

export default deleteCartProduct;
