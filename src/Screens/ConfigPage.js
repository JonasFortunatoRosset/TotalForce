import { StyleSheet, Text, View, TouchableOpacity,TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export  function ConfigPage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <TouchableHighlight style={styles.seta}  onPress={() => navigation.navigate('HomePage')} underlayColor={null}>
        <AntDesign name="arrowleft" size={30} color="black"/>
       </TouchableHighlight>  
      
      <Text style={styles.txtheader}> Configurações </Text> 
      </View>
      <View style={styles.body}>
      <View style={styles.acessuser}>
       <View style={styles.user}>
       <EvilIcons name="user" size={45} color="black" />
        <Text>Fulano</Text>
       </View>
      <AntDesign name="right" size={24} color="black" />
      </View>
      <View style={styles.configs}>
       <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
         <AntDesign name="right" size={14} color="#000" />
       </View>
       </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
         <AntDesign name="right" size={14} color="#000" />
        </View>
        </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
         <AntDesign name="right" size={14} color="#000" />
        </View>
        </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
          <AntDesign name="right" size={14} color="#000" />
         </View>
        </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
          <AntDesign name="right" size={14} color="#000" />
         </View>
        </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
         <AntDesign name="right" size={14} color="#000" />
        </View>
        </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
         <AntDesign name="right" size={14} color="#000" />
        </View>
        </View>

        <View style={styles.acessconfig}>
         <Text style={styles.txtconfigs}> Mudar Tema </Text>
         <View style={styles.configseta}>
         <AntDesign name="right" size={14} color="#000" />
        </View>
        </View>
      </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.boxbtnfooter} onPress={() => navigation.navigate('LoginPage') }>
            <Text style={styles.txtbtnfooter}> Sair </Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#E49413',
    height: '6%',
  },
  txtheader: {
    fontSize: 20,
    fontFamily: '#',
  },
  seta: {
    marginRight: 110
  },
  body: {
    backgroundColor: '#FFB031',
    justifyContent: 'center'
  },
  acessuser: {
    marginT: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  user:{
    justifyContent:'center',
    alignItems: 'center',
    padding: 7,
    marginRight: 310,
  },
  configseta:{
    marginLeft: 270,
  },
  configs: {
    flexDirection: 'column'
  },
  acessconfig: {
    flexDirection: 'row',
    margin: 3,
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  txtconfigs: {
      fontSize: 15,
      fontFamily: '#',
      margin: 10,

  },
  flechaconfigs: {
    flexDirection: 'column',
    justifyContent:'flex-end'
  },
  footer: {
    margin: 10,
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
  },
  boxbtnfooter: {
    backgroundColor:'#fff',
    borderRadius: 22,
    height: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnfooter: {
    fontSize: 18,
    fontFamily: '#',
    color: '#000' 

  },
});
