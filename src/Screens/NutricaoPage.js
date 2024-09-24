import { StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';



export function NutricaoPage({ navigation }) {

  const[sizeP,setSizeP] = useState(1.8)
  const[sizeCa,setSizeCa] = useState(2)
  const[sizeD,setSizeD] = useState(0.02)
  const [peso, setPeso] = useState('');
  const [resultadoC, setResultadoC] = useState(0);
  const [resultadoP, setResultadoP] = useState(0);
  const [resultadoCa, setResultadoCa] = useState(0);
  const [resultadoD, setResultadoD] = useState(0);


  function calc(vlr) {
    if (!isNaN(vlr)) {
      const resultC = (vlr * 0.03).toFixed(1);
      setResultadoC(resultC);

      const resultP = (vlr * sizeP).toFixed(1);
      setResultadoP(resultP);

      const resultCa = (vlr * sizeCa).toFixed(1);
      setResultadoCa(resultCa);

      const resultD = (vlr * sizeD).toFixed(1);
      setResultadoD(resultD);
    } else {
      setResultadoC(0);
      setResultadoP(0);
      setResultadoCa(0);
      setResultadoD(0);
    }
  }

  
  useEffect(() => {
    const vlr = parseFloat(peso);
    calc(vlr);
  }, [peso]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.seta} underlayColor={null} onPress={() => navigation.navigate('HomePage')}>
          <AntDesign name="arrowleft" size={30} color="black"/>
        </TouchableHighlight>
        <View>
          <Text style={styles.txtheader}>Nutrição</Text>
        </View>
      </View>
      <View style={styles.body}>

        <View style={styles.boxinputpeso}>
          <TextInput
            style={styles.inputpeso}
            placeholder="Digite seu Peso"
            value={peso}
            onChangeText={setPeso}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Creatina</Text>
          <Text style={styles.txtbox}>Peso x 0,03 = C</Text>
          <Text style={styles.txtbox}>{resultadoC}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Proteina</Text>
          <Text style={styles.txtbox}>Peso x {sizeP} = P</Text>
          <Text style={styles.txtbox}>{resultadoP}g</Text>
          <View style={styles.areaslider}>
          <Slider
            style={styles.slide}
            minimumValue={1.8}
            maximumValue={2.2}
            maximumTrackTintColor={null}
            minimumTrackTintColor='#FFB031'
            thumbTintColor='#FFB031'
            value={sizeP}
            onValueChange={(value) => {
              const newValue = value.toFixed(1);
              setSizeP(newValue);
              calc(parseFloat(peso)); 
  }}
/>

          </View>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Carboidratos</Text>
          <Text style={styles.txtbox}>Peso x {sizeCa} = C</Text>
          <Text style={styles.txtbox}>{resultadoCa}g</Text>
          <View style={styles.areaslider}>
            <Slider
            style={styles.slide}
            minimumValue={2}
            maximumValue={6}
            maximumTrackTintColor={null}
            minimumTrackTintColor='#FFB031'
            thumbTintColor='#FFB031'
            value={sizeCa}
            onValueChange={(value) => {
              const newValue = value.toFixed(1);
              setSizeCa(newValue);
              calc(parseFloat(peso)); 
             }}
            />
          </View>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Durateston</Text>
          <Text style={styles.txtbox}>Peso x {sizeD} = D</Text>
          <Text style={styles.txtbox}>{resultadoD}ml</Text>
          <View style={styles.areaslider}>
            <Slider
            style={styles.slide}
            minimumValue={0.02}
            maximumValue={0.04}
            maximumTrackTintColor={null}
            minimumTrackTintColor='#FFB031'
            thumbTintColor='#FFB031'
            value={sizeD}
            onValueChange={(value) => {
              const newValue = value.toFixed(2);
              setSizeD(newValue);
              calc(parseFloat(peso));
            }}
            />
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E49413',
    width: '100%',
  },
  seta: {
    marginRight: 90,
  },
  txtheader: {
    fontSize: 50,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  boxinputpeso: {},
  inputpeso: {
    backgroundColor: '#E49413',
    color: '#000',
    height: 25,
    width: 130,
    margin: 20,
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
    padding: 20,
    backgroundColor: '#E49413',
    width: 220,
    height: 140,
  },
  txtbox: {
    fontSize: 18,
    marginBottom: 2,
  },
  areaslider:{
    marginTop: 4,
    marginBottom: 4,
    width: "80%",
    height: '15%',
    backgroundColor:"#E49413",
    borderRadius: 8,
  },
  slide:{
    width: "100%",   
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
