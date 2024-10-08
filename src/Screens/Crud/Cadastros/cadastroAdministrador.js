import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export  function CadastroAdministrador(){
    const [administrador, setAdministrador] = useState({
        nome: "",
        cpf: "",
        login: "",
        senha: ""
    })

    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        return token;
      } catch (error) {
        console.error('Erro ao recuperar o token:', error);
        return null;
      }
    };    

    
    const inserirAdministrador = async() => {

      const token = await getToken();  

      if (!token) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        return;
      }
        axios.post("http://localhost:3000/administradores", {
            nome: administrador.nome,
            cpf: administrador.cpf,
            senha: administrador.senha,
        },{
          headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',
        }

        }).then(response => {
            Alert.alert("Sucesso", "administrador cadastrado!")
            console.response(response)
            setAdministrador({
                nome: "",
                cpf: "",
                login: "",
                senha: ""
            })
        }).catch(error => {
            Alert.alert("Erro", "não foi possível cadastrar o administrador")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Cadastro de Administrador</Text>
            </View>
            
        <View style={styles.body}>

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
            placeholder='Senha'
            value={administrador.senha}
            onChangeText={(text) => setAdministrador({...administrador, senha: text})}
            secureTextEntry={true}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={inserirAdministrador}> Cadastrar</Text>
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