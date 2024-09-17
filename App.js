import { StyleSheet }             from 'react-native';
import { createStackNavigator }   from '@react-navigation/stack';
import { NavigationContainer }    from '@react-navigation/native';
  
// Importação das páginas
import { LoginPage }   from './src/Screens/LoginPage';
import { HomePage }    from './src/Screens/HomePage';
import { HomeAdmPage } from './src/Screens/HomeAdmPage';
import { TrainPage }   from './src/Screens/TrainPage';
import { ConfigPage }  from './src/Screens/ConfigPage';
import { PaymentPage } from './src/Screens/PaymentPage';
import {NutricaoPage}  from './src/Screens/NutricaoPage';

// importação de telas de cadastro
import {CadastroGeral} from './src/Screens/Crud/Cadastros/cadastrosGerais';
import {cadastroAdministrador} from './src/Screens/Crud/Cadastros/cadastroAdministrador'
import {cadastroExercicio}     from './src/Screens/Crud/Cadastros/cadastroExercicio'
import {cadastroModalidade}    from './src/Screens/Crud/Cadastros/cadastroModalidade'
import {cadastroPersonal}      from './src/Screens/Crud/Cadastros/cadastroPersonal'
import {cadastroTreino}        from './src/Screens/Crud/Cadastros/cadastroTreino'
import {cadastroUsuario}       from './src/Screens/Crud/Cadastros/cadastroUsuario'

// importação de telas de alteração
import { alterarGeral } from './src/Screens/Crud/Alterar/AlterarGeral';
import { alteracaoAdministrador } from './src/Screens/Crud/Alterar/AlterarAdministrador';
import { alteracaoExercicio } from './src/Screens/Crud/Alterar/AlterarExercicio';
import { alteracaoModalidade } from './src/Screens/Crud/Alterar/AlterarModalidade';
import { alteracaoPersonal } from './src/Screens/Crud/Alterar/AlterarPersonal';
import { alteracaoTreino} from './src/Screens/Crud/Alterar/AlterarTreino';
import { alteracaoUsuario } from './src/Screens/Crud/Alterar/AlterarUsuario';

// importação de telas de ver
import { VerGeral } from './src/Screens/Crud/Ver/VerGeral';
import {verAdministrador} from './src/Screens/Crud/Ver/VerAdministrador';
import {verExercicio} from './src/Screens/Crud/Ver/VerExercicio';
import {verModalidade} from './src/Screens/Crud/Ver/VerModalidade';
import {verPersonal} from './src/Screens/Crud/Ver/VerPersonal';
import {verTreino} from './src/Screens/Crud/Ver/VerTreino';
import {verUsuario} from './src/Screens/Crud/Ver/VerUsuario';

// importação de telas de Excluir
import { ExcluirGeral } from './src/Screens/Crud/Excluir/ExcluirGeral';
import { excluirAdministrador } from './src/Screens/Crud/Excluir/ExcluirAdministrador';
import {excluirExercicio} from './src/Screens/Crud/Excluir/ExcluirExercicio';
import {excluirModalidade} from'./src/Screens/Crud/Excluir/ExcluirModalidade';
import { excluirPersonal } from './src/Screens/Crud/Excluir/excluirPersonal';
import {excluirTreino} from './src/Screens/Crud/Excluir/ExcluirTreino';
import {excluirUsuario} from './src/Screens/Crud/Excluir/ExcluirUsuario';





export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage'>
        <Stack.Screen name="LoginPage"     component={LoginPage}></Stack.Screen>
        <Stack.Screen name="LoginAdmPage"  component={HomeAdmPage}></Stack.Screen>
        <Stack.Screen name="HomePage"      component={HomePage}></Stack.Screen>
        <Stack.Screen name="TrainPage"     component={TrainPage}></Stack.Screen>
        <Stack.Screen name="ConfigPage"    component={ConfigPage}></Stack.Screen>
        <Stack.Screen name="PaymentPage"   component={PaymentPage}></Stack.Screen>
        <Stack.Screen name="NutricaoPage"  component={NutricaoPage}></Stack.Screen>
        <Stack.Screen name="CadastroGeral" component={CadastroGeral}></Stack.Screen>
        <Stack.Screen name="AlterarGeral"  component={alterarGeral}></Stack.Screen>
        <Stack.Screen name="VerGeral"      component={VerGeral}></Stack.Screen>
        <Stack.Screen name="ExcluirGeral"  component={ExcluirGeral}></Stack.Screen>
        

        <Stack.Screen name="cadastroAdministrador" component={cadastroAdministrador}></Stack.Screen>
        <Stack.Screen name="cadastroExercicio"     component={cadastroExercicio}></Stack.Screen>
        <Stack.Screen name="cadastroModalidade"    component={cadastroModalidade}></Stack.Screen>
        <Stack.Screen name="cadastroPersonal"      component={cadastroPersonal}></Stack.Screen>
        <Stack.Screen name="cadastroTreino"        component={cadastroTreino}></Stack.Screen>
        <Stack.Screen name="cadastroUsuario"       component={cadastroUsuario}></Stack.Screen>

        <Stack.Screen name="AlteracaoAdministrador"  component={alteracaoAdministrador}></Stack.Screen>
        <Stack.Screen name="AlteracaoExercicio"      component={alteracaoExercicio}></Stack.Screen>
        <Stack.Screen name="AlteracaoModalidade"     component={alteracaoModalidade}></Stack.Screen>
        <Stack.Screen name="AlteracaoPersonal"       component={alteracaoPersonal}></Stack.Screen>
        <Stack.Screen name="AlteracaoTreino"         component={alteracaoTreino}></Stack.Screen>
        <Stack.Screen name="AlteracaoUsuario"        component={alteracaoUsuario}></Stack.Screen>

        <Stack.Screen name="ExclusãoAdministrador"  component={excluirAdministrador}></Stack.Screen>
        <Stack.Screen name="ExclusãoExercicio"      component={excluirExercicio}></Stack.Screen>
        <Stack.Screen name="ExclusãoModalidade"     component={excluirModalidade}></Stack.Screen>
        <Stack.Screen name="ExclusãoPersonal"       component={excluirPersonal}></Stack.Screen>
        <Stack.Screen name="ExclusãoTreino"         component={excluirTreino}></Stack.Screen>
        <Stack.Screen name="ExclusãoUsuario"        component={excluirUsuario}></Stack.Screen>

        <Stack.Screen name="VerAdministrador"  component={verAdministrador}></Stack.Screen>
        <Stack.Screen name="VerExercicio"      component={verExercicio}></Stack.Screen>
        <Stack.Screen name="VerModalidade"     component={verModalidade}></Stack.Screen>
        <Stack.Screen name="VerPersonal"       component={verPersonal}></Stack.Screen>
        <Stack.Screen name="VerTreino"         component={verTreino}></Stack.Screen>
        <Stack.Screen name="VerUsuario"        component={verUsuario}></Stack.Screen>


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
