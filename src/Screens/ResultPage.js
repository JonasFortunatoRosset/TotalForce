import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { apiRoute } from '../../../../apiRoute';

export function ResultsPage({ navigation }) {
  const [dados, setDados] = useState([]);
  const [codplano, setCodplano] = useState(null);
  const [codUser, setCodUser] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const carregarParametros = async () => {
      try {
        const codusuario = await AsyncStorage.getItem('codusuario');
        if (!codusuario) {
          throw new Error('Código do usuário não encontrado.');
        }

        const response = await axios.get(`http://${apiRoute}:3000/pesquisarcodplanousuarios`, {
          params: { codigo: codusuario },
        });

        if (response.data?.codplano) {
          setCodplano(response.data.codplano);
          setCodUser(codusuario);
        } else {
          throw new Error('Plano não encontrado para o usuário.');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
        Alert.alert('Erro', error.message);
      }
    };

    carregarParametros();
  }, []);

  useEffect(() => {
    const fetchResultados = async () => {
      if (!codUser || !codplano) return;

      try {
        const response = await axios.post(
          `http://${apiRoute}:3000/pesquisarResultadoUsuario`,
          null,
          { params: { codigo: codUser, codplano } }
        );

        if (response.data) {
          setDados(response.data);
        } else {
          Alert.alert('Aviso', 'Nenhum resultado encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar resultados:', error.message);
        Alert.alert('Erro', 'Não foi possível carregar os resultados.');
      }
    };

    fetchResultados();
  }, [codUser, codplano]);

  const formatarDadosParaGrafico = () => {
    if (!dados || Object.keys(dados).length === 0) {
      return { labels: [], datasets: [] };
    }

    const labels = Object.keys(dados).map((_, index) => `Treino ${index + 1}`);
    const valores = Object.values(dados).map(
      (item) => item[0]?.valorTreino || 0
    );

    return {
      labels,
      datasets: [
        {
          data: valores,
          color: (opacity = 1) => `rgba(234, 93, 4, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  const dadosGrafico = formatarDadosParaGrafico();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          onPress={() => navigation.navigate('HomePage')}
          underlayColor={null}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Resultados</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.txtGraphTitle}>Progresso de Carga</Text>
        {dadosGrafico.labels.length > 0 ? (
          <LineChart
            data={dadosGrafico}
            width={screenWidth - 20}
            height={300}
            yAxisSuffix="kg"
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(234, 93, 4, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#EA5D04',
              },
            }}
            bezier
            style={styles.graph}
          />
        ) : (
          <Text style={styles.noDataText}>Nenhum dado disponível para exibir.</Text>
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
    marginBottom: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  txtGraphTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  graph: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
