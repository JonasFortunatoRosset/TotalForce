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
        <EvilIcons name="user" size={60} color="black" />
      </View>

      <View style={styles.body}>
        <View style={styles.line}>
          <TouchableHighlight onPress={() => navigation.navigate('CadastroGeral')} underlayColor={'#855200'} style={styles.boxHighlight}>
            <View style={styles.box}>
              <Text style={styles.boxText}>Cadastrar</Text>
              <Feather name="credit-card" size={120} color="black" />
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('VerGeral')} underlayColor={'#855200'} style={styles.boxHighlight}>
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
    backgroundColor: '#E49413',
  },
  header: {
    width: '100%',
    backgroundColor: '#E49413',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 12,
    marginTop: 25,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    backgroundColor: '#FFB031',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    width: '90%',
  },
  boxHighlight: {
    borderRadius: 12,
  },
  box: {
    backgroundColor: '#E49413',
    width: 160,
    height: 220,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  footer: {
    width: '100%',
    backgroundColor: '#E49413',
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
