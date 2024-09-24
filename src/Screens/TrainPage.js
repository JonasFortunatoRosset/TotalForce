import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export function TrainPage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.seta}  underlayColor={null}  onPress={() => navigation.navigate('HomePage')} >
          <AntDesign  name="arrowleft" size={30} color="black"/>
       </TouchableHighlight>
       <View>
        <Text style={styles.txtheader}>TREINOS</Text>
      </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}> Costas </Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}> Peito </Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}> Triceps </Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}> Biceps </Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}> Ombro </Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.boxnovotreino}>
          <Text style={styles.txtnovotreino}> Perna </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#E49413',
  },
  seta: {
    marginRight: 82
  },

  txtheader: {
    fontSize: 50,
    fontFamily: '#',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,

  },
  boxnovotreino: {
    borderRadius: 6,
    backgroundColor: '#E49413',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    width: 150,
    height: 60,
    margin: 15,
  },
  txtnovotreino: {
    fontSize: 25,
    fontFamily: '#',
  },
  footer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 43,
    backgroundColor: '#E49413',
  },
  txtfooter: {
    fontSize: 25,
    fontFamily: '#',
  },
});
