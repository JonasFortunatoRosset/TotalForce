import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function cadastroModalidade(){
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
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Cadastro de Modalidades</Text>
            </View>

            <View style={styles.body}>
            <TextInput 
            style={styles.inputs}
            placeholder='Código'
            value={modalidade.codigo}
            onChangeText={(text) => setPersonal({...modalidade, codigo: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Nome'
            value={modalidade.nome}
            onChangeText={(text) => setPersonal({...modalidade, nome: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Descricao'
            value={modalidade.descricao}
            onChangeText={(text) => setPersonal({...modalidade, descricao: text})}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn}> Cadastrar</Text>
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