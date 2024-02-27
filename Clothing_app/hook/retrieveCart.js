import { useEffect, useState } from "react";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { apiUrl } from '../config';
import axios from "axios";

const retrieveCart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [err, setErr] = useState(null);

  const retrieveData = async () => {
    setLoader(true);
    const token = await AsyncStorage.getItem('token');

    try {
      const endpoint = `${apiUrl}/api/cart/find`;

      const res = await axios.get(endpoint, {
        headers: {
          'Content-Type': "application/json",
          'token': 'Bearer ' + JSON.parse(token),
          'ngrok-skip-browser-warning': 'true'
        }
    });
      
      
      const items = res.data[0].items;
      

      setData(items);
      setLoader(false);
    } catch (err) {
      setErr(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const refetch = async () => {
    setLoader(true);
    retrieveData();
  };


  return {data, isLoading, err, refetch };
};

export default retrieveCart;
