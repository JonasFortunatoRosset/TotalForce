import { ScrollView, View, Text, StyleSheet, TouchableHighlight,Image } from 'react-native';
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

                <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroColaborador')}>
                    <Text style={styles.txtbox}>Cadastro Personais</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroTreino')}>
                    <Text style={styles.txtbox}>Cadastro Treinos</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={'#855200'} onPress={() => navigation.navigate('cadastroUsuario')}>
                    <Text style={styles.txtbox}>Cadastro Usuários</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.footer}>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E49413',
    },
    header: {
        width: '100%',
        backgroundColor: '#E49413',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        borderRadius: 12,
        marginTop: 30,
    },
    txtheader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    body: {
        alignItems: 'center',
        backgroundColor: '#FFB031',
        justifyContent: 'center',
    },
    boxtbns: {
        backgroundColor: '#E49413',
        width: '70%',
        height: 60, 
        padding: 10,
        margin: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    txtbox: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        height: '40%',
        backgroundColor: '#FFB031',
        padding: 20,
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      },
      imgFooter: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
      },
});
