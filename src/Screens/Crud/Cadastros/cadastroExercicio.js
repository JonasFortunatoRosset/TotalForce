import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity,Platform,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import axios from 'axios';

export  function CadastroExercicio(){
    const [imageUri, setImageUri] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [exercicio, setExercicio] = useState({
        nome: "",
        descricao: "",
        codtreino: "",
        gif: "",
        })


  
    
  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão da galeria para isso funcionar!');
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []); 
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      convertImageToBase64(selectedImageUri);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);
      setExercicio((prevExercicio) => ({
        ...prevExercicio,
        gif: base64,
      }));
    } catch (error) {
      console.error('Erro ao converter imagem para base64:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };    
    
  const inserirExercicio = async () => {

    const token = await getToken();  

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

        axios.post("http://localhost:3000/exercicios",{
          nome: exercicio.nome,
          descricao: exercicio.descricao,
          codtreino: exercicio.codtreino,
          gif: exercicio.gif, 
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          }
        }).then(response => {
            alert.Alert("Sucesso", "exercício cadastrado")
            console.response(response)
            setExercicio({
                nome: "",
                descricao: "",
                codtreino: "",
                gif: "",
            });
            setImageUri(null);
        }).catch(error => {
            alert.Alert("Erro", "exercício não cadastrado")
            console.error(error)
        })
    }

    return(
    
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={styles.txtheader}>Cadastro de Exercícios</Text>
            </View>

           <View style={styles.body}>
            
            <TextInput
            style={styles.inputs}
            placeholder='Nome'
            value={exercicio.nome}
            onChangeText={(text) => setExercicio({...exercicio, nome: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Descrição'
            value={exercicio.descricao}
            onChangeText={(text) => setExercicio({...exercicio, descricao: text})}/>

            <TextInput 
            style={styles.inputs}
            placeholder='Código do treino'
            value={exercicio.codtreino}
            onChangeText={(text) => setExercicio({...exercicio, codtreino: text})}/>

            <TextInput
              onPress={pickImage}
              editable={false}  
              style={styles.inputs}
              placeholder='Selecionar GIF'
              value={imageUri ? 'GIF selecionado' : ''}  
            />

            {imageUri && (
              <Image source={{ uri: imageUri }} style={{width: 200, height: 200, margin: 20}} />
            )}

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtbtn} onPress={inserirExercicio}> Cadastrar</Text>
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
      exibirGif:{
        width: 200, 
        height: 200, 
        margin: 20
      },
})