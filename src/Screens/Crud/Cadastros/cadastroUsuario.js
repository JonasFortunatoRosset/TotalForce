import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { apiRoute } from '../../../../apiRoute';

export function CadastroUsuario() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({
    nome: "",
    login: "",
    endereco: "",
    senha: "",
    peso: "",
    altura: "",
    codplano: "",
    status: "Ativo"
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
  
  

  const inserirUsuarios = async () => { 
    if (!usuario.nome || !usuario.login || !usuario.senha || !usuario.codplano) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    console.log("Dados do usuário:", usuario); 
  
    try {
      await axios.post(`http://${apiRoute}:3000/usuarios`, {
        nome: usuario.nome,
        login: usuario.login,
        endereco: usuario.endereco,
        senha: usuario.senha,
        peso: usuario.peso,
        altura: usuario.altura,
        status: usuario.status,
        codplano: parseInt(usuario.codplano, 10), 
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      Alert.alert("Sucesso", "Usuário foi cadastrado");
      setUsuario({
        nome: "",
        login: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: "",
        codplano: "",
        status: "Ativo"
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Cadastro de Usuário</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome"
          value={usuario.nome}
          onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Login"
          value={usuario.login}
          onChangeText={(text) => setUsuario({ ...usuario, login: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Endereço"
          value={usuario.endereco}
          onChangeText={(text) => setUsuario({ ...usuario, endereco: text })}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          value={usuario.senha}
          onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
          secureTextEntry
        />
        <TextInput
          style={styles.inputs}
          placeholder="Peso"
          value={usuario.peso}
          onChangeText={(text) => setUsuario({ ...usuario, peso: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputs}
          placeholder="Altura"
          value={usuario.altura}
          onChangeText={(text) => setUsuario({ ...usuario, altura: text })}
          keyboardType="numeric"
        />
              <Picker
                selectedValue={usuario.status}
                onValueChange={(itemValue) => {
                  setUsuario({ ...usuario, status: itemValue });
                  setStatusModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Ativo" value="Ativo" />
                <Picker.Item label="Inativo" value="Inativo" />
                <Picker.Item label="Em Análise" value="Em Análise" />
                <Picker.Item label="Recusado" value="Recusado" />
              </Picker>

            <Picker
                selectedValue={usuario.codplano}
                onValueChange={(itemValue) => {
                  if (itemValue) {
                    setUsuario({ ...usuario, codplano: parseInt(itemValue, 10) });
                  } else {
                    Alert.alert('Por favor, selecione um plano válido.');
                  }
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {Array.isArray(planos) && planos.length > 0 ? (
                  planos.map((plano) => (
                    <Picker.Item
                      key={plano.codigo}  
                      label={plano.nome || 'Plano sem Nome'}  
                      value={plano.codigo}
                    />
                  ))
                ) : (
                  <Picker.Item label="Nenhum plano disponível" value="" />
                )}
            </Picker>

        <TouchableOpacity style={styles.btn} onPress={inserirUsuarios}>
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