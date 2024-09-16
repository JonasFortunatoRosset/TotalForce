import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function alteracaoPersonal(){
    const [personal, setPersonal] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codusuario: "",
        propriedade: "",
        codmodalidade: ""
    })

    function inserirPersonal(){
        axios.post("http//localhost:3000/personal", {
            codigo: personal.codigo,
            nome: personal.nome,
            descricao: personal.descricao,
            codusuario: personal.codusuario,
            propriedade: personal.propriedade,
            codmodalidade: personal.codmodalidade
        }).then(response => {
            alert.Alert("Sucesso", "Personal cadastrado com exito")
            setPersonal({
                codigo: "",
                nome: "",
                descricao: "",
                codusuario: "",
                propriedade: "",
                codmodalidade: ""
            })
        }).catch(error => {
            alert.Alert("Erro", "Personal não cadastrado")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Alteração de Personal</Text>
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
            placeholder='Descrição'
            value={personal.descricao}
            onChangeText={(text) => setPersonal({...personal, descricao: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Código do usuário'
            value={personal.codusuario}
            onChangeText={(text) => setPersonal({...personal, codusuario: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Propriedade'
            value={personal.propriedade}
            onChangeText={(text) => setPersonal({...personal, propriedade: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Código da modalidade'
            value={personal.codmodalidade}
            onChangeText={(text) => setPersonal({...personal, codmodalidade: text})}/>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn}> Alterar </Text>
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