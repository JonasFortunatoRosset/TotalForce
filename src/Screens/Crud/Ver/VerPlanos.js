import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

export function VerPlanos() {
    const navigation = useNavigation();
    const [planos, setPlanos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModalVisible, setDataModalVisible] = useState(false);
    const [dataPlanos, setDataPlanos] = useState({
        codigo: "",
        nome: "",
    });

    const toggleModal = () => {
        setDataModalVisible(!dataModalVisible);
      };

    const carregarPlanos = async () => {
        axios.get('http://localhost:3000/planos', {
            headers: {
                'Content-Type': 'application/json',  
            }
        })
        .then(response => {
            setPlanos(response.data.planos);
        })
        .catch(error => {
            console.error('Erro ao carregar planos:', error);
        });
    };

    useEffect(() => {
        carregarPlanos();
    }, []);

    const handleEdit = (pla) => {
        setDataPlanos(pla);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        axios.put('http://localhost:3000/planos', dataPlanos, {
            params: { codigo: dataPlanos.codigo },
            headers: {
                'Content-Type': 'application/json', 
            }
        })
        .then(response => {
            carregarPlanos();
            setModalVisible(false);
            Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao atualizar planos:', error);
        });
    };

    const handleDelete = (codigo) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza de que deseja excluir este plano?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await axios.delete('http://localhost:3000/planos', {
                                params: { codigo },
                                headers: { 'Content-Type': 'application/json' },
                            });
                            setPlanos(planos.filter(plano => plano.codigo !== codigo));
                            Alert.alert("Sucesso", "Plano excluído com sucesso!");
                        } catch (error) {
                            console.error('Erro ao deletar plano:', error);
                        }
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Pesquisa de Planos</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={planos}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (

                    <View style={styles.itemContainer}>
                        <TouchableOpacity style={styles.dados} onPress={toggleModal} >
                            <Text style={styles.itemText}>{item.nome}</Text>
                            <FontAwesome5 name="list-alt" size={29} color="#EA5D04" />
                        </TouchableOpacity>
                    </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>

            <Modal
            visible={dataModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}
             >

                <FlatList
                    data={planos}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (

                        <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                            <AntDesign name="close" size={24} color="#EB6808" />
                          </TouchableOpacity>
                          <Text style={styles.modalTitle}>Dados do Plano</Text>
                          <Text style={styles.modalText}>Código:   {item.codigo}   </Text>
            
                          <View style={styles.icons}>
                            <TouchableOpacity onPress={() => handleDelete(item.codigo)}>
                                <Feather name="trash-2" size={40} color="black" />
                            </TouchableOpacity>
            
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <FontAwesome name="pencil" size={40} color="black" />
                            </TouchableOpacity>
                          </View>
            
                        </View>
                      </View>

 
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
        </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.ModalHeader}>
                            <Text style={styles.ModalTitle}>Editar Plano</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.BoxInputs}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Código"
                                    value={dataPlanos.codigo}
                                    onChangeText={(text) => setDataPlanos({ ...dataPlanos, codigo: text })}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={dataPlanos.nome}
                                    onChangeText={(text) => setDataPlanos({ ...dataPlanos, nome: text })}
                                />
                            </View>

                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={handleUpdate}>
                                    <Text style={styles.txtbtns}>Salvar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.btns, styles.btnCancel]}
                                    onPress={() => { setModalVisible(false); }}>
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
        backgroundColor: '#E49413',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#E49413',
        borderRadius: 12,
        elevation: 4,
        marginTop: 30,
    },
    txtheader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
    body: {
        flex: 1,
        padding: 20,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5%',
    },
    itemContainer: {
        marginBottom: 20,
    },
    dados: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    itemText: {
        color: '#000',
        fontSize: 16,
      },
    separator: {
        height: 1,
        backgroundColor: '#FF9756',
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
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ModalHeader: {
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
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
        backgroundColor: '#FF9756',
    },
    btnCancel: {
        backgroundColor: '#FF9756',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 5,
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1, 
      },
});
