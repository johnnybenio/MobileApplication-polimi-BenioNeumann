import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { apiUrl } from '../config';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get(`${apiUrl}/api/products`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            setData(response.data)
            setIsLoading(false)
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }
    return { data, isLoading, err, refetch }
}

export default useFetch

const styles = StyleSheet.create({})