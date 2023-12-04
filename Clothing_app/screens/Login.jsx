import { TouchableOpacity, Text, View, ImageBackground, Platform, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { apiUrl } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const loginUserAsync = async (values) => {
    try {
      setIsLoading(true);
      const url = `${apiUrl}/api/login`

      const response = await axios.post(url, values)
      if (response.status === 200) {

        await AsyncStorage.setItem(`user${response.data._id}`, JSON.stringify(response.data));
        await AsyncStorage.setItem('id', JSON.stringify(response.data._id));
        await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
        setErrorMessage(null);
        setIsLoading(false)
        navigation.navigate('Me');
      }

    }
    catch (err) {
      setIsLoading(false)
      console.log(err)
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  return (
    <View style={{ ...(Platform.OS === 'web' ? {} : { top: 35 }) }}>
      <ImageBackground source={require("../assets/images/LoginBackground.jpg")}
        style={{
          ...(Platform.OS === 'web'
            ? { width: "100%", height: "100%", aspectRatio: 1 }
            : { width: "100%", height: "100%" })
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name='arrow-back-outline' size={30} style={{ top: 15 }} color={"white"} />
        </TouchableOpacity>
        <View style={{ marginLeft: "39%" }}>
          <Text style={{
            fontSize: 50,
            ...(Platform.OS === 'web'
              ? { marginLeft: "9%" }
              : { marginLeft: "-5%" }),
            color: "white",
            fontWeight: "bold",
            alignItems: "center"
          }}>Login</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount={true}
            onSubmit={(values) => { loginUserAsync(values) }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(5, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
              email: Yup.string().email('Invalid email').required('Required'),
            })}
          >

            {({ handleChange, handleSubmit,
              values, isValid }) => (
              <View>
                <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
                  <Text style=
                    {{
                      fontWeight: "bold",
                      ...(Platform.OS === 'web'
                        ? { fontSize: 20 }
                        : { fontSize: 20 }),
                      marginBottom: 5,
                      textAlign: "center",
                      marginTop: "5%",
                      color: "white",
                      marginRight: "70%"
                    }}>
                    Email
                  </Text>

                  <View style={{
                    borderColor: "#CBC3E3",
                    backgroundColor: "white",
                    borderWidth: 2,
                    height: 35,
                    borderRadius: 6,
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    alignItems: "center",
                    ...(Platform.OS === 'web' ? { width: "30%" } : { width: "100%", marginLeft: "-35%" })

                  }}>
                    <Ionicons name='mail' size={20} style={{ right: 10 }} color={"purple"} />
                    <TextInput
                      placeholder='Enter your email'
                      autoCorrect={false}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize='none'
                      style={{
                        flex: 1,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderBottomWidth: 0,
                        ...(Platform.OS === 'web'
                          ? { outline: 'none' }
                          : {}),
                      }}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>

                <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
                  <Text style=
                    {{
                      fontWeight: "bold",
                      ...(Platform.OS === 'web'
                        ? { fontSize: 20, marginRight: "70%" }
                        : { fontSize: 20, width: "100%", marginLeft: "-35%" }),
                      marginBottom: 5,
                      textAlign: "center",
                      marginTop: "0%",
                      color: "white",
                    }}>
                    Password
                  </Text>

                  <View style={{
                    borderColor: "#CBC3E3",
                    backgroundColor: "white",
                    borderWidth: 2,
                    height: 35,
                    borderRadius: 6,
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    alignItems: "center",
                    ...(Platform.OS === 'web' ? { width: "30%" } : { width: "100%", marginLeft: "-35%" })
                  }}>
                    <Ionicons name='key' size={20} style={{ right: 10 }} color={"purple"} />
                    <TextInput
                      placeholder='Enter your password'
                      autoCorrect={false}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onSubmitEditing={isValid ? handleSubmit : () => { }}
                      autoCapitalize='none'
                      style={{
                        flex: 1,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderBottomWidth: 0,
                        ...(Platform.OS === 'web'
                          ? { outline: 'none' }
                          : {}),

                      }}
                      underlineColorAndroid='transparent'
                      secureTextEntry
                    />
                  </View>

                </View>
                <View>
                  {errorMessage && <Text style={{
                    color: 'red',
                    ...(Platform.OS === 'web' ? { marginLeft: "4.5%" } : { marginLeft: "-25%" })
                  }}>{errorMessage}</Text>}
                </View>
                <TouchableOpacity style={{
                  ...(Platform.OS === 'web' ?
                    { width: "15%", marginLeft: "9%" } :
                    { width: "50%", marginLeft: "-4%" }),
                }} onPress={(isValid ? handleSubmit : () => { })} disabled={!isValid}>
                  {isLoading
                    ?
                    (<ActivityIndicator size='large' />)
                    : (<Text style={{
                      fontWeight: 'bold',
                      color: 'white',
                      ...(isValid ? { backgroundColor: '#007BFF' } : { backgroundColor: 'gray' }),

                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      fontSize: 16,
                      textAlign: 'center',
                      borderRadius: 8,
                      marginTop: 10,

                    }}> Login</Text>)
                  }
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground >
    </View>
  )
}

export default Login