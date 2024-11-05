import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

import dumbel from './Images/dumbel.png';
import nutricao from './Images/nutricao.png';

export function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
        <EvilIcons name="user" size={60} color="black" />
      </View>

      
      <View style={styles.body}>
        <View style={styles.color}>
          <TouchableHighlight 
            onPress={() => navigation.navigate('TrainPage')} 
            underlayColor={'#855200'} 
            style={styles.boxHighlight}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>Treino</Text>
              <Image source={dumbel} style={styles.boxImage} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={() => navigation.navigate('NutricaoPage')} 
            underlayColor={'#855200'} 
            style={styles.boxHighlight}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>Nutrição</Text>
              <Image source={nutricao} style={styles.boxImage} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={() => navigation.navigate('ResultsPage')} 
            underlayColor={'#855200'} 
            style={styles.boxHighlight}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>Evolução</Text>
              <Entypo name="bar-graph" size={125} color="black" />
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={() => navigation.navigate('GoalsPage')} 
            underlayColor={'#855200'} 
            style={styles.boxHighlight}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>Metas</Text>
              <MaterialCommunityIcons name="checkbox-multiple-marked-outline" size={125} color="black" />
            </View>
          </TouchableHighlight>
        </View>
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
  color:{
    backgroundColor: '#fff'
  },
  body: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHighlight: {
    borderRadius: 12,
    margin: 20,
  },
  box: {
    backgroundColor: '#FF9756',
    width: 300,
    height: 150,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 4,
  },
  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  boxImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  footer: {
    width: '100%',
    backgroundColor: '#FFB031',
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
