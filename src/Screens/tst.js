import { StyleSheet, Text, View, TextInput, Alert,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export  function Teste(){
    return (
        <View style={styles.ModalConteiner}>
                  <View style={styles.ModalHeader}>
                    <Text style={styles.ModalTitle}>  Editar Usuário  </Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Nome"
                    />

                   <TextInput
                      style={styles.input}
                      placeholder="Cpf"
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Endereço"
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Cidade"
                    />

                   <TextInput
                      style={styles.input}
                      placeholder="Senha"
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Peso"

                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Altura"
                    
                    />

                    <TouchableOpacity 
                    style={[styles.btns , styles.btnSave]}>  
                      <Text style={styles.txtbtns}> Salvar </Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btns, styles.btnCancel]}>
                            <Text style={styles.txtbtns}>Cancelar</Text>
                    </TouchableOpacity>


                  </View>
                </View>

    );
}

const styles = StyleSheet.create({
    ModalConteiner: {
        flex: 1,
        backgroundColor: '#FFB031',
    },
    ModalHeader: {
        backgroundColor: '#E49413',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    ModalTitle:{
        fontSize: 20,
        color: '#fff',
    },
    input:{

    },
    btns: {

    },
    txtbtns: {

    },
    btnSave: {

    },
    btnCancel: {

    },
});