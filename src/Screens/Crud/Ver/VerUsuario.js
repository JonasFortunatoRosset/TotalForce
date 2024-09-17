import { StyleSheet, Text, View, TextInput, Alert,TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export  function verUsuario(){
    const [usuario, setUsuario] = useState([])

    function PesquisarUsuarios(){
      useEffect(() => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
              setUsuario(response.data.usuario);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    }

    return(
        <View style={styles.container}>
         <View style={styles.header}> 
            <Text style={styles.txtheader}>Pesquisa de Usuário</Text>
         </View>

            <View style={styles.body}>
            <FlatList
                data={usuario}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Código: {item.codigo}</Text>
                        <Text style={styles.itemText}>Nome: {item.nome}</Text>
                        <Text style={styles.itemText}>descrição: {item.cpf}</Text>
                        <Text style={styles.itemText}>descrição: {item.endereco}</Text>
                        <Text style={styles.itemText}>descrição: {item.cidade}</Text>
                        <Text style={styles.itemText}>descrição: {item.senha}</Text>
                        <Text style={styles.itemText}>descrição: {item.peso}</Text>
                        <Text style={styles.itemText}>descrição: {item.altura}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={PesquisarUsuarios}> Pesquisar</Text>
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