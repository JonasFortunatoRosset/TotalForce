import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import totalforcelogo from './Images/totalforcelogo.png';


export default function HomePage({Navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
        <AntDesign name="user" size={24} color="white" />
      </View>

      <View style={styles.body}>
        <View style={styles.line}>
          <TouchableHighlight onPress={() => Navigation.navigate('TrainPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Treino</Text>
            <Image source={totalforcelogo} style={styles.boxImage}/>
          </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Navigation.navigate('#')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Nutrição</Text>
            <Image source={totalforcelogo} style={styles.boxImage} />
          </View>
          </TouchableHighlight>
        </View>

        <View style={styles.line}>
          <TouchableHighlight onPress={() => Navigation.navigate('ConfigPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Configurações</Text>
            <EvilIcons name="gear" size={24} color="white" />
          </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => Navigation.navigate('PaymentPage')} underlayColor={'#A6701A'}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Pagamento</Text>
            <Image source={totalforcelogo} style={styles.boxImage} />
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
    backgroundColor: '#fff',
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
    color: '#fff',
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
    gap: 50, 
  },
  box: {
    backgroundColor: '#E49413',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  boxImage: {
    width: 75,
    height: 75,
  },
  footer: {
    width: '100%',
    backgroundColor: '#E49413',
    padding: 15,
    alignItems: 'center',
  },
});