import { StyleSheet, Text, View, TextInput, Alert,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export  function Teste(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Administrador</Text>
            </View>

            <View style={styles.body}>
                        <View style={styles.itemContainer}>
                          <View style={styles.dados}>
                            <Text style={styles.itemText}>Código: </Text>
                            <Text style={styles.itemText}>Nome: </Text>
                            <Text style={styles.itemText}>Cpf: </Text>
                            <Text style={styles.itemText}>Login: </Text>
                            <Text style={styles.itemText}>Senha: </Text>
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
        color: '#000',
    },
    body: {
        backgroundColor: '#E49413',
        flex: 1,
        padding: 20,
    },
    icons: {
        justifyContent: 'space-around',
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
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#E49413',
        marginVertical: 10,
    },
});