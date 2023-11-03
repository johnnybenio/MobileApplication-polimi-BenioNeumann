import { Text, View, Image, Platform, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'


const Me = ({ navigation }) => {

  const [user, setUser] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      checkLocalStorageAsync();
    }, [])
  );

  const checkLocalStorageAsync = async () => {
    try {
      let userId = `user${JSON.parse(await AsyncStorage.getItem('id'))}`
      let userExists = await AsyncStorage.getItem(userId)

      if (userExists) {
        setUser(JSON.parse(userExists))
        setUserLoggedIn(true)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const useAlert = () => {
    const showAlert = (title, message, buttons) => {
      Alert.alert(title, message, buttons);
    };

    return showAlert;
  };

  let showAlert = useAlert()

  const logoutAsync = async () => {
    if (Platform.OS !== 'web') {
      showAlert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Logout", onPress: async () => {
              if (userLoggedIn) {
                if (user !== null) {
                  await AsyncStorage.removeItem(`user${user._id}`);
                  await AsyncStorage.removeItem('id');
                }
                setUserLoggedIn(false);
                setUser(null);
              }
            },
          },
          {
            text: "Cancel", onPress: () => { }
          } // If cancel pressed do nothing 
        ]
      );
    }
    else {
      if (userLoggedIn) {
        if (user !== null) {
          await AsyncStorage.removeItem(`user${user._id}`);
          await AsyncStorage.removeItem('id');
        }
        setUserLoggedIn(false);
        setUser(null);
      }
    }

  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "200%" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          < View style={{ width: "100%" }}>
            <ImageBackground source={require("../assets/images/LoginBackground.jpg")}
              style={{
                ...(Platform.OS === 'web'
                  ? { width: "100%", height: "100%", aspectRatio: 1 }
                  : { width: "100%", height: "100%" })
              }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={require("../assets/images/Me.jpg")}
                  style={{
                    ...(Platform.OS === 'web'
                      ? {
                        width: 300, height: 300,
                        borderRadius: 999, resizeMode: "cover",
                        overflow: "hidden",
                        marginTop: "1%"
                      }
                      : {
                        width: 155,
                        height: 155,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginTop: "5%"
                      })

                  }} />
                <Text style={{ fontWeight: "bold", color: "white", marginVertical: 5, marginTop: 15 }}>
                  {userLoggedIn ? `Hello, ${user.username}` : "Please, log in"}
                </Text>
                {userLoggedIn ?
                  (
                    <View >
                      <Text style={{
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#007BFF',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontSize: 16,
                        textAlign: 'center',
                        borderRadius: 8,
                        marginTop: 10
                      }}>
                        {user.email}
                      </Text>
                    </View>
                  )
                  :
                  (
                    <View>
                      <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                        <View>
                          <Text style={{
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: '#007BFF',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            fontSize: 20,
                            textAlign: 'center',
                            borderRadius: 8,
                            marginTop: 10
                          }}>
                            Login
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { navigation.navigate('Register') }} >
                        <Text style={{
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#007BFF',
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          fontSize: 20,
                          textAlign: 'center',
                          borderRadius: 8,
                          marginTop: 10,
                        }}> Register</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                {userLoggedIn ?
                  (
                    <View style={{
                      marginTop: 20,
                      ...(Platform.OS === 'web'
                        ? { width: "25%" }
                        : { width: "90%" }),
                      borderRadius: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderWidth: 2,
                      borderColor: "#E0E0E0",
                    }}>
                      <TouchableOpacity onPress={() => { navigation.navigate('Order') }}>
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderColor: "#CCCCCC",
                          borderBottomWidth: 0.5,
                          paddingVertical: 10
                        }}>
                          <Ionicons name='file-tray-full' size={20} color={"white"} />
                          <Text style={{
                            fontSize: 16,
                            color: 'lightgray',
                            marginRight: "71%",
                            fontWeight: 'bold',
                            lineHeight: 10,
                            ...(Platform.OS === 'web'
                              ? { marginTop: -1 }
                              : { marginTop: 10 }),
                            padding: 5
                          }}>
                            Orders
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderColor: "#CCCCCC",
                          borderBottomWidth: 0.5,
                          paddingVertical: 10
                        }}>
                          <Ionicons name='cart' size={20} color={"white"} />
                          <Text style={{
                            fontSize: 16,
                            color: 'lightgray',
                            marginRight: "76.5%",
                            fontWeight: 'bold',
                            lineHeight: 10,
                            ...(Platform.OS === 'web'
                              ? { marginTop: -1 }
                              : { marginTop: 10 }),
                            padding: 5,
                          }}>
                            Cart
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { navigation.navigate('Favorite') }}>
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderColor: "#CCCCCC",
                          borderBottomWidth: 0.5,
                          paddingVertical: 10
                        }}>
                          <Ionicons name='heart' size={20} color={"white"} />
                          <Text style={{
                            fontSize: 16,
                            color: 'lightgray',
                            marginRight: "66%",
                            fontWeight: 'bold',
                            lineHeight: 10,
                            ...(Platform.OS === 'web'
                              ? { marginTop: -1 }
                              : { marginTop: 10 }),
                            padding: 5,

                          }}>
                            Favorites
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                  :
                  (
                    <View>
                    </View>
                  )}
                {userLoggedIn ?
                  (
                    <View style={{ top: 25 }}>
                      <TouchableOpacity onPress={() => { logoutAsync() }}>
                        <View style={{ flexDirection: "row" }}>
                          <Ionicons name="log-out" size={35} color={"white"} />
                          <Text style={{ marginTop: 6, color: "white", fontSize: 20 }}> Logout</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (<View></View>)}
              </View>
            </ImageBackground>
          </View>
        </View>
      </View >
    </SafeAreaView >
  )
}

export default Me