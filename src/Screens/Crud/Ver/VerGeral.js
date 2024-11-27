import { ScrollView, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Ionicons } from '@expo/vector-icons';

export function VerGeral({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()} style={styles.backButton} underlayColor={null}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableHighlight>
                <Text style={styles.txtheader}>VISUALIZAR CADASTROS</Text>
            </View>
            <View style={styles.color}>
            <View style={styles.body}>
                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('VerAdministrador')}>
                    <Text style={styles.txtbox}>Ver Admin</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('VerColaborador')}>
                    <Text style={styles.txtbox}>Ver Colaborador</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('VerExercicio')}>
                    <Text style={styles.txtbox}>Ver Exercícios</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('VerPlanos')}>
                    <Text style={styles.txtbox}>Ver Planos</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('VerTreino')}>
                    <Text style={styles.txtbox}>Ver Treinos</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boxtbns} underlayColor={null} onPress={() => navigation.navigate('VerUsuario')}>
                    <Text style={styles.txtbox}>Ver Usuários</Text>
                </TouchableHighlight>
            </View>
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
        marginTop: 35,
    },
    backButton: {
        paddingRight: -10,
    },
    txtheader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    color:{
        backgroundColor:'#fff'
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
        height: '50%',
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});
