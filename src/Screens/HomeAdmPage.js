import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

import logoTotal from './Images/logoTotal.png';

export function HomeAdmPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.line}>
          <TouchableHighlight onPress={() => navigation.navigate('CadastroGeral')} underlayColor={null} style={styles.boxHighlight}>
            <View style={styles.box}>
              <Text style={styles.boxText}>Cadastrar</Text>
              <Feather name="credit-card" size={120} color="black" />
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('VerGeral')} underlayColor={null} style={styles.boxHighlight}>
            <View style={styles.box}>
              <Text style={styles.boxText}>Cadastros</Text>
              <Entypo name="eye" size={120} color="black" />
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.footer}>
        <Image style={styles.imgFooter} source={logoTotal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9756',
  },
  header: {
    width: '100%',
    backgroundColor: '#FF9756',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 12,
    marginTop: 30,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flex: 1,    
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    width: '90%',
  },
  boxHighlight: {
    borderRadius: 12,
  },
  box: {
    backgroundColor: '#FF9756',
    width: 300,
    height: 150,
    borderRadius: 12,
    margin: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
  },
  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  footer: {
    width: '100%',
    backgroundColor: '#FF9756',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imgFooter: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
});
