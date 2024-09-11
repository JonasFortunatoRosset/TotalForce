import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

import personal from       './Images/personal.png'
import user from           './Images/user.png'
import adm from            './Images/adm.png'
import totalforcelogo from './Images/totalforcelogo.png';

export function LoginPage({navigation}) {

  function Acess(){
    const[entrar,setEntrar] = useState('')
    const[password,setPassword] = useState('')

    if(entrar === '' || password === ''){
      Alert.alert("Prencher todos os campos")
    }

    if(entrar === 'user123' || password === '123'){
      Alert.alert("Prencher todos os campos")
      navigation.navigate('HomePage')
    }
    else{
      Alert.alert("Usuário ou senha incorreto")
    }

    
  }

  const [usuario, setUsuario] = useState({
    login: "",
    senha: ""
  })

  function Login(){
    axios.post('http://locahost:3000/usuarios', {
      login: usuario.login,
      senha: usuario.senha
    })
    .then(response =>{
      setUsuario({
        login: "",
        senha: ""
      })
    })
    .catch(error => {
      Alert.alert("Erro", "Credenciais incorretas!")
      console.error(error)
      navigation.navigate('HomePage')
    })
  }

  return(
    <View style={styles.container}>
    <View style={styles.header}>
      <Image source={totalforcelogo} style={styles.headerimg}/>
    </View>
    <View style={styles.body}>
      <View style={styles.boxlogin}>
       <View style={styles.btnstipos}>
        <Image source={user} style={styles.imguser} />  
        <Image source={personal} style={styles.imguser} /> 
        <Image source={adm} style={styles.imguser} /> 
       </View>
       <View style={styles.txttiposbox}>
         <Text style={styles.txttipos}> Usuário </Text>
         <Text style={styles.txttipos}> Personal </Text>
         <Text style={styles.txttipos}> Administrador </Text>
       </View>
       <View style={styles.boxbtn}>
         <TextInput 
          style={styles.inputs} 
          placeholder='Login' 
          placeholderTextColor={'#000'} 
          value={entrar}
          onChangeText={setEntrar}/>

         <TextInput 
         style={styles.inputs}
          placeholder='Senha' 
          placeholderTextColor={'#000'} 
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}/>

         <TouchableOpacity onPress={Login} style={styles.boxbtnacess}>
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
    height: '100%'
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnstipos: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
    width: '82%',
  },
  txttiposbox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
    width: '82%',
  },
  txttipos:{
    size: 10,
  },
  boxbtn: {
    display: 'flex',
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
    display: 'flex',
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
    display: 'flex',
    justifyContent:'center',
    backgroundColor: '#FFB031',
    color: '#000',
    fontSize: 20
  },
});
 