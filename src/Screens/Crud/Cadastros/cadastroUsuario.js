import { StyleSheet, Text, View, TextInput, Alert,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  function CadastroUsuario(){
    const [usuario, setUsuario] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: "",
        status: ""
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

    const inserirUsuarios = async() => {

      const token = await getToken();  

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }
        axios.post("http://localhost:3000/usuarios", {
            nome:     usuario.nome,
            cpf:      usuario.cpf,
            endereco: usuario.endereco,
            senha:    usuario.senha,
            peso:     usuario.peso,
            altura:   usuario.altura,
            status:   usuario.status

        }, {
            Headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        }).then(response => {
            Alert.alert("Sucesso", "Usuário foi cadastrado");
            setUsuario({
              nome: "",
              cpf: "",
              endereco: "",
              senha: "",
              peso: "",
              altura: "",
              status: ""   
            })
        }).catch(error => {
            Alert.alert("Erro", "Não foi possível cadastrar o usuário")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
         <View style={styles.header}> 
            <Text style={styles.txtheader}>Cadastro de Usuário</Text>
         </View>

            <View style={styles.body}>

            <TextInput
            style={styles.inputs}
            placeholder='Nome'
            value={usuario.nome}
            onChangeText={(text) => setUsuario({...usuario, nome: text})}
            />

            <TextInput
            style={styles.inputs}
            placeholder='CPF'
            value={usuario.cpf}
            onChangeText={(text) => setUsuario({...usuario, cpf: text})}
            />

            <TextInput 
            style={styles.inputs}
            placeholder='Endereço'
            value={usuario.endereco}
            onChangeText={(text) => setUsuario({...usuario, endereco: text})}
            />

            <TextInput
            style={styles.inputs}
            placeholder='Senha'
            value={usuario.senha}
            onChangeText={(text) => setUsuario({...usuario, senha: text})}
            />

            <TextInput
            style={styles.inputs}
            placeholder='Peso'
            value={usuario.peso}
            onChangeText={(text) => setUsuario({...usuario, peso: text})}
            />

            <TextInput
            style={styles.inputs}
            placeholder='Altura'
            value={usuario.altura}
            onChangeText={(text) => setUsuario({...usuario, altura: text})}
            />

            <TextInput
            style={styles.inputs}
            placeholder='Status'
            value={usuario.status}
            onChangeText={(text) => setUsuario({...usuario, status: text})}
            />

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={inserirUsuarios}> Cadastrar</Text>
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