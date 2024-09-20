import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

export function VerExercicio() {
    const [exercicio, setExercicio] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/exercicios')
            .then(response => {
                setExercicio(response.data.Exercicio);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (codigo) => {
        axios.delete('http://localhost:3000/exercicios', { params: { codigo } })
            .then(response => {
                setExercicio(exercicio.filter(exercicio => exercicio.codigo !== codigo));
            })
            .catch(error => {
                console.error('Erro ao deletar exercicio:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Exercício</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={exercicio}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.dados}>
                         <Text style={styles.itemText}>Código: {item.codigo}</Text>
                         <Text style={styles.itemText}>Nome: {item.nome}</Text>
                         <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
                         <Text style={styles.itemText}>Código do treino: {item.codtreino}</Text>
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