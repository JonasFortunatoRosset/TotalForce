import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function verPersonal(){
    const [personal, setPersonal] = useState({
        codigo: "",
        nome: "",
        cpf: "",
        endereco: "",
        cidade: "",
        senha: ""
    })

    function inserirPersonal(){
        axios.post("http://localhost:3000/colaboradores", {
            codigo: personal.codigo,
            nome: personal.nome,
            cpf: personal.cpf,
            endereco: personal.endereco,
            cidade: personal.cidade,
            senha: personal.senha
        }).then(response => {
            alert.Alert("Sucesso", "Personal cadastrado com exito")
            setPersonal({
                codigo: "",
                nome: "",
                cpf: "",
                endereco: "",
                cidade: "",
                senha: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "Personal não cadastrado")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Pesquisa de Personal</Text>
            </View>

            <View style={styles.body}>
            <TextInput 
            style={styles.inputs}
            placeholder='Código'
            value={personal.codigo}
            onChangeText={(text) => setPersonal({...personal, codigo: text})}/>
        
            <TextInput 
            style={styles.inputs}
            placeholder='Nome'
            value={personal.nome}
            onChangeText={(text) => setPersonal({...personal, nome: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='CPF'
            value={personal.cpf}
            onChangeText={(text) => setPersonal({...personal, cpf: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Endereço'
            value={personal.endereco}
            onChangeText={(text) => setPersonal({...personal, endereco: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Cidade'
            value={personal.cidade}
            onChangeText={(text) => setPersonal({...personal, cidade: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Senha'
            value={personal.senha}
            onChangeText={(text) => setPersonal({...personal, senha: text})}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={inserirPersonal}> Pesquisar</Text>
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