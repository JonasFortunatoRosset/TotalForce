import { StyleSheet }             from 'react-native';
import { createStackNavigator }   from '@react-navigation/stack';
import { NavigationContainer }    from '@react-navigation/native';
  
// Importação das páginas
import { LoginPage }   from './src/Screens/LoginPage';
import { HomePage }    from './src/Screens/HomePage';
import { HomeAdmPage } from './src/Screens/HomeAdmPage';
import { TrainPage }   from './src/Screens/TrainPage';
import { ConfigPage }  from './src/Screens/ConfigPage';
import { GoalsPage } from './src/Screens/GoalsPage';
import {NutricaoPage}  from './src/Screens/NutricaoPage';

// importação de telas de cadastro
import {CadastroGeral}         from './src/Screens/Crud/Cadastros/cadastrosGerais';
import {CadastroAdministrador} from './src/Screens/Crud/Cadastros/cadastroAdministrador'
import {CadastroExercicio}     from './src/Screens/Crud/Cadastros/cadastroExercicio'
import {CadastroModalidade}    from './src/Screens/Crud/Cadastros/cadastroModalidade'
import {CadastroPersonal}      from './src/Screens/Crud/Cadastros/cadastroPersonal'
import {CadastroTreino}        from './src/Screens/Crud/Cadastros/cadastroTreino'
import {CadastroUsuario}       from './src/Screens/Crud/Cadastros/cadastroUsuario'

// importação de telas de Pesquisa
import { VerGeral }       from './src/Screens/Crud/Ver/VerGeral';
import {VerAdministrador} from './src/Screens/Crud/Ver/VerAdministrador';
import {VerExercicio}     from './src/Screens/Crud/Ver/VerExercicio';
import {VerModalidade}    from './src/Screens/Crud/Ver/VerModalidade';
import {VerPersonal}      from './src/Screens/Crud/Ver/VerPersonal';
import {VerTreino}        from './src/Screens/Crud/Ver/VerTreino';
import {VerUsuario}       from './src/Screens/Crud/Ver/VerUsuario';

import { Teste } from './src/Screens/tst';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='GoalsPage'>
        <Stack.Screen name="LoginPage"     component={LoginPage}></Stack.Screen>
        <Stack.Screen name="HomeAdmPage"   component={HomeAdmPage}></Stack.Screen>
        <Stack.Screen name="HomePage"      component={HomePage}></Stack.Screen>
        <Stack.Screen name="TrainPage"     component={TrainPage}></Stack.Screen>
        <Stack.Screen name="ConfigPage"    component={ConfigPage}></Stack.Screen>
        <Stack.Screen name="GoalsPage"     component={GoalsPage}></Stack.Screen>
        <Stack.Screen name="NutricaoPage"  component={NutricaoPage}></Stack.Screen>
        <Stack.Screen name="CadastroGeral" component={CadastroGeral}></Stack.Screen>
        <Stack.Screen name="VerGeral"      component={VerGeral}></Stack.Screen>

        <Stack.Screen name="Teste"  component={Teste}></Stack.Screen>
        

        <Stack.Screen name="cadastroAdministrador" component={CadastroAdministrador}></Stack.Screen>
        <Stack.Screen name="cadastroExercicio"     component={CadastroExercicio}></Stack.Screen>
        <Stack.Screen name="cadastroModalidade"    component={CadastroModalidade}></Stack.Screen>
        <Stack.Screen name="cadastroPersonal"      component={CadastroPersonal}></Stack.Screen>
        <Stack.Screen name="cadastroTreino"        component={CadastroTreino}></Stack.Screen>
        <Stack.Screen name="cadastroUsuario"       component={CadastroUsuario}></Stack.Screen>




        <Stack.Screen name="VerAdministrador"  component={VerAdministrador}></Stack.Screen>
        <Stack.Screen name="VerExercicio"      component={VerExercicio}></Stack.Screen>
        <Stack.Screen name="VerModalidade"     component={VerModalidade}></Stack.Screen>
        <Stack.Screen name="VerPersonal"       component={VerPersonal}></Stack.Screen>
        <Stack.Screen name="VerTreino"         component={VerTreino}></Stack.Screen>
        <Stack.Screen name="VerUsuario"        component={VerUsuario}></Stack.Screen>


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
