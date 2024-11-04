import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

export function VerPlanos() {
    const navigation = useNavigation();
    const [planos, setPlanos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataPlanos, setDataPlanos] = useState({
        codigo: "",
        nome: "",
    });

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
                            <View style={styles.dados}>
                                <Text style={styles.itemText}>Código: {item.codigo}</Text>
                                <Text style={styles.itemText}>Nome: {item.nome}</Text>
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
