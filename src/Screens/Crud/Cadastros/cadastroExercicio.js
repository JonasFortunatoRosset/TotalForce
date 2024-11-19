import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight, Modal, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

export function CadastroExercicio({ navigation }) {
  const [mediaUri, setMediaUri] = useState(null);
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
    try {
      const response = await axios.get('http://localhost:3000/treinos');
      console.log("Resposta da API:", response.data); 

      if (Array.isArray(response.data)) {
        setTreinos(response.data);
      } else if (Array.isArray(response.data.Treino)) {
        setTreinos(response.data.Treino); 
      } else {
        console.error('A chave "Treinos" não é um array:', response.data);
        Alert.alert('Erro', 'Nenhum treino encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os treinos.');
      console.error(error);
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
    try {
      await axios.post('http://localhost:3000/exercicios', { ...exercicio }, {
        headers: { 'Content-Type': 'application/json' }
      });
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
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
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

            <Picker
              selectedValue={exercicio.codtreino}
              onValueChange={(itemValue) => {
                setExercicio({ ...exercicio, codtreino: itemValue });
                console.log('CodTreino selecionado:', itemValue); 
              }}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um treino" value="" />
              {treinos.length > 0 ? (
                treinos.map((treino) => (
                  <Picker.Item key={treino.codigo} label={treino.nome} value={treino.codigo} />
                ))
              ) : (
                <Picker.Item label="Nenhum treino disponível" value="" />
              )}
            </Picker>



        <TouchableOpacity style={styles.inputpickers} onPress={pickMedia}>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    marginTop: 30,
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FF914C',
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
  },
  inputs: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputpickers: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  picker: {
    width: '100%',
  },
  btn: {
    width: '100%',
    height: 45,
    backgroundColor: '#EA5D04',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtbtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});