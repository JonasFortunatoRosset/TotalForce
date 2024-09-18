import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

import totalforcelogo from './Images/totalforcelogo.png'

export function HomeAdmPage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
        <EvilIcons name="user" size={60} color="black" />
      </View>
      <View style={styles.body}>
        <View style={styles.line1}>
          <TouchableHighlight onPress={() => navigation.navigate('CadastroGeral')} underlayColor={'#855200'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Cadastrar</Text>
            <Feather name="credit-card" size={120} color="black" />
          </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('VerGeral')} underlayColor={'#855200'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Ver</Text>
             <Entypo name="eye" size={120} color="black" />
          </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.footer}>
        <Image style={styles.imgfooter} source={totalforcelogo}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#E49413',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtheader: {
    color: '#000',
    fontSize: 20,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFB031'
  },
  line1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    gap: 45, 

  },
  line2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    gap: 45, 
    marginBottom: '25%'

  },
  box: {
    backgroundColor: '#E49413',
    padding: 10,
    height: 200,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10,
  },
  boxImageTrain: {
    width: 120,
    height: 120,
  },
  boxImageNutricao: {
    width: 92,
    height: 120,
  },
  boxImageConfig: {
    width: 120,
    height: 120,
  },
  boxImagePagamento: {
    width: 120,
    height: 120,
  },
  footer: {
    width: '100%',
    backgroundColor: '#E49413',
    padding: 15,
    alignItems: 'center',
  },
  imgfooter: {
    width: 110,
    height: 50,
  }
});