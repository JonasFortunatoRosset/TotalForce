import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';  
import { apiRoute } from '../../../../apiRoute';

export function VerColaborador({ navigation }) {
    const [colaborador, setColaborador] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModalVisible, setDataModalVisible] = useState(false);
    const [dataColaborador, setDataColaborador] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        cidade: "",
        senha: "",
        login: "",
        status: "",
    });
    const [selectedColaborador, setSelectedColaborador] = useState(null);

    const toggleModal = () => {
        setDataModalVisible(!dataModalVisible);
    };

    const carregarColaboradores = async () => {
        try {
            const response = await axios.get(`http://${apiRoute}:3000/colaboradores`);
            setColaborador(response.data.colaborador);
        } catch (error) {
            console.error('Erro ao carregar colaboradores:', error);
        }
    };

    useEffect(() => {
        carregarColaboradores();
    }, []);

    const handleEdit = (col) => {
        setDataColaborador(col);
        setModalVisible(true);
    };

    const handleView = (col) => {
        setSelectedColaborador(col);
        setDataModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://${apiRoute}:3000/colaboradores`, dataColaborador, {
                params: { codigo: dataColaborador.codigo },
            });
            carregarColaboradores();
            setModalVisible(false);
            Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar colaborador:', error);
        }
    };

    const handleDelete = async (codigo) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja excluir este colaborador?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://${apiRoute}:3000/colaboradores`, {
                                params: { codigo },
                            });
                            setColaborador(colaborador.filter(col => col.codigo !== codigo));
                            Alert.alert("Sucesso", "Colaborador excluído com sucesso!");
                        } catch (error) {
                            console.error('Erro ao deletar colaborador:', error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Pesquisa de Colaborador</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={colaborador}
                    keyExtractor={(item) => item.cpf.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={styles.dados} onPress={() => handleView(item)}>
                                <Text style={styles.itemText}>{item.nome}</Text>
                                <FontAwesome5 name="chalkboard-teacher" size={29} color={'#EA5D04'} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {/* Modal de Visualização */}
            <Modal
                visible={dataModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}>
                {selectedColaborador && (
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                                <AntDesign name="close" size={24} color="#EB6808" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Dados do Colaborador</Text>
                            <Text style={styles.modalText}>Nome: {selectedColaborador.nome}</Text>
                            <Text style={styles.modalText}>CPF: {selectedColaborador.cpf}</Text>
                            <Text style={styles.modalText}>Endereço: {selectedColaborador.endereco}</Text>
                            <Text style={styles.modalText}>Senha: {selectedColaborador.senha}</Text>
                            <Text style={styles.modalText}>Status: {selectedColaborador.status}</Text>

                            <View style={styles.icons}>
                                <TouchableOpacity onPress={() => handleDelete(selectedColaborador.codigo)}>
                                    <Feather name="trash-2" size={40} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleEdit(selectedColaborador)}>
                                    <FontAwesome name="pencil" size={40} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Modal>

            {/* Modal de Edição */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
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
                                    onChangeText={(text) => setDataColaborador({ ...dataColaborador, nome: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="CPF"
                                    value={dataColaborador.cpf}
                                    onChangeText={(text) => setDataColaborador({ ...dataColaborador, cpf: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Endereço"
                                    value={dataColaborador.endereco}
                                    onChangeText={(text) => setDataColaborador({ ...dataColaborador, endereco: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Senha"
                                    value={dataColaborador.senha}
                                    onChangeText={(text) => setDataColaborador({ ...dataColaborador, senha: text })}
                                />
                                <Picker
                                    selectedValue={dataColaborador.status}
                                    style={styles.input}
                                    onValueChange={(itemValue) =>
                                        setDataColaborador({ ...dataColaborador, status: itemValue })
                                    }>
                                    <Picker.Item label="Ativo" value="ativo" />
                                    <Picker.Item label="Inativo" value="inativo" />
                                    <Picker.Item label="Em Análise" value="em_analise" />
                                    <Picker.Item label="Recusado" value="recusado" />
                                </Picker>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={handleUpdate}>
                                    <Text style={styles.txtbtns}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btns, styles.btnCancel]}
                                    onPress={() => setModalVisible(false)}>
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