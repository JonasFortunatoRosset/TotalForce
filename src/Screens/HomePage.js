import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import totalforcelogo from './Images/totalforcelogo.png';
import dumbel from './Images/dumbel.png';
import nutricao from './Images/nutricao.png';
import configuracao from './Images/configuracao.png';
import pagamento from './Images/pagamento.png';

export function HomePage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
        <AntDesign name="user" size={24} color="#000" />
      </View>

      <View style={styles.body}>
        <View style={styles.line}>
          <TouchableHighlight onPress={() => navigation.navigate('TrainPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Treino</Text>
            <Image source={dumbel} style={styles.boxImageTrain}/>
          </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('NutricaoPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Nutrição</Text>
            <Image source={nutricao} style={styles.boxImageNutricao} />
          </View>
          </TouchableHighlight>
        </View>

        <View style={styles.line}>
          <TouchableHighlight onPress={() => navigation.navigate('ConfigPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Configurações</Text>
            <Image source={configuracao} style={styles.boxImageConfig} />
          </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigation.navigate('PaymentPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Pagamento</Text>
            <Image source={pagamento} style={styles.boxImagePagamento} />
          </View>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.footer}>
          <Text>TOTALFORCE</Text>
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
  line: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    gap: 45, 
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
});