import { StyleSheet, Text, View, TextInput, Alert,TouchableOpacity, FlatList,Modal } from 'react-native';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';


export  function VerUsuario(){
    const[editarUsuario,setEditarUsuario] = (null)
    const[modalVisible,setModalVisible] = useState(false)
    const [usuario, setUsuario] = useState([])
    const[usuariosData,setUsuariosData] = useState({
      codigo: "",
      nome: "",
      cpf: "",
      endereco: "",
      cidade: "",
      senha: "",
      peso: "",
      altura: ""
    })


      useEffect(() => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
              setUsuario(response.data.usuario);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const Editar = (usuario) => {
      setFormData(usuario);
      setEditarUsuario(usuario.codigo);
      setModalVisible(true);
  };

    const Alterar = () => {
      axios.put(`http://localhost:3000/usuarios`, usuariosData, {
        params: { codigo: usuariosData.codigo }
    })
    .then(response => {
        setUsuario(alimentos.map(alimento => alimento.codigo === usuariosData.codigo ? usuariosData : alimento));
        setUsuariosData({codigo: "",nome: "",cpf: "",endereco: "",cidade: "",senha: "",peso: "",altura: "" });
        setModalVisible(false);
    })
    .catch(error => {
        console.error('Erro ao atualizar funcionário:', error);
    });
    }

    const Deletar = () => {
      axios.delete('http://localhost:3000/usuarios', { params: { codigo } })
      .then(response => {
        setUsuario(usuario.filter(usuario => usuario.codigo !== codigo));
      })
      .catch(error => {
          console.error('Erro ao deletar usuario:', error);
      });
    }

    return(
        <View style={styles.container}>
         <View style={styles.header}> 
            <Text style={styles.txtheader}>Pesquisa de Usuário</Text>
         </View>

            <View style={styles.body}>
            <FlatList
                data={usuario}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <View style={styles.dados}>
                        <Text style={styles.itemText}>Código: {item.codigo}</Text>
                        <Text style={styles.itemText}>Nome: {item.nome}</Text>
                        <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                        <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
                        <Text style={styles.itemText}>Cidade: {item.cidade}</Text>
                        <Text style={styles.itemText}>Senha: {item.senha}</Text>
                        <Text style={styles.itemText}>Peso: {item.peso}</Text>
                        <Text style={styles.itemText}>Altura: {item.altura}</Text>
                      </View>
                      <View style={styles.icons}> 
                                <TouchableOpacity onPress={() => Deletar(item.codigo)}>
                                    <Feather name="trash-2" size={40} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Editar(item)}>
                                    <FontAwesome name="pencil" size={40} color="black" />
                                </TouchableOpacity>
                            </View>
                    </View>
                )}
            />
            </View>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setEditarUsuario(null);
                }}>
                <View style={styles.ModalConteiner}>
                  <View style={styles.ModalHeader}>
                    <Text style={styles.ModalTitle}>  Editar Usuário  </Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Nome"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                   <TextInput
                      style={styles.input}
                      placeholder="Cpf"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Endereço"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Cidade"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                   <TextInput
                      style={styles.input}
                      placeholder="Senha"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Peso"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Altura"
                      value={usuariosData.nome}
                      onChangeText={(text) => setUsuariosData({ ...usuariosData, nome: text })}
                    />

                    <TouchableOpacity 
                    style={[styles.btns , styles.btnSave]} 
                    onPress={Alterar}>  
                      <Text style={styles.txtbtns}> Salvar </Text> 
                    </TouchableOpacity>

                    <TouchableOpacity
                            style={[styles.btns, styles.btnCancel]}
                            onPress={() => {
                                setModalVisible(false);
                                setEditarUsuario(null);
                            }}
                        >
                            <Text style={styles.txtbtns}>Cancelar</Text>
                        </TouchableOpacity>


                  </View>
                </View>


            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB031',
      },
      header:{
        backgroundColor: '#E49413',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      txtheader:{
        fontSize: 20,
      },
      body:{
        backgroundColor: '#E49413',
        height: '80%',
        margin: 20,
        padding: 15,
        alignItems: 'center',

      },

      itemContainer:{
        backgroundColor: '#FFB031',
        alignItems: 'center',
        padding: 5,
      },

      itemText: {
        color: '#000',
        size: 20,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
        width: 300,
        height: 45,
        padding: 10,
      },
      btn:{
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        size: 20,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#FFB031',
        width: 300,
        height: 45,
      },
      txtbtn:{
        justifyContent:'center',
        backgroundColor: '#FFB031',
        color: '#000',
        fontSize: 20,
      },

      ModalConteiner:{

      },
      ModalHeader:{

      },
})