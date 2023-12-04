

import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { apiUrl } from '../config';
import axios from "axios";
import { useEffect } from "react";


const retrieveCart = async () => {
    const [data, setData] = useState([]);

    const [isLoading, setLoader] = useState(false);
    const [err, setErr] = useState(null);

    const retrieveData = async () => {
        setLoader(true);

        const token = await AsyncStorage.getItem("token")

        try {
            const endpoint = `${apiUrl}/api/cart/find`;
    
            const headers = {
                "Content-Type":"application/json",
                "token":"Bearer " + JSON.parse(token)
            };
            const res = await axios.get(endpoint, {headers});
            newData = JSON.stringify(res.data);
            const parsedData = JSON.parse(newData);
            const items = parsedData[0].items;
            await AsyncStorage.setProduct("cartCount", JSON.stringify(items.length));
            setData(items)
            setLoader(false);
        } catch (err) {
            setErr(err)
        }
        finally{
            setLoader(false);
        }
    }

    useEffect(() => {retrieveData();}, []);

    const refetch = () => {
        setLoader(true);
        retrieveData();
    }

    return {data, isLoading, err, refetch}
};

export default retrieveCart;