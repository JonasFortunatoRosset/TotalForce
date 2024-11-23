import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { apiRoute } from '../../../../apiRoute';

export function CadastroTreino() {
  const navigation = useNavigation();
  const [treino, setTreino] = useState({
    nome: '',
    descricao: '',
    codplano: '',
  });

  const [planos, setPlanos] = useState([]); 

  useEffect(() => {
    fetchPlanos();
  }, []);

  const fetchPlanos = async () => {
    try {
      const response = await axios.get(`http://${apiRoute}:3000/planos`);
      console.log("Resposta da API:", response.data); 

   
      if (Array.isArray(response.data)) {
        setPlanos(response.data);
      } else if (Array.isArray(response.data.Planos)) {
        setPlanos(response.data.Planos); 
      } else {
        console.error('A chave "Planos" não é um array:', response.data);
        Alert.alert('Erro', 'Nenhum plano encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
      console.error(error);
    }
  };

  const inserirTreino = async () => {
    try {
      await axios.post(`http://${apiRoute}:3000/treinos`, {
        nome: treino.nome,
        descricao: treino.descricao,
        codplano: treino.codplano,
      });
      Alert.alert('Sucesso', 'Treino cadastrado com sucesso!');
      setTreino({ nome: '', descricao: '', codplano: '' });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o treino.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Cadastro de Treinos</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome do Treino"
          value={treino.nome}
          onChangeText={(text) => setTreino({ ...treino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Descrição"
          value={treino.descricao}
          onChangeText={(text) => setTreino({ ...treino, descricao: text })}
        />
        
              <Picker
                selectedValue={treino.codplano}
                onValueChange={(itemValue) => {
                  setTreino({ ...treino, codplano: parseInt(itemValue) });
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {Array.isArray(planos) && planos.length > 0 ? (
                  planos.map((plano) => (
                    <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
                  ))
                ) : (
                  <Picker.Item label="Nenhum plano disponível" value="" />
                )}
              </Picker>



        <TouchableOpacity style={styles.btn} onPress={inserirTreino}>
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
  backButton: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
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
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  picker: {
    height: '10%',
    width: '100%',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
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
