import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';

export function VerAdministrador() {
    const navigation = useNavigation();
    const [administrador, setAdministrador] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataAdministrador, setDataAdministrador] = useState({
        login: "",
        nome: "",
        cpf: "",
        login: "",
        senha: ""
    });

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
                            <View style={styles.dados}>
                                <Text style={styles.itemText}>Nome: {item.nome}</Text>
                                <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                                <Text style={styles.itemText}>Login: {item.login}</Text>
                                <Text style={styles.itemText}>Senha: {item.senha}</Text>
                            </View>
                            <View style={styles.icons}>
                                <TouchableOpacity onPress={() => handleDelete(item.codigo)}>
                                    <FontAwesome name="trash" size={30} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleEdit(item)}>
                                    <FontAwesome name="pencil" size={30} color="black" />
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
                                <TextInput
                                    style={styles.input}
                                    placeholder="Login"
                                    value={dataAdministrador.login}
                                    onChangeText={(text) => setDataAdministrador({ ...dataAdministrador, login: text })}
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
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 15,
        backgroundColor: '#FFB031',
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    dados: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '30%',
    },
    separator: {
        height: 1,
        backgroundColor: '#E49413',
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
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    ModalHeader: {
        backgroundColor: '#E49413',
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
        backgroundColor: '#E49413',
    },
    btnCancel: {
        backgroundColor: '#E49413',
    },
    txtbtns: {
        color: '#000',
        fontSize: 16,
    },
});
