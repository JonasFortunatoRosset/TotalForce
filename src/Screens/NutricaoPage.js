import { StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight,Modal,Pressable } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);


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
        <TouchableHighlight 
          underlayColor={null} 
          onPress={() => setModalVisible(true)} 
          style={styles.infoIcon}
        >
          <AntDesign name="infocirlceo" size={30} color="black" />
        </TouchableHighlight>
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
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
            Todos os cálculos são baseados em artigos científicos para assegurar a precisão.
             No entanto, esses valores servem apenas como referência inicial. 
             Para uma alimentação adequada e personalizada, é recomendável buscar a orientação de um profissional de saúde.
            </Text>
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E49413',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
  },
  seta: {
    marginRight: 15,
  },
  infoIcon: {
    marginLeft: 'auto',
  },
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    alignItems: 'center',
  },
  boxinputpeso: {
    width: 220,
    alignItems: 'center',
    marginBottom: 25,
  },
  inputpeso: {
    width: '100%',
    height: 50,
    backgroundColor: '#E49413',
    color: '#000',
    fontSize: 18,
    borderRadius: 10,
    padding: 12,
    textAlign: 'center',
    fontWeight: '600',
    elevation: 2,
  },
  boxnutri: {
    width: 220,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#E49413',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  txtbox: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  areaslider: {
    marginTop: 10,
    width: '100%',
  },
  slide: {
    width: '100%',
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFB031',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#E49413',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
