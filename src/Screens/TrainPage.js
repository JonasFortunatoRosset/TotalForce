import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TrainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [codplanoUsuario, setCodplanoUsuario] = useState(null);

  const carregarPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pesquisartreinos');
      setData(response.data);
      
      // Armazenando dados no AsyncStorage 
      await AsyncStorage.setItem('planosData', JSON.stringify(response.data));
      
      // Pegando o plano do usuário
        setCodplanoUsuario(response.data.Plano_usuario);

    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
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
        {data.Plano &&
          data.Plano.map((i) => (
            <TouchableOpacity
              key={i.codigo}
              onPress={() => {
                if (i.codigo === codplanoUsuario) {
                  navigation.navigate('ListaTreinos', { codplano: i.codigo });  // verificação para a navegação e passando codplano para a próxima página
                } else {
                  Alert.alert('Acesso restrito', 'Este plano está bloqueado.');
                }
              }}
              style={[
                styles.planoContainer,
                i.codigo === codplanoUsuario ? styles.planoLiberado : styles.planoBloqueado, // verificação para os estilos do botão
              ]}
            >
              <Text style={styles.txtPlano}>{i.nome}</Text>
              {i.codigo !== codplanoUsuario && (
                <MaterialCommunityIcons name="lock" size={24} color="black" style={styles.cadeado} /> // verificação para a adicão do cadeado
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
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
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFB031',
  },
  planoContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E49413',
    elevation: 4,
  },
  planoLiberado: {
    backgroundColor: '#E49413',
  },
  planoBloqueado: {
    backgroundColor: '#855200',
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
