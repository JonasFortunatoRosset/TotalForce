import { 
  StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight, Modal, Pressable 
} from 'react-native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export function NutricaoPage({ navigation }) {
  const [peso, setPeso] = useState('');
  const [resultadoC, setResultadoC] = useState(0);
  const [resultadoP, setResultadoP] = useState(0);
  const [resultadoCa, setResultadoCa] = useState(0);
  const [resultadoF, setResultadoF] = useState(0);  
  const [resultadoA, setResultadoA] = useState(0);  
  const [modalVisible, setModalVisible] = useState(false);

  function calc(vlr) {
    if (!isNaN(vlr)) {
      setResultadoC((vlr * 0.03).toFixed(1));  
      setResultadoP((vlr * 1.4).toFixed(1));   
      setResultadoCa((vlr * 4).toFixed(1));   
      setResultadoF((vlr * 0.025).toFixed(1)); 
      setResultadoA((vlr * 35).toFixed(1));    
    } else {
      setResultadoC(0);
      setResultadoP(0);
      setResultadoCa(0);
      setResultadoF(0);
      setResultadoA(0);
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
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Nutrição</Text>
        <TouchableHighlight underlayColor={null} onPress={() => setModalVisible(true)} style={styles.infoIcon}>
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
            keyboardType="numeric"
          />
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Creatina</Text>
          <Text style={styles.txtbox}>Peso x 0,03 = {resultadoC}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Proteína</Text>
          <Text style={styles.txtbox}>Peso x 1,4 = {resultadoP}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Carboidratos</Text>
          <Text style={styles.txtbox}>Peso x 4 = {resultadoCa}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Fibras</Text>
          <Text style={styles.txtbox}>Peso x 0,025 = {resultadoF}g</Text>
        </View>

        <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>Água</Text>
          <Text style={styles.txtbox}>Peso x 35 = {resultadoA}ml</Text>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="slide">
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9756',
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
    width: 280,
    alignItems: 'center',
    marginBottom: 25,
  },
  inputpeso: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9756',
    color: '#000',
    fontSize: 18,
    borderRadius: 10,
    padding: 12,
    textAlign: 'center',
    fontWeight: '600',
    elevation: 2,
  },
  boxnutri: {
    width: 280,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#FF9756',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  txtbox: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
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
    backgroundColor: '#FF9756',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
