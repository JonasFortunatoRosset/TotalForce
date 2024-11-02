import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function TrainPage({ navigation }) {
  const [data, setData] = useState([]);   // dados 
  const codplano = `plano ${data.Plano_usuario}`; // Código do plano do usuário
  
  const carregarPlanos = async () => {
    try {  
        const response = await axios.get('http://localhost:3000/pesquisartreinos',);

        console.log(response.data)
        setData(response.data);
        await AsyncStorage.setItem(data)
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
    }
  };

  useEffect(() => {
    VerificaçãoPlanoUsuario();
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
      <TouchableOpacity onPress={() => navigation.navigate('ListaTreinos',{codplano})} style={styles.planoButton}>
        {data.Plano !== undefined     //mapeação dos planos 
          ? data.Plano.map((i) => (

              <View style={styles.planoContainer}>
                <Text style={styles.txtPlano} key={i.nome} >{i.nome}</Text>    {/*renderização dos planos */}
                 {i.codigo !== codplano && (     
                  <MaterialCommunityIcons
                    name="lock"
                    size={24}
                    color="black"
                    style={styles.cadeado}
                  />
                )}      {/*Verificação dos planos */}  
              </View>
            ))
          : null}
      </TouchableOpacity>

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
  planoButton: {
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
