import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function cadastroModalidade(){
    const [modalidade, setModalidade] = useState({
        codigo: "",
        nome: "",
        descricao: ""
    })

    function inserirModalidade(){
        axios.post("http//localhost:3000/modalidades", {
            codigo: modalidade.codigo,
            nome: modalidade.nome,
            descricao: modalidade.descricao
        }).then(response => {
            alert.Alert("Sucesso", "Modalidade cadastrada")
            setModalidade({
                codigo: "",
                nome: "",
                descricao: ""
            }).catch(error => {
                alert.Alert("Erro", "não foi possível realizar o cadastro")
                console.error(error)
            })
        })
    }
    return(
        <View>
            <Text>Cadastro de modalidade</Text>
            <TextInput 
            placeholder='Código'
            value={modalidade.codigo}
            onChangeText={(text) => setPersonal({...modalidade, codigo: text})}/>

            <TextInput 
            placeholder='Nome'
            value={modalidade.nome}
            onChangeText={(text) => setPersonal({...modalidade, nome: text})}/>

            <TextInput 
            placeholder='Descricao'
            value={modalidade.descricao}
            onChangeText={(text) => setPersonal({...modalidade, descricao: text})}/>
        </View>
    )
}