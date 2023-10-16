import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationBar from './navigation/BottomNavigationBar'

const Stack = createNativeStackNavigator() // Used to manage our navigation in the app

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation Bar"
          component={BottomNavigationBar}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer >
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
*/