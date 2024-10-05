import { StyleSheet, Text, View, FlatList,Alert,TouchableOpacity,Modal,TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

export function VerPersonal() {
    const [colaborador, setColaborador] = useState([]);
    const [editingColaborador, setEditingColaborador] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataColaborador, setDataColaborador] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        senha: ""
    })

    useEffect(() => {
        axios.get('http://localhost:3000/colaboradores')
            .then(response => {
                setColaborador(response.data.colaborador);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEdit = (col) => {
        setDataColaborador(col);
        setModalVisible(true);
    };

    const handleUpdate = () => {
      axios.put('http://localhost:3000/colaboradores', dataColaborador, {
          params: { codigo: dataColaborador.codigo }
      })
      .then(response => {
          axios.get('http://localhost:3000/colaboradores')
              .then(response => {
                  setColaborador(response.data.colaborador); 

                  setModalVisible(false);
                  Alert.alert("Sucesso", "Alterações salvas com sucesso!");
              })
              .catch(error => {
                  console.error('Erro ao buscar dados atualizados:', error);
              });
  
 
          setDataColaborador({nome: "",cpf: "",endereco: "",senha: "" });
      })
      .catch(error => {
          console.error('Erro ao atualizar colaboradores:', error);
      });
  };

    const handleDelete = (cpf) => {
        axios.delete('http://localhost:3000/colaboradores', { params: { codigo } })
            .then(response => {
                setColaborador(colaborador.filter(colaborador => colaborador.codigo !== codigo));
            })
            .catch(error => {
                console.error('Erro ao deletar colaborador:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Colaborador</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={colaborador}
                    keyExtractor={(item) => item.cpf.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.dados}>
                         <Text style={styles.itemText}>Nome: {item.nome}</Text>
                         <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                         <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
                         <Text style={styles.itemText}>Senha: {item.senha}</Text>
                        </View>

                        <View style={styles.icons}> 
                             <TouchableOpacity onPress={() => handleDelete(item.cpf)}> 
                                 <Feather name="trash-2" size={40} color="black" />
                             </TouchableOpacity>

                             <TouchableOpacity onPress={() => handleEdit(item)}>
                                 <FontAwesome name="pencil" size={40} color="black" />
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
                 setEditingColaborador(null);
             }}>
      <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.ModalHeader}>
          <Text style={styles.ModalTitle}>Editar Colaborador</Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.BoxInputs}>
            

            <TextInput 
            style={styles.input} 
            placeholder="Nome"
            value={dataColaborador.nome}
            onChangeText={(text) => setDataColaborador({ ...dataColaborador, nome: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="CPF"
            value={dataColaborador.cpf}
            onChangeText={(text) => setDataColaborador({ ...dataColaborador, cpf: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Endereço"
            value={dataColaborador.endereco}
            onChangeText={(text) => setDataColaborador({ ...dataColaborador, endereco: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Senha"
            value={dataColaborador.senha}
            onChangeText={(text) => setDataColaborador({ ...dataColaborador, senha: text })} />


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