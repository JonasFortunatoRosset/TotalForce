import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function cadastroAdministrador(){
    const [administrador, setAdministrador] = useState({
        codigo: "",
        nome: "",
        cpf: "",
        login: "",
        senha: ""
    })

    function inserirAdministrador(){
        axios.post("http//localhost:3000/administrador", {
            codigo: administrador.codigo,
            nome: administrador.nome,
            cpf: administrador.cpf,
            login: administrador.login,
            senha: administrador.senha
        }).then(response => {
            alert.Alert("Sucesso", "administrador cadastrado!")
            console.response(response)
            setAdministrador({
                codigo: "",
                nome: "",
                cpf: "",
                login: "",
                senha: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "não foi possível cadastrar o administrador")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
            <View>
                <Text>Cadastro de Administrador</Text>
            </View>
            
            <TextInput
            
            placeholder='Código'
            value={administrador.codigo}
            onChangeText={(text) => setPersonal({...administrador, codigo: text})}/>

            <TextInput
            placeholder='Nome'
            value={administrador.nome}
            onChangeText={(text) => setPersonal({...administrador, nome: text})}/>

            <TextInput
            placeholder='CPF'
            value={administrador.cpf}
            onChangeText={(text) => setPersonal({...administrador, cpf: text})}/>

            <TextInput
            placeholder='Login'
            value={administrador.login}
            onChangeText={(text) => setPersonal({...administrador, login: text})}/>

            <TextInput
            placeholder='Senha'
            value={administrador.senha}
            onChangeText={(text) => setPersonal({...administrador, senha: text})}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB031',
      },
})