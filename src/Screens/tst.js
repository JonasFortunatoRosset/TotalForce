import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export function Teste() {
  // Estado para controlar a visibilidade do modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botão para abrir o modal */}
      <TouchableOpacity 
        style={styles.openButton} 
        onPress={() => setModalVisible(true)}>
        <Text style={styles.txtOpenButton}>Abrir Modal</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.ModalHeader}>
              <Text style={styles.ModalTitle}>Editar Administrador</Text>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.BoxInputs}>
                <TextInput style={styles.input} placeholder="Nome" />
                <TextInput style={styles.input} placeholder="Nome" />
                <TextInput style={styles.input} placeholder="Nome" />
                <TextInput style={styles.input} placeholder="Nome" />
                <TextInput style={styles.input} placeholder="Nome" />
                <TextInput style={styles.input} placeholder="Nome" />
              </View>

              {/* Botões do modal */}
              <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.btns, styles.btnSave]}>
                  <Text style={styles.txtbtns}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btns, styles.btnCancel]}
                  onPress={() => setModalVisible(false)} // Fecha o modal
                >
                  <Text style={styles.txtbtns}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  openButton: {
    backgroundColor: '#E49413',
    padding: 15,
    borderRadius: 8,
  },
  txtOpenButton: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFB031',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ModalHeader: {
    backgroundColor: '#E49413',
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
  input: {
    width: 250,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E49413',
    borderRadius: 8,
    marginVertical: 5,
    color: '#000',
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
    backgroundColor: '#E49413',
  },
  btnCancel: {
    backgroundColor: '#E49413',
  },
});
