import { StyleSheet, Text, View, FlatList, Alert,TouchableOpacity,TextInput,Modal } from 'react-native';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

export function VerExercicio() {
    const [exercicio, setExercicio] = useState([]);
    const [editingExercicio, setEditingExercicio] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataExercicios, setDataExercicios] = useState ({
        codigo: "",
        nome: "",
        descricao: "",
        codtreino: ""
    })

    useEffect(() => {
        axios.get('http://localhost:3000/exercicios')
            .then(response => {
                setExercicio(response.data.Exercicio);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEdit = (exe) => {
        setDataExercicios(exe);
        setExercicio(exercicio.codigo);
        setModalVisible(true);
    };

    const handleUpdate = () => {
        axios.put('http://localhost:3000/exercicios', dataExercicios, {
            params: { codigo: dataExercicios.codigo }
        })
        .then(response => {
          axios.get('http://localhost:3000/exercicios')
          .then(response => {
              setExercicio(response.data.Exercicio);
  
                    setModalVisible(false);
                    Alert.alert("Sucesso", "Alterações salvas com sucesso!");
                })
                .catch(error => {
                    console.error('Erro ao buscar dados atualizados:', error);
                });
    
   
            setDataExercicios({codigo: "",nome: "",descricao: "",codtreino: "" });
        })
        .catch(error => {
            console.error('Erro ao atualizar exercícios:', error);
        });
    };

    const handleDelete = (codigo) => {
        axios.delete('http://localhost:3000/exercicios', { params: { codigo } })
            .then(response => {
                setExercicio(exercicio.filter(exercicio => exercicio.codigo !== codigo));
            })
            .catch(error => {
                console.error('Erro ao deletar exercicio:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txtheader}>Pesquisa de Exercício</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={exercicio}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.dados}>
                         <Text style={styles.itemText}>Código: {item.codigo}</Text>
                         <Text style={styles.itemText}>Nome: {item.nome}</Text>
                         <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
                         <Text style={styles.itemText}>Código do treino: {item.codtreino}</Text>
                        </View>

                        <View style={styles.icons}> 
                             <TouchableOpacity onPress={() => handleDelete(item.codigo)}> 
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
                 setEditingExercicio(null);
             }}>
      <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.ModalHeader}>
          <Text style={styles.ModalTitle}>Editar Exercícios</Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.BoxInputs}>
            <TextInput
             style={styles.input}
              placeholder="Código"
              value={dataExercicios.codigo}
              onChangeText={(text) => setDataExercicios({ ...dataExercicios, codigo: text })}/>

            <TextInput 
            style={styles.input} 
            placeholder="Nome"
            value={dataExercicios.nome}
            onChangeText={(text) => setDataExercicios({ ...dataExercicios, nome: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="Descrição"
            value={dataExercicios.descricao}
            onChangeText={(text) => setDataExercicios({ ...dataExercicios, descricao: text })} />

            <TextInput 
            style={styles.input} 
            placeholder="CodTreino"
            value={dataExercicios.codtreino}
            onChangeText={(text) => setDataExercicios({ ...dataExercicios, codtreino: text })} />
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