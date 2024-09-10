import { StyleSheet } from 'react-native';
import { createStackNavigator }   from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
  
// Importação das páginas
import { LoginPage }   from './src/Screens/LoginPage';
import { HomePage }    from './src/Screens/HomePage';
import { TrainPage }   from './src/Screens/TrainPage';
import { ConfigPage }  from './src/Screens/ConfigPage';
import { PaymentPage } from './src/Screens/PaymentPage';
import {NutricaoPage} from './src/Screens/NutricaoPage';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage'>
        <Stack.Screen name="LoginPage"   component={LoginPage}></Stack.Screen>
        <Stack.Screen name="HomePage"    component={HomePage}></Stack.Screen>
        <Stack.Screen name="TrainPage"   component={TrainPage}></Stack.Screen>
        <Stack.Screen name="ConfigPage"  component={ConfigPage}></Stack.Screen>
        <Stack.Screen name="PaymentPage" component={PaymentPage}></Stack.Screen>
        <Stack.Screen name="NutricaoPage" component={NutricaoPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
