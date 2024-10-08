import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  function CadastroTreino(){
    const [treino, setTreino] = useState({
        nome: "",
        descricao: "",
        cpfusuario: "",
        codmodalidade: ""
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

    const inserirTreino = async() => {

      const token = await getToken();  

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }
        axios.post("http://localhost:3000/treinos", {
            nome: treino.nome,
            descricao: treino.descricao,
            cpfusuario: treino.cpfusuario,
            codmodalidade: treino.codmodalidade
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,  
                'Content-Type': 'application/json',
            }
        }).then(response => {
            Alert.alert("Sucesso", "O treino foi cadastrado")
            setTreino({
                nome: "",
                descricao: "",
                cpfusuario: "",
                codmodalidade: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "Não foi possível cadastrar o treino")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
         <View style={styles.header}> 
            <Text style={styles.txtheader}>Cadastro de Treino</Text>
         </View>
            <View style={styles.body}>
        
            <TextInput
            style={styles.inputs}
            placeholder='Nome'
            value={treino.nome}
            onChangeText={(text) => setTreino({...treino, nome: text})}/>

            <TextInput
            style={styles.inputs}
            placeholder='Descrição'
            value={treino.descricao}
            onChangeText={(text) => setTreino({...treino, descricao: text})}/>

            <TextInput
            style={styles.inputs}
            placeholder='Cpf do usuário'
            value={treino.cpfusuario}
            onChangeText={(text) => setTreino({...treino, cpfusuario: text})}/>

            <TextInput
            style={styles.inputs}
            placeholder='Código da modalidade'
            value={treino.codmodalidade}
            onChangeText={(text) => setTreino({...treino, codmodalidade: text})}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={inserirTreino}> Cadastrar</Text>
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