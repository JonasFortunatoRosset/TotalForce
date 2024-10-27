import React, { useState, useEffect } from 'react';
import { Button, View, Text, Platform,Image,StyleSheet,TouchableOpacity } from 'react-native';


export function Teste({navigation}) {
  return(
  <View style={styles.modalContainer}>
  <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>Parabéns</Text>
    <Text style={styles.modalMessage}>
      Seu cadastro foi concluído, aguarde a confirmação de um administrador para poder realizar login.
    </Text>
    <TouchableOpacity
      style={styles.modalButton}
      onPress={() => {
        navigation.navigate('LoginPage');
      }}
    >
      <Text style={styles.modalButtonText}>Entendi!</Text>
    </TouchableOpacity>
  </View>
</View>

)}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFB031',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#E49413',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#000',
    fontSize: 18,
  },
});
