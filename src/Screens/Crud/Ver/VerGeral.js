import { ScrollView,View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export function VerGeral({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
                <EvilIcons name="user" size={60} color="black" />
            </View>
            <View style={styles.body}>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('VerAdministrador')}>
                <Text style={styles.txtbox}>Ver Admin</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('VerExercicio')}>
                <Text style={styles.txtbox}>Ver Exercícios</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('VerModalidade')}>
                <Text style={styles.txtbox}>Ver Modalidades</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('VerPersonal')}>
                <Text style={styles.txtbox}>Ver Personais</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('VerTreino')}>
                <Text style={styles.txtbox}>Ver Treinos</Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('VerUsuario')}>
                <Text style={styles.txtbox}>Ver Usuários</Text>
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