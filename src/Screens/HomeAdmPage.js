import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
              <Feather name="credit-card" size={130} color="#000" />
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('VerGeral')} underlayColor={null} style={styles.boxHighlight}>
            <View style={styles.box}>
              <View style={styles.txtbox}>
                <Text style={styles.boxText}>Visualizar</Text>
                <Text style={styles.boxText}>Cadastros</Text>
              </View>
              <Entypo name="eye" size={130} color="#000" />
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('ConfigPage')} underlayColor={null} style={styles.boxHighlight}>
            <View style={styles.box}>
              <View style={styles.txtbox}>
                <Text style={styles.boxText}>Configurações</Text>
              </View>
              <FontAwesome name="gear" size={130} color="#000" />
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
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
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
    backgroundColor: '#FF9756',
    width: '100%',
    height: 200,
    borderRadius: 18,
    padding: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
});
