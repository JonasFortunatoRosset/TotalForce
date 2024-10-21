import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export function CadastroExercicio() {
  const [mediaUri, setMediaUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [treinos, setTreinos] = useState([]); 
  const [exercicio, setExercicio] = useState({
    nome: '',
    descricao: '',
    serie: '',
    repeticoes: '',
    codtreino: '',
    video: '',
  });

  useEffect(() => {
    requestPermission();
    fetchTreinos(); 
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Erro', 'Precisamos de permissão para acessar a galeria.');
      }
    }
  };

  const fetchTreinos = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/treinos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreinos(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os treinos.');
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setMediaUri(uri);
      convertMediaToBase64(uri);
    }
  };

  const convertMediaToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setExercicio((prev) => ({ ...prev, video: base64 }));
    } catch (error) {
      console.error('Erro ao converter vídeo:', error);
    }
  };

  const inserirExercicio = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/exercicios',
        { ...exercicio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Alert.alert('Sucesso', 'Exercício cadastrado com sucesso!');
      setExercicio({
        nome: '',
        descricao: '',
        serie: '',
        repeticoes: '',
        codtreino: '',
        video: '',
      });
      setMediaUri(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o exercício.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>Cadastro de Exercício</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome do Exercício"
          value={exercicio.nome}
          onChangeText={(text) => setExercicio({ ...exercicio, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Descrição"
          value={exercicio.descricao}
          onChangeText={(text) => setExercicio({ ...exercicio, descricao: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Séries"
          value={exercicio.serie}
          onChangeText={(text) => setExercicio({ ...exercicio, serie: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.inputs}
          placeholder="Repetições"
          value={exercicio.repeticoes}
          onChangeText={(text) => setExercicio({ ...exercicio, repeticoes: text })}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.inputs} onPress={() => setModalVisible(true)}>
          <Text style={styles.placeholderText}>
            {exercicio.codtreino ? `Treino: ${exercicio.codtreino}` : 'Selecionar Treino'}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={exercicio.codtreino}
                onValueChange={(itemValue) => {
                  setExercicio({ ...exercicio, codtreino: itemValue });
                  setModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um treino" value="" />
                {treinos.map((treino) => (
                  <Picker.Item
                    key={treino.id}
                    label={treino.nome}
                    value={treino.codtreino}
                  />
                ))}
              </Picker>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.inputs} onPress={pickMedia}>
          <Text style={styles.placeholderText}>
            {mediaUri ? 'Vídeo selecionado' : 'Selecionar Vídeo'}
          </Text>
        </TouchableOpacity>

        {mediaUri && (
          <Video
            source={{ uri: mediaUri }}
            style={{ width: 140, height: 140, margin: 20 }}
            useNativeControls
            resizeMode="contain"
          />
        )}

        <TouchableOpacity style={styles.btn} onPress={inserirExercicio}>
          <Text style={styles.txtbtn}>Cadastrar</Text>
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
    backgroundColor: '#E49413',
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtheader: {
    fontSize: 20,
  },
  body: {
    backgroundColor: '#E49413',
    height: '80%',
    margin: 20,
    padding: 15,
    alignItems: 'center',
  },
  inputs: {
    color: '#000',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: 300,
    height: 45,
    padding: 10,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  picker: {
    height: 150,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFB031',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFB031',
    width: 300,
    height: 45,
  },
  txtbtn: {
    color: '#000',
    fontSize: 20,
  },
});