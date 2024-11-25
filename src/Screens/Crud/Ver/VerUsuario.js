import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { apiRoute } from '../../../../apiRoute';

export function VerUsuario({ navigation }) {
    const [usuario, setUsuario] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModalVisible, setDataModalVisible] = useState(false);
    const [planos, setPlanos] = useState([]);
    const [dataUsuario, setDataUsuario] = useState({
        codigo: "",
        nome: "",
        login: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: "",
        codplano: "",
        status: ""
    });

    useEffect(() => {
        fetchPlanos();
    }, []);

    const toggleModal = () => {
        setDataModalVisible(!dataModalVisible);
    };

    const fetchPlanos = async () => {
        try {
            const response = await axios.get(`http://${apiRoute}:3000/planos`);
            console.log("Resposta da API:", response.data);

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

    const usuariosFiltrados = () => {
        if (statusFiltro === "") return usuario;
        return usuario.filter((user) => user.status === statusFiltro);
    };

    const contarUsuariosFiltrados = () => usuariosFiltrados().length;

    const carregarUsuarios = async () => {
        try {
            const response = await axios.get(`http://${apiRoute}:3000/usuarios`);
            setUsuario(response.data.usuario);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const handleEdit = (use) => {
        setDataUsuario(use);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://${apiRoute}:3000/usuarios`, dataUsuario, {
                params: { codigo: dataUsuario.codigo },
            });
            carregarUsuarios();
            setDataUsuario({
                codigo: "",
                nome: "",
                login: "",
                endereco: "",
                senha: "",
                peso: "",
                altura: "",
                codplano: "",
                status: ""
            });
            setModalVisible(false);
            Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    const handleDelete = async (codigo) => {
        Alert.alert(
            "Confirmação de Exclusão",
            "Tem certeza de que deseja excluir este usuário?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: async () => {
                    try {
                        await axios.delete(`http://${apiRoute}:3000/usuarios`, {
                            params: { codigo },
                        });
                        setUsuario(usuario.filter(user => user.codigo !== codigo));
                        Alert.alert("Sucesso", "Usuário excluído com sucesso!");
                    } catch (error) {
                        console.error('Erro ao deletar usuário:', error);
                        Alert.alert("Erro", "Não foi possível excluir o usuário.");
                    }
                }},
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Pesquisa de Usuários</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.filterContainer}>
                    <View style={styles.filterButtons}>
                        {["Todos", "Ativo", "Inativo", "Em Análise", "Recusado"].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[styles.filterButton, statusFiltro === status && styles.selectedButton]}
                                onPress={() => setStatusFiltro(status === "Todos" ? "" : status)}
                            >
                                <Text style={[styles.filterText, statusFiltro === status && styles.selectedText]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.statusText}>
                        Total {statusFiltro || "Usuários"}: {contarUsuariosFiltrados()}
                    </Text>
                </View>

                <FlatList
                    data={usuariosFiltrados()}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={styles.dados} onPress={toggleModal}>
                                <Text style={styles.itemText}>{item.nome}</Text>
                                <FontAwesome name="user" size={29} color={'#EA5D04'} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

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
                        <Text style={styles.modalTitle}>Dados do Usuário</Text>
                        {dataUsuario && (
                            <>
                                <Text style={styles.modalText}>Código: {dataUsuario.codigo}</Text>
                                <Text style={styles.modalText}>Login: {dataUsuario.login}</Text>
                                <Text style={styles.modalText}>Endereço: {dataUsuario.endereco}</Text>
                                <Text style={styles.modalText}>Senha: {dataUsuario.senha}</Text>
                                <Text style={styles.modalText}>Peso: {dataUsuario.peso}</Text>
                                <Text style={styles.modalText}>Altura: {dataUsuario.altura}</Text>
                                <Text style={styles.modalText}>Plano: {dataUsuario.codplano}</Text>
                                <Text style={styles.modalText}>Status: {dataUsuario.status}</Text>
                            </>
                        )}
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => handleDelete(dataUsuario.codigo)}>
                                <Feather name="trash-2" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEdit(dataUsuario)}>
                                <FontAwesome name="pencil" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
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
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, nome: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Login"
                                    value={dataUsuario.login}
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, login: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Endereço"
                                    value={dataUsuario.endereco}
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, endereco: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Senha"
                                    value={dataUsuario.senha}
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, senha: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Peso"
                                    value={dataUsuario.peso}
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, peso: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Altura"
                                    value={dataUsuario.altura}
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, altura: text })}
                                />
                                <Picker
                                    selectedValue={dataUsuario.codplano}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => {
                                        setDataUsuario({ ...dataUsuario, codplano: itemValue });
                                    }}
                                >
                                    {planos.map((plano) => (
                                        <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
                                    ))}
                                </Picker>
                                <Picker
                                    selectedValue={dataUsuario.status}
                                    style={styles.picker}
                                    onValueChange={(itemValue) =>
                                        setDataUsuario({ ...dataUsuario, status: itemValue })
                                    }
                                >
                                    <Picker.Item label="Ativo" value="Ativo" />
                                    <Picker.Item label="Inativo" value="Inativo" />
                                    <Picker.Item label="Em Análise" value="Em Análise" />
                                    <Picker.Item label="Recusado" value="Recusado" />
                                </Picker>
                            </View>

                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
                                    <Text style={styles.btnText}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                    <Text style={styles.btnText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    txtheader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    body: {
        flex: 1,
    },
    filterContainer: {
        marginBottom: 10,
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    filterButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    selectedButton: {
        backgroundColor: '#FF9756',
    },
    filterText: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
    },
    statusText: {
        fontSize: 16,
        textAlign: 'center',
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
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        height: 25,
        width: '100%',
        marginBottom: 10,
    },
    btns: {
        backgroundColor: '#FF9756',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    txtbtns: {
        color: '#fff',
        fontWeight: 'bold',
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
      saveButton: {
	backgroundColor: '#FF9756',
      },
      cancelButton: {
	backgroundColor: '#FF9756',
      },
      btnContainer: {
	flexDirection: 'row',
	width: '50%',
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1, 
      },
});