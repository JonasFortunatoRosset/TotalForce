import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';

export function VerAdministrador({ navigation }) {
    const [administrador, setAdministrador] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModalVisible, setDataModalVisible] = useState(false);
    const [dataAdministrador, setDataAdministrador] = useState({
        login: "",
        nome: "",
        cpf: "",
        senha: "",
        codigo: ""
    });

    const toggleModal = () => {
        setDataModalVisible(!dataModalVisible);
    };

    const carregarAdministradores = async () => {
        axios.get('http://localhost:3000/administradores')
            .then(response => {
                setAdministrador(response.data.administrador);
            })
            .catch(error => {
                console.error('Erro ao carregar administradores:', error);
            });
    };

    useEffect(() => {
        carregarAdministradores();
    }, []);

    const handleEdit = (adm) => {
        setDataAdministrador(adm);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        axios.put('http://localhost:3000/administradores', dataAdministrador, {
            params: { codigo: dataAdministrador.codigo },
        })
            .then(response => {
                carregarAdministradores();
                setModalVisible(false);
                Alert.alert("Sucesso", "Alterações salvas com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao atualizar administrador:', error);
            });
    };

    const handleDelete = (codigo) => {
        Alert.alert(
            "Confirmação de Exclusão",
            "Tem certeza de que deseja excluir este administrador?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => {
                        axios.delete('http://localhost:3000/administradores', {
                            params: { codigo },
                        })
                            .then(response => {
                                setAdministrador(administrador.filter(administrador => administrador.codigo !== codigo));
                                Alert.alert("Sucesso", "Administrador excluído com sucesso!");
                            })
                            .catch(error => {
                                console.error('Erro ao deletar administrador:', error);
                                Alert.alert("Erro", "Não foi possível excluir o administrador.");
                            });
                    },
                    style: "destructive"
                }
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
                <Text style={styles.txtheader}>Pesquisa de Administrador</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={administrador}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.dados}
                                onPress={() => {
                                    setDataAdministrador(item);
                                    toggleModal();
                                }}>
                                <Text style={styles.itemText}>{item.nome}</Text>
                                <Ionicons name="people" size={29} color={'#EA5D04'} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {/* Modal para exibir os detalhes do administrador */}
            <Modal
                visible={dataModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                            <AntDesign name="close" size={24} color="#EB6808" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Dados do Administrador</Text>
                        {dataAdministrador && (
                            <>
                                <Text style={styles.modalText}>CPF:   {dataAdministrador.cpf}</Text>
                                <Text style={styles.modalText}>Login: {dataAdministrador.login}</Text>
                                <Text style={styles.modalText}>Senha: {dataAdministrador.senha}</Text>
                            </>
                        )}
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => handleDelete(dataAdministrador.codigo)}>
                                <Feather name="trash-2" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEdit(dataAdministrador)}>
                                <FontAwesome name="pencil" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal para edição do administrador */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.ModalHeader}>
                            <Text style={styles.ModalTitle}>Editar Administrador</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.BoxInputs}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={dataAdministrador.nome}
                                    onChangeText={(text) => setDataAdministrador({ ...dataAdministrador, nome: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="CPF"
                                    value={dataAdministrador.cpf}
                                    onChangeText={(text) => setDataAdministrador({ ...dataAdministrador, cpf: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Login"
                                    value={dataAdministrador.login}
                                    onChangeText={(text) => setDataAdministrador({ ...dataAdministrador, login: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Senha"
                                    value={dataAdministrador.senha}
                                    onChangeText={(text) => setDataAdministrador({ ...dataAdministrador, senha: text })}
                                />
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
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5%',
    },
    separator: {
        height: 1,
        backgroundColor: '#FF9756',
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
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    ModalHeader: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },
    ModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    modalBody: {
        marginTop: 10,
    },
    BoxInputs: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        color: '#000',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btns: {
        width: '48%',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnSave: {
        backgroundColor: '#FF9756',
    },
    btnCancel: {
        backgroundColor: '#FF9756',
    },
    txtbtns: {
        color: '#000',
        fontSize: 16,
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
