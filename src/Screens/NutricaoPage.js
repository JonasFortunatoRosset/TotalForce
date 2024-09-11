import { StyleSheet, Text, TextInput, View,TouchableHighlight,ScrollView,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export  function NutricaoPage() {

  const[peso,setPeso] = useState('')
  const[resultadoC,setResultadoC] = useState(0)
  const[resultadoP,setResultadoP] = useState(0)
  const[resultadoCa,setResultadoCa] = useState(0)
  const[resultadoD,setResultadoD] = useState(0) 
  
  function calc(){
    
    const vlr = parseInt(peso)

    if (!isNaN(vlr)){
      const resultC = (vlr * 0.07).toFixed(1)
      setResultadoC(resultC)

      const resultP = (vlr * 2).toFixed(1)
      setResultadoP(resultP)

      const resultCa = (vlr * 4).toFixed(1)
      setResultadoCa(resultCa)

      const resultD = (vlr * 0.02).toFixed(1)
      setResultadoD(resultD)
    }

    else {
      setResultadoC(0)
      setResultadoP(0)
      setResultadoCa(0)
      setResultadoD(0)
    }
  }

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
        <TouchableOpacity onPress={calc} style={styles.boxbtn}>
         <Text> Calcular </Text>
       </TouchableOpacity>
        <View style={styles.boxinputpeso}>
    
         <TextInput style={styles.inputpeso} 
         placeholder='Digite seu Peso'
         value={peso}
         onChangeText={setPeso}
         />

        </View>
        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Creatina</Text>
          <Text style={styles.txtbox}>Peso x 0,07 = C</Text>
          <Text style={styles.txtbox}>{resultadoC}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Proteina</Text>
          <Text style={styles.txtbox}>Peso x 1,6 a 2,0 = P</Text>
          <Text style={styles.txtbox}>{resultadoP}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Carboidratos</Text>
          <Text style={styles.txtbox}>Peso x 2 a 4 = C</Text>
          <Text style={styles.txtbox}>{resultadoCa}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Durateston</Text>
          <Text style={styles.txtbox}>Peso x 0,02 = D</Text>
          <Text style={styles.txtbox}>{resultadoD}ml</Text>
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
  boxbtn:{
    backgroundColor: '#E49413',
    width: 80,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  }
});
