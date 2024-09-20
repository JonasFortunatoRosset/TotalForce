import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

export function VerPersonal() {
    const [colaborador, setColaborador] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/colaboradores')
            .then(response => {
                setColaborador(response.data.colaborador);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (codigo) => {
        axios.delete('http://localhost:3000/colaboradores', { params: { codigo } })
            .then(response => {
                setColaborador(colaborador.filter(colaborador => colaborador.codigo !== codigo));
            })
            .catch(error => {
                console.error('Erro ao deletar colaborador:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Colaborador</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={colaborador}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.dados}>
                         <Text style={styles.itemText}>Código: {item.codigo}</Text>
                         <Text style={styles.itemText}>Nome: {item.nome}</Text>
                         <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                         <Text style={styles.itemText}>Login: {item.endereco}</Text>
                         <Text style={styles.itemText}>Senha: {item.cidade}</Text>
                         <Text style={styles.itemText}>Senha: {item.senha}</Text>
                        </View>

                        <View style={styles.icons}> 
                             <TouchableOpacity onPress={() => handleDelete(item.codigo)}> 
                                 <Feather name="trash-2" size={40} color="black" />
                             </TouchableOpacity>

                             <TouchableOpacity>
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