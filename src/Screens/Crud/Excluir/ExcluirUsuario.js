import { StyleSheet, Text, View, TextInput, Alert,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function excluirUsuario(){
    const [usuario, setUsuario] = useState({
        codigo: "",
        nome: "",
        cpf: "",
        endereco: "",
        cidade: "",
        senha: "",
        peso: "",
        altura: ""
    })

    function inserirUsuarios(){
        axios.post("http://localhost:3000/usuarios", {
            codigo:   usuario.codigo,
            nome:     usuario.nome,
            cpf:      usuario.cpf,
            endereco: usuario.endereco,
            cidade:   usuario.cidade,
            senha:    usuario.senha,
            peso:     usuario.peso,
            altura:   usuario.altura

        }, {
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            Alert.alert("Sucesso", "Usuário foi cadastrado");
            setUsuario({
                codigo: "",
                nome: "",
                cpf: "",
                endereco: "",
                cidade: "",
                senha: "",
                peso: "",
                altura: ""    
            })
        }).catch(error => {
            Alert.alert("Erro", "Não foi possível cadastrar o usuário")
            console.error(error)
        })
    }

    return(
        <View style={styles.container}>
         <View style={styles.header}> 
            <Text style={styles.txtheader}>Exclusão de Usuário</Text>
         </View>

            <View style={styles.body}>
            <TextInput 
            style={styles.inputs}
            placeholder='Código'
            value={usuario.codigo}
            onChangeText={(text) => setUsuario({...usuario, codigo: text})}/>

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
            placeholder='Cidade'
            value={usuario.cidade}
            onChangeText={(text) => setUsuario({...usuario, cidade: text})}
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