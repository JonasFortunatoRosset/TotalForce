import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function excluirAdministrador(){
    const [administrador, setAdministrador] = useState({
        codigo: "",
        nome: "",
        cpf: "",
        login: "",
        senha: ""
    })

    function inserirAdministrador(){
        axios.post("http://localhost:3000/administrador", {
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
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Exclusão de Administrador</Text>
            </View>
            
        <View style={styles.body}>
            <TextInput
            
            style={styles.inputs}
            placeholder='Código'
            value={administrador.codigo}
            onChangeText={(text) => setAdministrador({...administrador, codigo: text})}/>

            <TextInput

            style={styles.inputs}
            placeholder='Nome'
            value={administrador.nome}
            onChangeText={(text) => setAdministrador({...administrador, nome: text})}/>

            <TextInput
            
            style={styles.inputs}
            placeholder='CPF'
            value={administrador.cpf}
            onChangeText={(text) => setAdministrador({...administrador, cpf: text})}/>

            <TextInput

            style={styles.inputs}
            placeholder='Login'
            value={administrador.login}
            onChangeText={(text) => setAdministrador({...administrador, login: text})}/>

            <TextInput

            style={styles.inputs}
            placeholder='Senha'
            value={administrador.senha}
            onChangeText={(text) => setAdministrador({...administrador, senha: text})}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn}> Excluir </Text>
            </TouchableOpacity>



        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB031',
      },
      header:{
        backgroundColor: '#E49413',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      txtheader:{
        fontSize: 20,
      },
      body:{
        backgroundColor: '#E49413',
        height: '80%',
        margin: 20,
        padding: 15,
        alignItems: 'center',

      },

      inputs: {
        color: '#000',
        size: 20,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
        width: 300,
        height: 45,
        padding: 10,
      },
      btn:{
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        size: 20,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#FFB031',
        width: 300,
        height: 45,
      },
      txtbtn:{
        justifyContent:'center',
        backgroundColor: '#FFB031',
        color: '#000',
        fontSize: 20,
      },
})