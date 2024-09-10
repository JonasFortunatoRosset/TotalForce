import { StyleSheet, Text, TextInput, View,TouchableHighlight,ScrollView } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export  function NutricaoPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.seta}  onPress={() => navigation.navigate('HomePage')} >
          <AntDesign  name="arrowleft" size={30} color="black"/>
       </TouchableHighlight>
       <View>
        <Text style={styles.txtheader}>Nutrição</Text>
      </View>
      </View>
      <View style={styles.body}>
        <View style={styles.pesquisa}>
          <Text>Pesquisar</Text>
          <FontAwesome name="search" size={24} color="black" /> 
        </View>
        <View style={styles.boxinputpeso}>
         <TextInput style={styles.inputpeso} placeholder='Digite seu Peso'/>
        </View>
        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Creatina</Text>
          <Text style={styles.txtbox}>Peso x 0,07 = C</Text>
          <Text style={styles.txtbox}>4,2g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Proteina</Text>
          <Text style={styles.txtbox}>Peso x 1,6 a 2,0 = P</Text>
          <Text style={styles.txtbox}>150g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Carboidratos</Text>
          <Text style={styles.txtbox}>Peso x 2 a 4 = C</Text>
          <Text style={styles.txtbox}>220</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Durateston</Text>
          <Text style={styles.txtbox}>Peso x 0,02 = D</Text>
          <Text style={styles.txtbox}>5ml</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#E49413',
    width: '100%',

  },
  seta: {
    marginRight: 130
  },
  txtheader: {
    fontSize: 25,
    fontFamily: '#',
  },
  pesquisa: {
    backgroundColor: '#E49413',
    width: 220,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    padding: 5
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  boxinputpeso: {

  },
  inputpeso: {
    backgroundColor: '#E49413',
    height: 25,
    width: 130,
    borderRadius: 6,
    padding: 3,
  },
  boxnutri: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#E49413',
    width: 220,
    height: 140,

  },
  
  txtbox: {
      fontSize: 18,
  },
});
