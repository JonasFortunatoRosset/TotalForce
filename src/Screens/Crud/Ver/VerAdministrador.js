import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity,FlatList } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export  function verAdministrador(){
    const [administrador, setAdministrador] = useState([])

    function PesquisarAdministrador(){

      useEffect(() => {
        axios.get('http://localhost:3000/administradores')
            .then(response => {
              setAdministrador(response.data.administrador);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    }
     

    return(
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Pesquisa de Administrador</Text>
            </View>
            
        <View style={styles.body}>
        <FlatList
                data={administrador}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Código: {item.codigo}</Text>
                        <Text style={styles.itemText}>Nome: {item.nome}</Text>
                        <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                        <Text style={styles.itemText}>Login: {item.login}</Text>
                        <Text style={styles.itemText}>Senha: {item.senha}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.btn} onPress={PesquisarAdministrador}>
                <Text style={styles.txtbtn}> Pesquisar</Text>
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
      itemContainer:{
        backgroundColor: '#FFB031',
        alignItems: 'center',
        padding: 5,
      },

      itemText: {
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