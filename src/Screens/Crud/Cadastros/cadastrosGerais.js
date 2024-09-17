import { ScrollView,View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export function CadastroGeral({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
                <EvilIcons name="user" size={60} color="black" />
            </View>
            <View style={styles.body}>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroAdministrador')}>
                <Text style={styles.txtbox}>Cadastro Admin</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroExercicio')}>
                <Text style={styles.txtbox}>Cadastro Exercícios</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroModalidade')}>
                <Text style={styles.txtbox}>Cadastro Modalidades</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroPersonal')}>
                <Text style={styles.txtbox}>Cadastro Personais</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroTreino')}>
                <Text style={styles.txtbox}>Cadastro Treinos</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroUsuario')}>
                <Text style={styles.txtbox}>Cadastro Usuários</Text>
             </TouchableHighlight>



            </View>
        </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFB031',
    },
    header: {
        width: '100%',
        backgroundColor: '#E49413',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtheader: {
        fontSize: 20,
    },
    body:{
        marginTop: 30,
        alignItems: 'center',
    },
    boxtbns: {
        backgroundColor: '#E49413',
        width: '70%',
        height: '10%',
        padding: 10,
        margin: 25,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    txtbox: {
        fontSize: 20,
    },

})