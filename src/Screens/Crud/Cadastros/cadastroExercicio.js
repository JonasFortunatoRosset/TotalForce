import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function cadastroExercicio(){
    const [exercicio, setExercicio] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codtreino: ""
        })
    
    function inserirExercicio(){
        axios.post("http//localhost:3000/exercicios",{
            codigo:    exercicio.codigo,
            nome:      exercicio.nome,
            descricao: exercicio.descricao,
            codtreino: exercicio.codtreino
        }).then(response => {
            alert.Alert("Sucesso", "exercício cadastrado")
            console.response(response)
            setExercicio({
                codigo: "",
                nome: "",
                descricao: "",
                codtreino: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "exercício não cadastrado")
            console.error(error)
        })
    }

    return(
        <View>
            <Text>Cadastro de exercício</Text>
            <TextInput 
            placeholder='Código'
            value={exercicio.codigo}
            onChangeText={(text) => setPersonal({...exercicio, codigo: text})}/>

            <TextInput 
            placeholder='Nome'
            value={exercicio.nome}
            onChangeText={(text) => setPersonal({...exercicio, nome: text})}/>

            <TextInput 
            placeholder='Descrição'
            value={exercicio.descricao}
            onChangeText={(text) => setPersonal({...exercicio, descricao: text})}/>

            <TextInput 
            placeholder='Código do treino'
            value={exercicio.codtreino}
            onChangeText={(text) => setPersonal({...exercicio, codtreino: text})}/>
        </View>
    )
}