import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';

export function VerUsuario({ navigation }) {
    const [usuario, setUsuario] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
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

    const buscarPlanos = async () => {
        try {
          const response = await axios.get("http://localhost:3000/planos");
          setPlanos(response.data);  
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar os planos.');
            console.error(error);
        }
    };

    const usuariosFiltrados = () => {
        if (statusFiltro === "") return usuario;
        return usuario.filter((user) => user.status === statusFiltro);
    };

    const contarUsuariosFiltrados = () => usuariosFiltrados().length;

    const carregarUsuarios = async () => {
        axios.get('http://localhost:3000/usuarios')
        .then(response => {
            setUsuario(response.data.usuario);
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
    };

    useEffect(() => {
        carregarUsuarios();
        buscarPlanos(); 
    }, []);

    const handleEdit = (use) => {
        setDataUsuario(use);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        axios.put('http://localhost:3000/usuarios', dataUsuario, {
            params: { codigo: dataUsuario.codigo },
        })
        .then(response => {
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
        })
        .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
        });
    };

    const handleDelete = async (codigo) => {
        axios.delete('http://localhost:3000/usuarios', {
            params: { codigo },
        })
        .then(response => {
            setUsuario(usuario.filter(user => user.codigo !== codigo));
        })
        .catch(error => {
            console.error('Erro ao deletar usuário:', error);
        });
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
                            <View style={styles.dados}>
                                <Text style={styles.itemText}>Código: {item.codigo}</Text>
                                <Text style={styles.itemText}>Nome: {item.nome}</Text>
                                <Text style={styles.itemText}>Login: {item.login}</Text>
                                <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
                                <Text style={styles.itemText}>Senha: {item.senha}</Text>
                                <Text style={styles.itemText}>Peso: {item.peso}</Text>
                                <Text style={styles.itemText}>Altura: {item.altura}</Text>
                                <Text style={styles.itemText}>Plano: {item.codplano}</Text>
                                <Text style={styles.itemText}>Status: {item.status}</Text>
                            </View>

                            <View style={styles.icons}> 
                                <TouchableOpacity onPress={() => handleDelete(item.codigo)}>
                                    <Feather name="trash-2" size={40} color="black" />
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
                                    onValueChange={(itemValue) => setDataUsuario({ ...dataUsuario, codplano: itemValue })}
                                >
                                    <Picker.Item label="Selecione um plano" value="" />
                                    {planos.map((plano) => (
                                        <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
                                    ))}
                                </Picker>

                                <Picker
                                    selectedValue={dataUsuario.status}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setDataUsuario({ ...dataUsuario, status: itemValue })}
                                >
                                    <Picker.Item label="Selecione um status" value="" />
                                    <Picker.Item label="Ativo" value="Ativo" />
                                    <Picker.Item label="Inativo" value="Inativo" />
                                    <Picker.Item label="Em Análise" value="Em Análise" />
                                    <Picker.Item label="Recusado" value="Recusado" />
                                </Picker>

                                <TouchableOpacity 
                                    style={styles.btns} 
                                    onPress={handleUpdate}
                                >
                                    <Text style={styles.txtbtns}>Salvar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.btns} 
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.txtbtns}>Cancelar</Text>
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
        backgroundColor: '#E49413',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        backgroundColor: '#FFB031',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFB031',
        borderRadius: 5,
    },
    dados: {
        flex: 1,
    },
    itemText: {
        fontSize: 14,
        color: '#000',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
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
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    btns: {
        backgroundColor: '#E49413',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    txtbtns: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
