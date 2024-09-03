import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export function TrainPage(navigation) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <AntDesign name="arrowleft" size={17} color="black" onPress={() => navigation.navigate('HomePage') }/>
        <Text style={styles.txtheader}>TREINOS</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txttopo}>Meu Treino</Text>
        <TouchableOpacity style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}>Novo Treino</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.txtfooter}> Navegação entre telas </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
      display: 'flex',
      justifyContent: 'space-evenly',
      margin: 10,
      backgroundColor: '#E49413'
  },
  txtheader: {
    fontSize: 50,
    fontFamily: '#',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 5,
  },
  txttopo: {
    fontSize: 15,
    fontFamily: '#',
  },
  boxnovotreino: {
    borderRadius: 6,
    backgroundColor: '#E49413',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  txtnovotreino: {
    fontSize: 25,
    fontFamily: '#',
  },
  footer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E49413',
  },
  txtfooter: {
    fontSize: 25,
    fontFamily: '#',
  },
});
