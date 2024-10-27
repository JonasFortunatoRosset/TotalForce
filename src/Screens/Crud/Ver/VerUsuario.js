import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function VerUsuario() {
    const [usuario, setUsuario] = useState([]);
    const [statusFiltro, setStatusFiltro] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [statusModalVisible, setStatusModalVisible] = useState(false);
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
;

    const buscarPlanos = async () => {

    
        try {
          const response = await axios.get("http://localhost:3000/planos", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
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

        axios.get('http://localhost:3000/usuarios', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            setUsuario(response.data.usuario);
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const handleEdit = (use) => {
        setDataUsuario(use);
        setModalVisible(true);
    };

    const handleUpdate = async () => {

        axios.put('http://localhost:3000/usuarios', dataUsuario, {
            params: { codigo: dataUsuario.codigo },
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            carregarUsuarios();
            setDataUsuario({ codigo: "", nome: "", login: "", endereco: "", senha: "", peso: "", altura: "",codplano: "", status: "" });
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
            headers: {
                'Authorization': `Bearer ${token}`,
            }
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
                <Text style={styles.txtheader}>Pesquisa de Usuários</Text>
            </View>

            <View style={styles.body}>
            <View style={styles.filterContainer}>
    <View style={styles.filterButtons}>
        {["Todos", "Ativo", "Inativo", "Em Análise", "Recusado"].map((status) => (
            <TouchableOpacity 
                key={status}
                style={[
                    styles.filterButton, 
                    statusFiltro === status && styles.selectedButton
                ]}
                onPress={() => setStatusFiltro(status === "Todos" ? "" : status)}
            >
                <Text 
                    style={[
                        styles.filterText, 
                        statusFiltro === status && styles.selectedText
                    ]}
                >
                    {status}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
    <Text style={styles.statusText}>
        Total  {statusFiltro || "Usários"}: {contarUsuariosFiltrados()}
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
                                <Text style={styles.itemText}>login: {item.login}</Text>
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
                onRequestClose={() => {
                    setModalVisible(false);
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
                                    onChangeText={(text) => setDataUsuario({ ...dataUsuario, nome: text })} 
                                />

                                <TextInput 
                                    style={styles.input} 
                                    placeholder="login"
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
                                <TouchableOpacity 
                                    style={styles.inputs} 
                                    onPress={() => {
                                        buscarPlanos(); 
                                        setModalVisible(true);
                                    }}
                                    >
                                    <Text style={styles.placeholderText}>
                                        {usuario.codplano ? `Plano: ${usuario.codplano}` : "Selecione um plano"}
                                    </Text>
                                </TouchableOpacity>

                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                            >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                <Picker
                                    selectedValue={usuario.codplano}
                                    onValueChange={(itemValue) => {
                                    setUsuario({ ...usuario, codplano: itemValue });
                                    setModalVisible(false);
                                    }}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Selecione um plano" value="" />
                                    {planos.map((plano) => (
                                    <Picker.Item key={plano.id} label={plano.nome} value={plano.id} />
                                    ))}
                                </Picker>

                                <TouchableOpacity 
                                    style={styles.closeButton} 
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Fechar</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            </Modal>

                            <TouchableOpacity 
                            style={styles.inputs} 
                            onPress={() => setStatusModalVisible(true)}
                            >
                            <Text style={styles.placeholderText}>
                                {usuario.status}
                            </Text>
                            </TouchableOpacity>

                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={statusModalVisible}
                            onRequestClose={() => setStatusModalVisible(false)}
                            >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                <Picker
                                    selectedValue={usuario.status}
                                    onValueChange={(itemValue) => {
                                    setUsuario({ ...usuario, status: itemValue });
                                    setStatusModalVisible(false);
                                    }}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Ativo"      value="Ativo" />
                                    <Picker.Item label="Inativo"    value="Inativo" />
                                    <Picker.Item label="Em Análise" value="Em Análise" />
                                    <Picker.Item label="Recusado"   value="Recusado" />
                                </Picker>

                                <TouchableOpacity 
                                    style={styles.closeButton} 
                                    onPress={() => setStatusModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Fechar</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            </Modal>

                            </View>

                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={handleUpdate}>
                                    <Text style={styles.txtbtns}>Salvar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.btns, styles.btnCancel]} onPress={() => setModalVisible(false)}>
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
        backgroundColor: '#FFB031', 
    },
    header: {
        backgroundColor: '#FFB031', 
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#E49413',
    },
    txtheader: {
        fontSize: 24, 
        color: '#000',
        fontWeight: 'bold', 
    },
    body: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E49413', 
    },
    icons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dados: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 5,
        flex: 1, 
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#E49413', 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, 
        marginBottom: 10, 
    },
    itemText: {
        color: '#333', 
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#FFFFFF', 
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    ModalHeader: {
        backgroundColor: '#FFB031',
        padding: 15,
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    ModalTitle: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
    },
    BoxInputs: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
    },
    input: {
        width: '90%', 
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff', 
        borderRadius: 8,
        marginVertical: 8,
        color: '#333',
    },
    inputs: {
        color: '#000',
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
        width: '90%', 
        height: 50,
        padding: 10,

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%', 
        marginTop: 15,
    },
    btns: {
        width: '48%', 
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFB031',
    },
    txtbtns: {
        color: '#E49413', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterContainer: {
        padding: 10,
        backgroundColor: '#FFB031',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15, 
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    filterButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        backgroundColor: '#E49413', 
        borderRadius: 8,
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#E49413', 
    },
    filterText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    selectedText: {
        color: '#fff',
    },
    statusText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
});
