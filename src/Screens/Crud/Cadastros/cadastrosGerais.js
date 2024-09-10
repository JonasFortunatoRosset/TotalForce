import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function CadastroGeral({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Tela de Cadastro</Text>

            <TouchableOpacity onPress={() => navigation.navigate('cadastroAdministrador')}>
                <Text>Cadastro de Alimentos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('cadastroExercicio')}>
                <Text>Cadastro de Animais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('cadastroModalidade')}>
                <Text>Cadastro de Fornecedores</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('cadastroPersonal')}>
                <Text>Cadastro de Funcionários</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('cadastroUsuario')}>
                <Text>Cadastro de Usuários</Text>
            </TouchableOpacity>
        </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFB031',
    }
})