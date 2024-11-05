import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LineChart } from 'react-native-chart-kit';

export function ResultsPage({ navigation }) {
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [50, 55, 60, 70, 75, 85], // Valores ajustados para um gráfico crescente
        strokeWidth: 4, // Largura da linha
        color: (opacity = 1) => `rgba(72, 61, 139, ${opacity})`, // Cor da linha
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FF9756',
    backgroundGradientFrom: '#FF9756',
    backgroundGradientTo: '#FF9756',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor dos eixos
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor dos rótulos
    style: { borderRadius: 16 },
    propsForDots: {
      r: '4', // Raio dos pontos
      strokeWidth: '2',
      stroke: '#483D8B',
    },
    propsForBackgroundLines: {
      stroke: 'rgba(0,0,0,0.1)',
    },
  };

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
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 20}
          height={300}
          yAxisSuffix="kg"
          chartConfig={chartConfig}
          bezier={false} // Muda para um gráfico linear
          style={styles.graph}
        />
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
    backgroundColor: '#fff', // Fundo sutil para destacar o gráfico
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
});
