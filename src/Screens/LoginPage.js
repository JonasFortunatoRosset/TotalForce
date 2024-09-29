import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Pressable } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import personal from        './Images/personal.png';
import user from            './Images/user.png';
import adm from             './Images/adm.png';
import totalforcelogo from  './Images/totalforcelogo.png';

export function LoginPage({navigation}) {
  
  const [Click, setClick] = useState(null); 

  function boxClick(buttonIndex){
    setClick(buttonIndex); 
  };


  const loginUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginusuarios', {
        cpf: dados.cpf,
        senha: dados.senha
      });
      
      setDados({
        cpf: "",
        senha: "",
      });
      if (response) {
        const token  = response.data.token;
        console.log(response)
        await AsyncStorage.setItem('token', token);

        Alert.alert("Login efetuado com sucesso")
        navigation.navigate('HomePage');      
      }
    } catch (error) {
      Alert.alert("Erro", "Credenciais incorretas!");
      console.error(error);
    }
  };


  const loginAdministrador = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginadministradores', {
        cpf: dados.cpf,
        senha: dados.senha
      });
      
      setDados({
        cpf: "",
        senha: "",
      });
      if (response) {
        const token  = response.data.token;
        console.log(response)
        await AsyncStorage.setItem('token', token);

        Alert.alert("Login efetuado com sucesso")
        navigation.navigate('LoginAdmPage')
      }
    } catch (error) {
      Alert.alert("Erro", "Credenciais incorretas!");
      console.error(error);
    }
  };


  const loginColaborador = async () => {
    try {
      const response = await axios.post('http://localhost:3000/logincolaboradores', {
        cpf: dados.cpf,
        senha: dados.senha
      });
      
      setDados({
        cpf: "",
        senha: "",
      });
      if (response) {
        const token  = response.data.token;
        console.log(response)
        await AsyncStorage.setItem('token', token);

        Alert.alert("Login efetuado com sucesso")
        navigation.navigate('HomeColaboradorPage')
      }
    } catch (error) {
      Alert.alert("Erro", "Credenciais incorretas!");
      console.error(error);
    }
  };


  function Acess(){

    if(Click === 1){
      loginUsuario()
    }
     else if(Click === 2){
      loginColaborador()
    }
    else if(Click === 3){
      loginAdministrador()
    }

    else{
      Alert.alert("Usuário ou senha incorreto") 
    }
  }

  const [dados, setDados] = useState({
    cpf: "",
    senha: ""
  });
    

  return(
    <View style={styles.container}>
    <View style={styles.header}>
      <Image source={totalforcelogo} style={styles.headerimg}/>
    </View>
    <View style={styles.body}>
      <View style={styles.boxlogin}>
       <View style={styles.btnstipos}>

        <Pressable 
                onPress={() => boxClick(1)}
                style={[
                  styles.logs,
                  { backgroundColor: Click === 1 ? '#FFB031' : '#E49413' },
                ]}>
        <Image source={user} style={styles.imguser} />  
        <Text style={styles.txttipos}> Usuário </Text>
        </Pressable>

        <Pressable  onPress={() => boxClick(2)}
                style={[
                  styles.logs,
                  { backgroundColor: Click === 2 ? '#FFB031' : '#E49413' },
                ]}>
        <Image source={personal} style={styles.imguser} /> 
        <Text style={styles.txttipos}> Personal </Text>
        </Pressable>

        <Pressable   onPress={() => boxClick(3)}
                style={[
                  styles.logs,
                  { backgroundColor: Click === 3 ? '#FFB031' : '#E49413' },
                ]}>
        <Image source={adm} style={styles.imguser} /> 
        <Text style={styles.txttipos}> Admin </Text>
        </Pressable>

       </View>

       <View style={styles.boxbtn}>
         <TextInput 
          style={styles.inputs} 
          placeholder='Login' 
          placeholderTextColor={'#000'} 
          value={dados.cpf}
            onChangeText={(text) => setDados({...dados, cpf: text})}/>

         <TextInput 
         style={styles.inputs}
          placeholder='Senha' 
          placeholderTextColor={'#000'} 
          value={dados.senha}
          onChangeText={(text) => setDados({...dados, senha: text})}
          secureTextEntry={true}/>

         <TouchableOpacity onPress={Acess} style={styles.boxbtnacess}>
         <Text style={styles.txtbtnlogin}> Acessar </Text>
       </TouchableOpacity>
       </View>
       </View>
     </View>
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB031',
    height: '100%',

  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerimg: {
    width: 270,
    height: 370,
  },
  imguser:{
    width: 60,
    height: 60,
    marginTop: 10
  },
  body: {
    backgroundColor: '#E49413',
    borderRadius: 15,
    width:'90%',
    height: '40%'
  },
  boxlogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnstipos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
    width: '82%',
  },
  logs:{
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,

  },
  txttipos:{
    size: 10,
  },
  boxbtn: {
    flexDirection: 'column',
    margin: 18,
    
  },
  btnslogin: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  boxbtnacess: {
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
  txtbtnlogin: {
    justifyContent:'center',
    backgroundColor: '#FFB031',
    color: '#000',
    fontSize: 20
  },
});