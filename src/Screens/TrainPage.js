import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TrainPage({ navigation }) {
  const [dados, setDados] = useState(null);
  const [planos, setPlanos] = useState([])
  const [codPlano, setCodPlano] = useState(''); 


  const Navegação = (plano) => {     // verificação de navegação

    if(plano.codigo === codPlano){
      navigation.navigate('ListaTreinos',{codPlano})
    }
    else{
      Alert.alert("Acesso Negado", "Este plano está bloqueado.");
    }

  }

  const carregarPlanos = async () => {   // coleta de todos os dados
    try {
      const response = await axios.get('http://localhost:3000/pesquisartreinos');
      console.log('Dados recebidos:', response.data);
      setDados(response.data);

      const planosRecebidos = response.data.Plano;
      console.log('Planos armazenados:', planosRecebidos); 
      setPlanos(planosRecebidos);

      const planoUsuario = response.data.Plano_usuario;
      console.log('Plano do usuário:', planoUsuario);
      setCodPlano(planoUsuario); 

      await AsyncStorage.setItem('dadosPlanos', JSON.stringify(response.data));
      console.log('Dados salvos no AsyncStorage');
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

        {planos && planos.map((plano) => (    // Mostar todos os planos
          <View key={plano.codigo} >
            <TouchableOpacity onPress={() => Navegação(plano)} style={styles.planoBtn} >
              <Text>
                {plano.nome} 
              </Text>
              {plano.codigo !== codPlano && (
                 <Icon name="lock" size={25} color="#EA5D04" />  // Ícone de cadeado exibido se os códigos forem diferentes
              ) }
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
  planoBtn: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
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
