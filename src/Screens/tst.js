import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function Teste({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.navigate('HomePage')}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Planos</Text>
      </View>
      <View style={styles.body}>

          <View style={styles.planosBody}  >
            <TouchableOpacity style={styles.planoBtn} >
              <Text style={styles.txtPlano}>
                 Plano1 
              </Text>
              <FontAwesome name="arrow-right" size={45} color="#EA5D04" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.planoBtn} >
              <Text style={styles.txtPlano}>
                 Plano2 
              </Text>
              <FontAwesome name="lock" size={45} color="#EA5D04" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.planoBtn} >
              <Text style={styles.txtPlano}>
                 Plano3
              </Text>
              <FontAwesome name="lock" size={45} color="#EA5D04" />
            </TouchableOpacity>
          </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  planosBody:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planoBtn: {
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  txtPlano: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000',
  },
});
