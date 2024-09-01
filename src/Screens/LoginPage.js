import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';


{/* lógica de login */}
const[login,  setLogin] = useState('');
const[password, setPassword] = useState('');

export default function LoginPage(navigation) {

  const functionLogin = async () => {

    if (login == 'alvaro123' && password == '1234') {
      navigation.navigate('HomePage')
      
      setPassword('');
      setLogin('');
    }
     
  
    if (!login) {
      Alert.alert('Erro', 'O campo de Login é obrigatório');
      return;
    }
  
    if (!password) {
      Alert.alert('Erro', 'O campo de Senha é obrigatório');
      return;
    }
  
    else{
      Alert.alert('Erro','Credenciais inválidas');
    }
  }

  <View style={styles.container}>
    <View style={styles.header}>
      <Image source={require("./Image/totalforcelogo.png")} style={styles.headerimg}/>
    </View>
    <View style={styles.body}>
      <View style={styles.boxlogin}>
       <View style={styles.btnstipos}>
       <Fontisto name="checkbox-passive" size={24} color="black" />  {/* Login de usuasrio */}
       <Fontisto name="checkbox-passive" size={24} color="black" />  {/* Login de Colaborador */}
       <Fontisto name="checkbox-passive" size={24} color="black" />  {/* Login de Adm */}
       </View>
       <View style={styles.txttiposbox}>
         <Text style={styles.txttipos}> User </Text>
         <Text style={styles.txttipos}> Personal </Text>
         <Text style={styles.txttipos}> Admin </Text>
       </View>
       <View style={styles.boxbtn}>
         <TextInput style={styles.inputs} placeholder='Login' placeholderTextColor={'#000'} value={login}  onChangeText={setLogin}/>
         <TextInput style={styles.inputs} placeholder='Password' placeholderTextColor={'#000'} value={password}  onChangeText={setPassword} secureTextEntry/>
       </View>
       <TouchableOpacity style={styles.boxbtnacess}>
         <Text style={styles.txtbtnlogin} onPress={functionLogin}> Acessar </Text>
       </TouchableOpacity>
       </View>
     </View>
  </View>
  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFB031'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  headerimg: {
    width: 170,
    height: 170,
  },
  body: {
    backgroundColor: '#E49413',
    borderRadius: 5,
  },
  boxlogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnstipos: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 5,
  },
  txttiposbox: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 5,
  },
  txttipos:{
    size: 10,
  },
  boxbtn: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  btnslogin: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  inputs: {
    color: '#fff',
    size: 20,
    
  },
  boxbtnacess: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 10,
  },
  txtbtnlogin: {
    display: 'flex',
    justifyContent:'center',
    backgroundColor: '#FFB031',
    color: '#000'
  },
});
 