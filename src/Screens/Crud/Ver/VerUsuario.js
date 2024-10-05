import { StyleSheet, Text, View, FlatList,Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

export function VerUsuario() {
    const [usuario, setUsuario] = useState([]);
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataUsuario, setDataUsuario] = useState({
        codigo: "",
        nome: "",
        cpf: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: "",
        status: ""
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

    const handleEdit = (use) => {
        setDataUsuario(use);
        //setUsuario(usuario.codigo);
        setModalVisible(true);
    };

    const handleUpdate = () => {
      axios.put('http://localhost:3000/usuarios', dataUsuario, {
          params: { codigo: dataUsuario.codigo }
      })
      .then(response => {
        axios.get('http://localhost:3000/usuarios')
        .then(response => {
          setUsuario(response.data.usuario);

          setDataUsuario({ codigo: "", nome: "", cpf: "", endereco: "", senha: "", peso: "", altura: "", status: "" });
          setModalVisible(false); 
          Alert.alert("Sucesso", "Alterações salvas com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao buscar dados atualizados:', error);
            });


       
    })
    .catch(error => {
        console.error('Erro ao atualizar usuario:', error);
    });
};
  
    const handleDelete = (codigo) => {
        axios.delete('http://localhost:3000/usuarios', { params: { codigo } })
            .then(response => {
                setUsuario(usuario.filter(usuario => usuario.codigo !== codigo));
            })
            .catch(error => {
                console.error('Erro ao deletar treino:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Usuários</Text>
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
                            <Text style={styles.itemText}>Senha: {item.senha}</Text>
                            <Text style={styles.itemText}>Peso: {item.peso}</Text>
                            <Text style={styles.itemText}>Altura: {item.altura}</Text>
                            <Text style={styles.itemText}>Status: {item.status}</Text>
                          </View>

                          <View style={styles.icons}> 
                             <TouchableOpacity> 
                                 <Feather name="trash-2" size={40} color="black" onPress={() => handleDelete(item.codigo)} />
                             </TouchableOpacity>

                             <TouchableOpacity onPress={() => handleEdit(item)}>
                                 <FontAwesome name="pencil" size={40} color="black"/>
                             </TouchableOpacity>
                        </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>

            <Modal
             animationType="slide"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
                 setModalVisible(false);
                 setEditingUsuario(null);
             }}>
      <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.ModalHeader}>
          <Text style={styles.ModalTitle}>Editar Usuário</Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.BoxInputs}>

            <TextInput 
            style={styles.input} 
            placeholder="Nome"
            value={dataUsuario.nome}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, nome: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="CPF"
            value={dataUsuario.cpf}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, cpf: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Endereço"
            value={dataUsuario.endereco}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, endereco: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Senha"
            value={dataUsuario.senha}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, senha: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Peso"
            value={dataUsuario.peso}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, peso: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Altura"
            value={dataUsuario.altura}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, altura: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Status"
            value={dataUsuario.status}
            onChangeText={(text) => setDataUsuario({ ...dataUsuario, status: text })} />


          </View>

          <View style={styles.btnContainer}>

            <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={handleUpdate}>
              <Text style={styles.txtbtns}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btns, styles.btnCancel]} 
            onPress={() => {setModalVisible(false)}}>
              <Text style={styles.txtbtns}>Cancelar</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFB031',
  },
  header: {
      backgroundColor: '#E49413',
      width: '100%',
      height: '8%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  txtheader: {
      fontSize: 20,
      color: '#fff',
  },
  body: {
      backgroundColor: '#E49413',
      flex: 1,
      padding: 20,
  },
  icons: {
      justifyContent: 'space-between'
  },
  dados: {
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding: 5,
      height: '100%',
  
  },
  itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#FFB031',
      borderRadius: 8,
  },
  itemText: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 5,
  },
  separator: {
      height: 1,
      backgroundColor: '#E49413',
      marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFB031',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ModalHeader: {
    backgroundColor: '#E49413',
    padding: 15,
    alignItems: 'center', 
  },
  modalBody: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  ModalTitle: {
    fontSize: 20,
    color: '#000',
  },
  BoxInputs: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E49413',
    borderRadius: 8,
    marginVertical: 5,
    color: '#000',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250, 
  },
  btns: {
    width: '48%', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  txtbtns: {
    color: '#000',
    fontSize: 16,
  },
  btnSave: {
    backgroundColor: '#E49413',
  },
  btnCancel: {
    backgroundColor: '#E49413',
  },
});