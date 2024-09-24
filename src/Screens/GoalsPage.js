import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export  function GoalsPage({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.seta} underlayColor={null} onPress={() => navigation.navigate('HomePage')}>
          <AntDesign name="arrowleft" size={30} color="black"/>
        </TouchableHighlight>
        <View>
          <Text style={styles.txtheader}>Metas</Text>
     </View>
      </View>

    <View style={styles.body}>
     <View style={styles.boxnutri}>
          <Text style={styles.txtbox}>200 Kg</Text>
          <Text style={styles.txtbox}>Leg Press</Text>
          <Text style={styles.txtbox}></Text>
      </View>
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E49413',
    width: '100%',
  },
  seta: {
    marginRight: '27%',
  },
  txtheader: {
    fontSize: 50,
  },
  body:{ 
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  },
  boxnutri: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#E49413',
    width: 220,
    height: 110,
  },
  txtbox: {
    fontSize: 18,
    marginBottom: 2,
  },
});
