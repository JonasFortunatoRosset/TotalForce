import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function VerAdministrador() {
    const [administrador, setAdministrador] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/administradores')
            .then(response => {
                setAdministrador(response.data.administrador);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Administrador</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={administrador}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <View style={styles.dados}>
                            <Text style={styles.itemText}>Código: {item.codigo}</Text>
                            <Text style={styles.itemText}>Nome: {item.nome}</Text>
                            <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                            <Text style={styles.itemText}>Login: {item.login}</Text>
                            <Text style={styles.itemText}>Senha: {item.senha}</Text>
                          </View>

                            <View style={styles.icons}> 
                            <TouchableOpacity onPress={''}>
                                    <Feather name="trash-2" size={40} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={''}>
                                    <FontAwesome name="pencil" size={40} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB031',
    },
    header: {
        backgroundColor: '#E49413',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtheader: {
        fontSize: 20,
        color: '#fff',
    },
    body: {
        backgroundColor: '#E49413',
        flex: 1,
        padding: 20,
    },
    icons: {
        justifyContent: 'space-between'
    },
    dados: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 5,
        height: '100%',
    
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFB031',
        borderRadius: 8,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#E49413',
        marginVertical: 10,
    },
});