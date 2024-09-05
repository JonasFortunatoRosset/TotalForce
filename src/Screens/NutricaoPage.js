import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const[peso,Setpeso] = useState('')

function calcnutri(){

   Creatina = peso * 0.07
   Proteina = peso * 1.6
   Carbo = peso * 2
     Durateston = peso * 0.02 
}

export  function NutricaoPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.seta}  onPress={() => navigation.navigate('HomePage')} >
          <AntDesign  name="arrowleft" size={30} color="black"/>
       </TouchableHighlight>
       <View>
        <Text style={styles.txtheader}>Nutrição</Text>
      </View>
      </View>
      <View style={styles.body}>
        <View styles={styles.barradepesquiza}>
          <Text>Pesquisar</Text>
          <FontAwesome name="search" size={24} color="black" /> 
        </View>
        <View style={styles.boxinputpeso}>
         <TextInput style={styles.inputpeso} placeholder='Digite seu Peso' value={peso} onChangeText={Nutri => Setpeso(Nutri)}/>
        </View>
        <View style={styles.boxnutri}>
          <Text>Creatina</Text>
          <Text>Peso x 0,07 = C</Text>
          <Text>{Creatina}</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text>Proteina</Text>
          <Text>Peso x 1,6 a 2,0 = C</Text>
          <Text>{Proteina}</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text>Carboidratos</Text>
          <Text>Peso x 2 a 4 = C</Text>
          <Text>{Carbo}</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text>Durateston</Text>
          <Text>Peso x 0,02 = D</Text>
          <Text>{Durateston}</Text>
        </View>

        <TouchableOpacity style={styles.btncalc} onPress={calcnutri}>
          <Text>Calcule</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginRight: 82
  },
  txtheader: {
    fontSize: 25,
    fontFamily: '#',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  barradepesquiza: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    margin: 10,
    backgroundColor: '#E49413'
  },
  boxinputpeso: {

  },
  inputpeso: {
    backgroundColor: '#E49413',
    height: 20,
    width: 20,
  },
  boxnutri: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,

  },
  btncalc: {
      backgroundColor: '#E49413',
      borderRadius: 12,
  },
});
