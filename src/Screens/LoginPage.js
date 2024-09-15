import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Pressable } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

import personal from        './Images/personal.png';
import user from            './Images/user.png';
import adm from             './Images/adm.png';
import totalforcelogo from  './Images/totalforcelogo.png';

export function LoginPage({navigation}) {

  const[entrar,setEntrar] = useState('')
  const[password,setPassword] = useState('')
  
  const [Click, setClick] = useState(null); 

  function boxClick(buttonIndex){
    setClick(buttonIndex); 
  };



  function Acess(){

    if(entrar === 'user' && password === '123' && Click === 1){
      navigation.navigate('HomePage')
    }
     else if(entrar === 'personal' && password === '123' && Click === 2){
      navigation.navigate('HomePage')
    }
    else if(entrar === 'adm' && password === '123' && Click === 3){
      navigation.navigate('LoginAdmPage')
    }

    else{
      Alert.alert("Usuário ou senha incorreto") 
    }
  }

  const [usuario, setUsuario] = useState({
    cpf: "",
    senha: ""
  });
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginusuarios', {
        cpf: usuario.cpf,
        senha: usuario.senha
      });
      
      setUsuario({
        cpf: "",
        senha: "",
      });
  
      if (response.data && response.data.token) {
        const { token } = response.data;
        
        await AsyncStorage.setItem('token', token);
  
        navigation.navigate('HomePage');
      }
    } catch (error) {
      Alert.alert("Erro", "Credenciais incorretas!");
      console.error(error);
    }
  };
  
      
    

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
          value={entrar}
          onChangeText={setEntrar}/>

         <TextInput 
         style={styles.inputs}
          placeholder='Senha' 
          placeholderTextColor={'#000'} 
          value={password}
          onChangeText={setPassword}
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
 