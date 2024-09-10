import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function cadastroPersonal(){
    const [personal, setPersonal] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codusuario: "",
        propriedade: "",
        codmodalidade: ""
    })

    function inserirPersonal(){
        axios.post("http//localhost:3000/personal", {
            codigo: personal.codigo,
            nome: personal.nome,
            descricao: personal.descricao,
            codusuario: personal.codusuario,
            propriedade: personal.propriedade,
            codmodalidade: personal.codmodalidade
        }).then(response => {
            alert.Alert("Sucesso", "Personal cadastrado com exito")
            setPersonal({
                codigo: "",
                nome: "",
                descricao: "",
                codusuario: "",
                propriedade: "",
                codmodalidade: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "Personal não cadastrado")
            console.error(error)
        })
    }

    return(
        <View>
            <Text>Cadastro de personal</Text>
            <TextInput 
            placeholder='Código'
            value={personal.codigo}
            onChangeText={(text) => setPersonal({...personal, codigo: text})}/>
        
            <TextInput 
            placeholder='Nome'
            value={personal.nome}
            onChangeText={(text) => setPersonal({...personal, nome: text})}/>

            <TextInput 
            placeholder='Descrição'
            value={personal.descricao}
            onChangeText={(text) => setPersonal({...personal, descricao: text})}/>

            <TextInput 
            placeholder='Código do usuário'
            value={personal.codusuario}
            onChangeText={(text) => setPersonal({...personal, codusuario: text})}/>

            <TextInput 
            placeholder='Propriedade'
            value={personal.propriedade}
            onChangeText={(text) => setPersonal({...personal, propriedade: text})}/>

            <TextInput 
            placeholder='Código da modalidade'
            value={personal.codmodalidade}
            onChangeText={(text) => setPersonal({...personal, codmodalidade: text})}/>
        </View>
    )
}