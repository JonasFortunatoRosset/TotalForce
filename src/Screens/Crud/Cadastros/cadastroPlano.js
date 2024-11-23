import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import { apiRoute } from '../../../../apiRoute';

export function CadastroPlanos({navigation}) {
    const [plano, setPlano] = useState({
        nome: "",
    });

    const inserirPlano = async () => {
        axios.post(`http://${apiRoute}:3000/planos`, {
            nome: plano.nome,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            Alert.alert("Sucesso", "O Plano foi cadastrado");
            setPlano({
                nome: "",
            });
        }).catch(error => {
            Alert.alert("Erro", "Não foi possível cadastrar o plano");
            console.error(error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.seta}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Cadastro de Plano</Text>
            </View>
            
            <View style={styles.body}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Nome"
                    value={plano.nome}
                    onChangeText={(text) => setPlano({ ...plano, nome: text })}
                />

                <TouchableOpacity style={styles.btn} onPress={inserirPlano}>
                    <Text style={styles.txtbtn}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 4,
        marginTop: 30,
    },
    seta: {
        marginRight: 15,
    },
    txtheader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    body: {
        margin: 20,
        padding: 15,
        backgroundColor: '#FF914C',
        borderRadius: 12,
        elevation: 2,
        alignItems: 'center',
    },
    inputs: {
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    btn: {
        width: '100%',
        height: 45,
        backgroundColor: '#EA5D04',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    txtbtn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
