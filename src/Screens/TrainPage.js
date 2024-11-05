import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TrainPage({ navigation }) {
  const [data, setData] = useState(null);
  const [codPlano, setCodPlano] = useState(''); 
  const [codUsuario, setCodUsuario] = useState('');

  const carregarPlanos = async () => {
    try {
      // Obtém o codusuario do AsyncStorage
      const storedCodUsuario = await AsyncStorage.getItem('codusuario');
      if (!storedCodUsuario) {
        Alert.alert('Erro', 'Usuário não logado.');
        return;
      }
      setCodUsuario(JSON.parse(storedCodUsuario)); // Armazena o codusuario no estado

      // Faz a requisição para o servidor
      const response = await axios.get(`http://localhost:3000/pesquisartreinos?codigo=${codUsuario}`);
      console.log(response.data);

      if (response.data && response.data.Plano_usuario && response.data.Plano) {
        setData(response.data);
        setCodPlano(response.data.Plano_usuario);

        try {
          await AsyncStorage.setItem('dadosPlanos', JSON.stringify(response.data));
        } catch (storageError) {
          console.error('Erro ao salvar no AsyncStorage:', storageError);
        }
      } else {
        Alert.alert('Erro', 'Estrutura de dados inesperada do servidor.');
      }
    } catch (error) {
      console.error('Erro ao carregar planos:', error);

      const errorMessage = error.response
        ? `Erro ${error.response.status}: ${error.response.statusText || 'Erro desconhecido'}`
        : 'Erro ao conectar com o servidor.';
      Alert.alert('Erro', errorMessage);
    }
  };

  useEffect(() => {
    carregarPlanos();
  }, []);

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
        <Text style={styles.txtheader}>Planos</Text>
      </View>
      <View style={styles.body}>
        {data && data.Plano ? (
          data.Plano.map((i) => (
            <TouchableOpacity
              key={i.nome}
              onPress={() => {
                if (codPlano) {
                  navigation.navigate('ListaTreinos', { codPlano });
                } else {
                  Alert.alert("Erro", "Plano do usuário não carregado.");
                }
              }}
              style={[
                styles.planoButton,
                i.codigo === codPlano ? styles.planoLiberado : styles.planoBloqueado
              ]}
            >
              <Text style={styles.txtPlano}>{i.nome}</Text>
              {i.codigo !== codPlano && (
                <MaterialCommunityIcons
                  name="lock"
                  size={24}
                  color="black"
                  style={styles.cadeado}
                />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text>Carregando planos...</Text>
        )}
      </View>
    </View>
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
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  planoButton: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF9756',
    elevation: 4,
  },
  planoLiberado: {
    backgroundColor: '#FF9756',
  },
  planoBloqueado: {
    backgroundColor: '#EA5D04',
  },
  txtPlano: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  cadeado: {
    marginLeft: 10,
  },
});
