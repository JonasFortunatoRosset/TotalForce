import { StyleSheet }             from 'react-native';
import { createStackNavigator }   from '@react-navigation/stack';
import { NavigationContainer }    from '@react-navigation/native';
  
// Importação das páginas 
import { LoginPage }           from './src/Screens/LoginPage';
import { HomePage }            from './src/Screens/HomePage';
import { HomeColaboradorPage } from './src/Screens/HomeColaboradorPage';
import { HomeAdmPage }         from './src/Screens/HomeAdmPage';
import { TrainPage }           from './src/Screens/TrainPage';
import { ListaTreinos }        from './src/Screens/ListaTreinos';
import { PlanilhaExercicios }  from './src/Screens/PlanilhaTreino'
import { ResultsPage }         from './src/Screens/ResultsPage';
import { GoalsPage }           from './src/Screens/GoalsPage';
import { NutricaoPage }        from './src/Screens/NutricaoPage';

// importação de telas de cadastro
import { CadastroGeral }            from './src/Screens/Crud/Cadastros/cadastrosGerais';
import { CadastroAdministrador }    from './src/Screens/Crud/Cadastros/cadastroAdministrador'
import { CadastroExercicio }        from './src/Screens/Crud/Cadastros/cadastroExercicio'
import { CadastroColaborador }      from './src/Screens/Crud/Cadastros/cadastroColaborador'
import { CadastroTreino }           from './src/Screens/Crud/Cadastros/cadastroTreino'
import { CadastroUsuario }          from './src/Screens/Crud/Cadastros/cadastroUsuario'
import { CadastroPlanos }           from './src/Screens/Crud/Cadastros/cadastroPlano';
import { CadastroRegistroTreino }   from './src/Screens/Crud/Cadastros/cadastroRegistroTreino';
import { CadastroLogin }            from './src/Screens/Crud/Cadastros/cadastroLogin';

// importação de telas de Pesquisa
import { VerGeral }         from './src/Screens/Crud/Ver/VerGeral';
import { VerAdministrador } from './src/Screens/Crud/Ver/VerAdministrador';
import { VerExercicio }     from './src/Screens/Crud/Ver/VerExercicio';
import { VerColaborador }   from './src/Screens/Crud/Ver/VerColaborador';
import { VerTreino }        from './src/Screens/Crud/Ver/VerTreino';
import { VerUsuario }       from './src/Screens/Crud/Ver/VerUsuario';
import { VerPlanos }        from './src/Screens/Crud/Ver/VerPlanos';



import { Teste } from './src/Screens/tst';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeColaboradorPage' screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage"             component={LoginPage}></Stack.Screen>
        <Stack.Screen name="HomeAdmPage"           component={HomeAdmPage}></Stack.Screen>
        <Stack.Screen name="HomeColaboradorPage"   component={HomeColaboradorPage}></Stack.Screen>
        <Stack.Screen name="HomePage"              component={HomePage}></Stack.Screen>
        <Stack.Screen name="TrainPage"             component={TrainPage}></Stack.Screen>
        <Stack.Screen name="ListaTreinos"          component={ListaTreinos}></Stack.Screen>
        <Stack.Screen name="PlanilhaTreino"        component={PlanilhaExercicios}></Stack.Screen>
        <Stack.Screen name="ResultsPage"           component={ResultsPage}></Stack.Screen>
        <Stack.Screen name="GoalsPage"             component={GoalsPage}></Stack.Screen>
        <Stack.Screen name="NutricaoPage"          component={NutricaoPage}></Stack.Screen>
        <Stack.Screen name="CadastroGeral"         component={CadastroGeral}></Stack.Screen>
        

        <Stack.Screen name="Teste"                 component={Teste}></Stack.Screen>
        
        <Stack.Screen name="cadastroAdministrador" component={CadastroAdministrador}></Stack.Screen>
        <Stack.Screen name="cadastroExercicio"     component={CadastroExercicio}></Stack.Screen>
        <Stack.Screen name="cadastroColaborador"   component={CadastroColaborador}></Stack.Screen>
        <Stack.Screen name="cadastroTreino"        component={CadastroTreino}></Stack.Screen>
        <Stack.Screen name="cadastroUsuario"       component={CadastroUsuario}></Stack.Screen>
        <Stack.Screen name="cadastroPlanos"         component={CadastroPlanos}></Stack.Screen>
        <Stack.Screen name="cadastroRegistros"     component={CadastroRegistroTreino}></Stack.Screen>
        <Stack.Screen name="cadastroLogin"         component={CadastroLogin}></Stack.Screen>

        <Stack.Screen name="VerAdministrador"      component={VerAdministrador}></Stack.Screen>
        <Stack.Screen name="VerExercicio"          component={VerExercicio}></Stack.Screen>
        <Stack.Screen name="VerColaborador"        component={VerColaborador}></Stack.Screen>
        <Stack.Screen name="VerTreino"             component={VerTreino}></Stack.Screen>
        <Stack.Screen name="VerUsuario"            component={VerUsuario} ></Stack.Screen>
        <Stack.Screen name="VerGeral"              component={VerGeral}></Stack.Screen>
        <Stack.Screen name="VerPlanos"             component={VerPlanos}></Stack.Screen>


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