import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export function HomeAdmPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
      </View>

      <View style={styles.body}>
          <TouchableHighlight onPress={() => navigation.navigate('CadastroGeral')} underlayColor={null} style={styles.boxHighlight}>
            <View style={styles.box}>
              <Text style={styles.boxText}>Cadastrar</Text>
              <Feather name="credit-card" size={130} color="#FF914C" />
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('VerGeral')} underlayColor={null} style={styles.boxHighlight}>
            <View style={styles.box}>
              <View style={styles.txtbox}>
                <Text style={styles.boxText}>Visualizar</Text>
                <Text style={styles.boxText}>Cadastros</Text>
              </View>
              <Entypo name="eye" size={130} color="#FF914C" />
            </View>
          </TouchableHighlight>
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
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  boxHighlight: {
    width: '80%',
    borderRadius: 12,
    marginVertical: 30,
  },
  box: {
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
    borderRadius: 18,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  boxText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
});
