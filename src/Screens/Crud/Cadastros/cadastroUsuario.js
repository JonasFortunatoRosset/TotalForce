import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export  function cadastroUsuario(){
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
        <View>
            <Text>Cadastro usuários</Text>
            <TextInput 
            placeholder='Código'
            value={usuario.codigo}
            onChangeText={(text) => setUsuario({...usuario, codigo: text})}/>

            <TextInput
            placeholder='Nome'
            value={usuario.nome}
            onChangeText={(text) => setUsuario({...usuario, nome: text})}
            />

            <TextInput
            placeholder='CPF'
            value={usuario.cpf}
            onChangeText={(text) => setUsuario({...usuario, cpf: text})}
            />

            <TextInput 
            placeholder='Endereço'
            value={usuario.endereco}
            onChangeText={(text) => setUsuario({...usuario, endereco: text})}
            />

            <TextInput
            placeholder='Cidade'
            value={usuario.cidade}
            onChangeText={(text) => setUsuario({...usuario, cidade: text})}
            />

            <TextInput
            placeholder='Senha'
            value={usuario.senha}
            onChangeText={(text) => setUsuario({...usuario, senha: text})}
            />

            <TextInput
            placeholder='Peso'
            value={usuario.peso}
            onChangeText={(text) => setUsuario({...usuario, peso: text})}
            />

            <TextInput
            placeholder='Altura'
            value={usuario.altura}
            onChangeText={(text) => setUsuario({...usuario, altura: text})}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})