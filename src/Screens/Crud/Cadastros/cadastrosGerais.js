import { ScrollView, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Ionicons } from '@expo/vector-icons';

export function CadastroGeral({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()} style={styles.backButton} underlayColor={null}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableHighlight>
                <Text style={styles.txtheader}>CADASTROS</Text>
            </View>
            <View style={styles.body}>
                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('cadastroAdministrador')}>
                    <Text style={styles.txtbox}>Cadastro Admin</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('cadastroColaborador')}>
                    <Text style={styles.txtbox}>Cadastro Colaborador</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('cadastroExercicio')}>
                    <Text style={styles.txtbox}>Cadastro Exercícios</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('cadastroPlanos')}>
                    <Text style={styles.txtbox}>Cadastro Planos</Text>
                </TouchableHighlight>    

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('cadastroTreino')}>
                    <Text style={styles.txtbox}>Cadastro Treinos</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('cadastroUsuario')}>
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
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        borderRadius: 12,
        marginTop: 5,
    },
    backButton: {
        paddingRight: 0,
    },
    txtheader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    body: {
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    boxtbns: {
        backgroundColor: '#FF9756',
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
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
});
