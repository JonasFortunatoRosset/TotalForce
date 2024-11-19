import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Modal,TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

export function Teste({navigation}) {
  const [isModalVisible, setISModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setISModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    Alert.alert(
        "Confirmação de Exclusão",
        "Tem certeza de que deseja excluir este treino?",
        [
            { text: "Cancelar", style: "cancel" },
            { text: "Excluir", style: "destructive", onPress: async () => {
                try {
                    Alert.alert("Sucesso", "Treino excluído com sucesso!");
                } catch (error) {
                    Alert.alert("Erro", "Não foi possível excluir o treino.");
                }
            }}
        ]
    );
};

const handleEdit = () => {
  setModalVisible(true);
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.navigate('HomePage')}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Gets</Text>
      </View>

      <View style={styles.body}>

        <TouchableOpacity
          style={styles.planoButton}
        >
          <Text style={styles.txtPlano}>Supinera</Text>
          <TextInput
            style={styles.inputs}
            placeholder=""
            keyboardType='numeric'
            maxLength={4}
          >
          </TextInput>
        </TouchableOpacity>


        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                <AntDesign name="close" size={24} color="#EB6808" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Detalhes do Exercício</Text>
              <Text style={styles.modalText}>Código: 1234</Text>
              <Text style={styles.modalText}>Nome: Exercício A</Text>
              <Text style={styles.modalText}>Descrição: Exercício de exemplo</Text>
              <Text style={styles.modalText}>Séries: 3</Text>
              <Text style={styles.modalText}>Repetições: 12</Text>
              <Text style={styles.modalText}>Código do treino: T001</Text>

              <View style={styles.icons}>
                                <TouchableOpacity onPress={() => handleDelete()}>
                                    <Feather name="trash-2" size={40} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleEdit()}>
                                    <FontAwesome name="pencil" size={40} color="black" />
                                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.ModalHeader}>
                            <Text style={styles.ModalTitle}>Editar Treino</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.BoxInputs}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Código"
                                    value={0}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={0}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Descrição"
                                    value={0}
                                />

              <Picker
                selectedValue={0}
                onValueChange={(itemValue) => {
                  setTreino({ ...treino, codplano: parseInt(itemValue) });
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                    <Picker.Item key={0} label={"oiiii"} value={1} />
  
                  <Picker.Item label="Nenhum plano disponível" value="" />

              </Picker>

                            </View>

                            <View style={styles.btnContainer}>
                                
                                <TouchableOpacity
                                    style={[styles.btns, styles.btnCancel]}
                                    onPress={() => { setModalVisible(false); }}>
                                    <Text style={styles.txtbtns}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.btns, styles.btnSave]}  onPress={() => { setModalVisible(false); }}>
                                    <Text style={styles.txtbtns}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dados: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
},
  itemContainer: {
    marginBottom: 20,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  ModalTitle: {
    fontSize: 20,
    color: '#000',
},
closeIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 1, 
},
modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
ModalHeader: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
},
modalBody: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
},
ModalTitle: {
    fontSize: 20,
    color: '#000',
},
BoxInputs: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
},
picker: {
  height: '10%',
  width: '100%',
  color:'#000'
},
input: {
    width: 250,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffff',
    borderRadius: 8,
    marginVertical: 5,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
},
btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
},
btns: {
    width: '48%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
},
txtbtns: {
    color: '#000',
    fontSize: 16,
},
btnSave: {
    backgroundColor: '#EA5D04',
},
btnCancel: {
    backgroundColor: '#EA5D04',
},
planoButton: {
  width: '80%',
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginVertical: 10,
  borderRadius: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  alignSelf: 'center',
},
txtPlano: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#000',
},
inputs:{
  backgroundColor:"#EA5D04",
  width: '18%',
  height: '100%',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',

}
});
