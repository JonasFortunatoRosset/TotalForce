import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { apiRoute } from '../../../../apiRoute';

export function VerTreino() {
    const navigation = useNavigation();
    const [treinos, setTreinos] = useState([]);
    const [planos, setPlanos] = useState([]); 
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModalVisible, setDataModalVisible] = useState(false);
    const [dataTreino, setDataTreino] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        codplano: "",
    });

    useEffect(() => {
        fetchPlanos();
    }, []);

    const toggleModal = (treino = null) => {
        if (treino) {
            setDataTreino(treino); // Atualiza os dados do treino clicado
        }
        setDataModalVisible(!dataModalVisible);
    };

    const fetchPlanos = async () => {
        try {
            const response = await axios.get(`http://${apiRoute}:3000/planos`);
            if (Array.isArray(response.data)) {
                setPlanos(response.data);
            } else if (Array.isArray(response.data.Planos)) {
                setPlanos(response.data.Planos); 
            } else {
                console.error('A chave "Planos" não é um array:', response.data);
                Alert.alert('Erro', 'Nenhum plano encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os planos.');
            console.error(error);
        }
    };

    const carregarTreinos = async () => {
        axios.get(`http://${apiRoute}:3000/treinos`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setTreinos(response.data.Treino);
        })
        .catch(error => {
            console.error('Erro ao carregar treinos:', error);
        });
    };

    useEffect(() => {
        carregarTreinos();
    }, []);

    const handleEdit = (tre) => {
        setDataTreino(tre);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        axios.put(`http://${apiRoute}:3000/treinos`, dataTreino, {
            params: { codigo: dataTreino.codigo },
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            carregarTreinos();
            setModalVisible(false);
            Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao atualizar treino:', error);
        });
    };

    const handleDelete = async (codigo) => {
        Alert.alert(
            "Confirmação de Exclusão",
            "Tem certeza de que deseja excluir este treino?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: async () => {
                    try {
                        await axios.delete(`http://${apiRoute}:3000/treinos`, {
                            params: { codigo },
                            headers: { 'Content-Type': 'application/json' }
                        });
                        setTreinos(treinos.filter(t => t.codigo !== codigo));
                        Alert.alert("Sucesso", "Treino excluído com sucesso!");
                    } catch (error) {
                        console.error('Erro ao deletar treino:', error);
                        Alert.alert("Erro", "Não foi possível excluir o treino.");
                    }
                }}
            ]
        );
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Pesquisa de Treinos</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={treinos}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={styles.dados} onPress={() => toggleModal(item)}>
                                <Text style={styles.itemText}>{item.nome}</Text>
                                <MaterialCommunityIcons name="weight-lifter" size={29} color="#EA5D04" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {/* Modal para exibir os detalhes do treino */}
            <Modal
                visible={dataModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                            <AntDesign name="close" size={24} color="#EB6808" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Dados do Treino</Text>
                        {dataTreino && (
                                    <>  
                                        <Text style={styles.modalText}>Código: {dataTreino.codigo}</Text>
                                        <Text style={styles.modalText}>Nome: {dataTreino.nome}</Text>
                                        <Text style={styles.modalText}>Descrição: {dataTreino.descricao}</Text>
                                        <Text style={styles.modalText}>Plano: {dataTreino.codplano}</Text>
                                    </>
                                )}

                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => handleDelete(dataTreino.codigo)}>
                                <Feather name="trash-2" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEdit(dataTreino)}>
                                <FontAwesome name="pencil" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de edição */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.ModalHeader}>
                            <Text style={styles.ModalTitle}>Editar Treino</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.BoxInputs}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={dataTreino.nome}
                                    onChangeText={(text) => setDataTreino({ ...dataTreino, nome: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Descrição"
                                    value={dataTreino.descricao}
                                    onChangeText={(text) => setDataTreino({ ...dataTreino, descricao: text })}
                                />
                                <Picker
                                    selectedValue={dataTreino.codplano}
                                    style={styles.input}
                                    onValueChange={(itemValue) => {
                                        setDataTreino({ ...dataTreino, codplano: itemValue });
                                    }}
                                >
                                    <Picker.Item label="Selecione um plano" value="" />
                                    {planos.length > 0 ? (
                                        planos.map((plano) => (
                                            <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
                                        ))
                                    ) : (
                                        <Picker.Item label="Nenhum plano disponível" value="" />
                                    )}
                                </Picker>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={handleUpdate}>
                                    <Text style={styles.txtbtns}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btns, styles.btnCancel]}
                                    onPress={() => { setModalVisible(false); }}
                                >
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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
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
        elevation: 4,
      },
    itemText: {
        color: '#000',
        fontSize: 16,
      },
    separator: {
        height: 1,
        backgroundColor: '#fff',
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
        elevation: 5,
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
    picker: {
        height: '10%',
        width: '100%',
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