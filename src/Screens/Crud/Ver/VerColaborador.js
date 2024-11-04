import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';  
import { useNavigation } from '@react-navigation/native';

export function VerColaborador({}) {
    const navigation = useNavigation();
    const [colaborador, setColaborador] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataColaborador, setDataColaborador] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        cidade: "",
        senha: "",
        login: "",
        status: "",
    });

    const carregarColaboradores = async () => {
        try {
            const response = await axios.get('http://localhost:3000/colaboradores');
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

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:3000/colaboradores', dataColaborador, {
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
                            await axios.delete('http://localhost:3000/colaboradores', {
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
                            <View style={styles.dados}>
                                <Text style={styles.itemText}>Nome: {item.nome}</Text>
                                <Text style={styles.itemText}>Cpf: {item.cpf}</Text>
                                <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
                                <Text style={styles.itemText}>Senha: {item.senha}</Text>
                                <Text style={styles.itemText}>Status: {item.status}</Text>
                            </View>
                            <View style={styles.icons}>
                                <TouchableOpacity onPress={() => handleDelete(item.codigo)}>
                                    <Feather name="trash-2" size={30} color="black" />
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
        width: '30%',
    },
    dados: {
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
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#FFB031',
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
        backgroundColor: '#FFB031',
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
        backgroundColor: '#FFB031',
    },
    btnCancel: {
        backgroundColor: '#FFB031',
    },
});
