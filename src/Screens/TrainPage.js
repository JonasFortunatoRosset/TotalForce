import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRoute } from '../../apiRoute';

export function TrainPage({ navigation }) {
  const [dados, setDados] = useState(null); 
  const [codplano, setCodplano] = useState();

  const Navegacao = (plano) => {     // verificação de navegação

    if(plano.codigo === codplano){
      navigation.navigate('ListaTreinos')
    }
    else{
      Alert.alert("Acesso Negado", "Este plano está bloqueado.");
    }
    
  }

  const carregarPlanos = async () => {   // coleta de todos os dados
    try {
      const codusuario = await AsyncStorage.getItem('codusuario');
      const response = await axios.get(`http://${apiRoute}:3000/pesquisartreinos`, {
        params: { codigo: codusuario }
      });
      setDados(response.data);
      const response2 = await axios.get(`http://${apiRoute}:3000/pesquisarcodplanousuarios`, {
        params: { codigo: codusuario }
      });
      setCodplano(response2.data.codplano);
      console.log('meu codplano: ', )
      console.log('Dados recebidos:', codplano);
      await AsyncStorage.setItem('dadosPlanos', JSON.stringify(response.data));
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
        {dados?.Plano && dados.Plano.map((plano) => (    // Mostar todos os planos
          <View style={styles.planosBody} key={plano.codigo} >
            <TouchableOpacity onPress={() => Navegacao(plano)} style={styles.planoBtn} >
              <Text style={styles.txtPlano}>
                {plano.nome} 
              </Text>
              {plano.codigo !== codplano ? (
                <FontAwesome name="lock" size={45} color="#EA5D04" />  // Exibe cadeado se os códigos forem diferentes
              ) : (
                <FontAwesome name="arrow-right" size={45} color="#EA5D04" /> // Exibe seta se os códigos forem iguais
              )}
            </TouchableOpacity>
          </View>
        ))}
        
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
  planosBody:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planoBtn: {
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  txtPlano: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000',
  },
});
