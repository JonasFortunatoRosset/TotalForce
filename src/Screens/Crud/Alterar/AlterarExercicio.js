import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function alteracaoExercicio(){
    const [exercicio, setExercicio] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codtreino: ""
        })
    
    function inserirExercicio(){
        axios.post("http://localhost:3000/exercicios",{
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
    
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Alteração de Exercícios</Text>
            </View>

           <View style={styles.body}>
            
            <TextInput 
            style={styles.inputs}
            placeholder='Código'
            value={exercicio.codigo}
            onChangeText={(text) => setPersonal({...exercicio, codigo: text})}/>

            <TextInput
            style={styles.inputs}
            placeholder='Nome'
            value={exercicio.nome}
            onChangeText={(text) => setPersonal({...exercicio, nome: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Descrição'
            value={exercicio.descricao}
            onChangeText={(text) => setPersonal({...exercicio, descricao: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Código do treino'
            value={exercicio.codtreino}
            onChangeText={(text) => setPersonal({...exercicio, codtreino: text})}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn}> Alterar</Text>
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