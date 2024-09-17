import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export  function verExercicio(){
    const [exercicio, setExercicio] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codtreino: ""
        })
    
    function inserirExercicio(){
    useEffect(() => {
        axios.get('http://localhost:3000/alimentos')
            .then(response => {
                setAlimentos(response.data.alimentos);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);
    }

    return(
    
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Pesquisa de Exercícios</Text>
            </View>

           <View style={styles.body}>
          
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={inserirExercicio}> Pesquisar</Text>
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