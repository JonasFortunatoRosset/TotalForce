import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ConfigPage({Navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <AntDesign name="arrowleft" size={17} color="black" onPress={() => Navigation.navigate('HomePage') }/>
      <Text style={styles.txtheader}> Configurações </Text>
      </View>
      <View style={styles.body}>
      <View style={styles.acessuser}>
      <AntDesign name="user" size={24} color="white" />
      <Text>Usuário</Text>
      <AntDesign name="right" size={24} color="black" />
      </View>
      <View style={styles.configs}>
       <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <Text style={styles.txtconfigs}> Notificações  </Text>
         <Text style={styles.txtconfigs}> Licensas e termos </Text>
        </View>
        <View style={styles.flechaconfigs}>
         <AntDesign name="right" size={14} color="#B0B0B0" />
         <AntDesign name="right" size={14} color="#B0B0B0" />
         <AntDesign name="right" size={14} color="#B0B0B0" />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.boxbtnfooter} onPress={() => Navigation.navigate('LoginPage') }>
            <Text style={styles.txtbtnfooter}> Sair </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-evenly ',
    backgroundColor: '#E49413'
  },
  txtheader: {
    fontSize: 30,
    fontFamily: '#',
  },
  body: {
    backgroundColor: '#FFB031',
    display: 'flex',
    justifyContent: 'center'
  },
  acessuser: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  configs: {
    display: 'flex',
    flexDirection: 'column'
  },
  acessconfig: {
    display: 'flex',
    flexDirection: 'column',
    margin: 3,
    justifyContent:'flex-start'
  },
  txtconfigs: {
      fontSize: 15,
      fontFamily: '#',
      margin: 10,

  },
  flechaconfigs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'flex-end'
  },
  footer: {
    margin: 10
  },
  boxbtnfooter: {
    backgroundColor:'#fff',
    borderRadius: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnfooter: {
    fontSize: 18,
    fontFamily: '#',
    color: '#000' 

  },
});
