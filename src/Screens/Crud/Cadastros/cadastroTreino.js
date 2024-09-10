import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function cadastroTreino(){
    const [treino, setTreino] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codusuario: "",
        propriedade: "",
        codmodalidade: ""
    })

    function inserirTreino(){
        axios.post("http://localhost:3000/treinos", {
            codigo: treino.codigo,
            nome: treino.nome,
            descricao: treino.descricao,
            codusuario: treino.codusuario,
            propriedade: treino.propriedade,
            codmodalidade: treino.codmodalidade
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            alert.Alert("Sucesso", "O treino foi cadastrado")
            setTreino({
                codigo: "",
                nome: "",
                descricao: "",
                codusuario: "",
                propriedade: "",
                codmodalidade: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "Não foi possível cadastrar o treino")
            console.error(error)
        })
    }

    return(
        <View>
            <Text>Cadastro de treino</Text>
            <TextInput 
            placeholder='Código'
            value={treino.codigo}
            onChangeText={(text) => setUsuario({...treino, codigo: text})}/>
        
            <TextInput
            placeholder='Nome'
            value={treino.nome}
            onChangeText={(text) => setUsuario({...treino, nome: text})}/>

            <TextInput
            placeholder='Descrição'
            value={treino.descricao}
            onChangeText={(text) => setUsuario({...treino, descricao: text})}/>

            <TextInput
            placeholder='Código do usuário'
            value={treino.codusuario}
            onChangeText={(text) => setUsuario({...treino, codusuario: text})}/>

            <TextInput
            placeholder='Propriedade'
            value={treino.propriedade}
            onChangeText={(text) => setUsuario({...treino, propriedade: text})}/>

            <TextInput
            placeholder='Código da modalidade'
            value={treino.codmodalidade}
            onChangeText={(text) => setUsuario({...treino, codmodalidade: text})}/>
        </View>
    )
}