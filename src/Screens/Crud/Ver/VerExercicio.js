import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Picker } from 'react-native-web';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { apiRoute } from '../../../../apiRoute';

export function VerExercicio() {
    const navigation = useNavigation();
    const [treinos, setTreinos] = useState([]);
    const [video, setVideo] = useState(null);
    const [exercicio, setExercicio] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModalVisible, setDataModalVisible] = useState(false);
    const [dataExercicios, setDataExercicios] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        serie: "",
        repeticoes: "",
        codtreino: "",
        video: "",
    });

    useEffect(() => {
        fetchTreinos();
    }, []);

    const toggleModal = () => {
        setDataModalVisible(!dataModalVisible);
    };

    const fetchTreinos = async () => {
        try {
            const response = await axios.get(`http://${apiRoute}:3000/treinos`);
            console.log("Resposta da API:", response.data);

            if (Array.isArray(response.data)) {
                setTreinos(response.data);
            } else if (Array.isArray(response.data.Treino)) {
                setTreinos(response.data.Treino);
            } else {
                console.error('A chave "Treinos" não é um array:', response.data);
                Alert.alert('Erro', 'Nenhum treino encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os treinos.');
            console.error(error);
        }
    };

    const carregarExercicios = async () => {
        try {
            const response = await axios.get(`http://${apiRoute}:3000/exercicios`);
            const base64Video = response.data.video;

            setVideo(`data:video/mp4;base64,${base64Video}`);
            setExercicio(response.data.Exercicio);
        } catch (error) {
            console.error('Erro ao carregar exercícios:', error);
        }
    };

    useEffect(() => {
        carregarExercicios();
    }, []);

    const handleEdit = (exe) => {
        setDataExercicios(exe);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://${apiRoute}:3000/exercicios`, dataExercicios, {
                params: { codigo: dataExercicios.codigo },
            });
            carregarExercicios();
            setModalVisible(false);
            Alert.alert("Sucesso", "Alterações salvas com sucesso!");
            setDataExercicios({ codigo: "", nome: "", descricao: "", serie: "", repeticoes: "", codtreino: "" });
        } catch (error) {
            console.error('Erro ao atualizar exercícios:', error);
        }
    };

    const handleDelete = (codigo) => {
        Alert.alert(
            "Confirmação de Exclusão",
            "Você tem certeza que deseja excluir este exercício?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Exclusão cancelada"),
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://${apiRoute}:3000/exercicios`, {
                                params: { codigo },
                            });
                            setExercicio(exercicio.filter(exercicio => exercicio.codigo !== codigo));
                            Alert.alert("Sucesso", "Exercício excluído com sucesso!");
                        } catch (error) {
                            console.error('Erro ao deletar exercício:', error);
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
                <Text style={styles.txtheader}>Pesquisa de Exercício</Text>
            </View>

            <View style={styles.body}>
                <FlatList
                    data={exercicio}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.dados}
                                onPress={() => {
                                    setDataExercicios(item);
                                    toggleModal();
                                }}>
                                <Text style={styles.itemText}>{item.nome}</Text>
                                <MaterialCommunityIcons name="dumbbell" size={29} color="#EA5D04" />
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

                        <Text style={styles.modalTitle}>Dados do Exercício</Text>
                        {dataExercicios && (
                            <>
                                <Text style={styles.modalText}>Código: {dataExercicios.codigo}</Text>
                                <Text style={styles.modalText}>Nome: {dataExercicios.nome}</Text>
                                <Text style={styles.modalText}>Descrição: {dataExercicios.descricao}</Text>
                                <Text style={styles.modalText}>Séries: {dataExercicios.serie}</Text>
                                <Text style={styles.modalText}>Repetições: {dataExercicios.repeticoes}</Text>
                                <Text style={styles.modalText}>Código do treino: {dataExercicios.codtreino}</Text>
                            </>
                        )}

                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => handleDelete(dataExercicios.codigo)}>
                                <Feather name="trash-2" size={40} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleEdit(dataExercicios)}>
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
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.ModalHeader}>
                            <Text style={styles.ModalTitle}>Editar Exercícios</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.BoxInputs}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Código"
                                    value={dataExercicios.codigo}
                                    onChangeText={(text) => setDataExercicios({ ...dataExercicios, codigo: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={dataExercicios.nome}
                                    onChangeText={(text) => setDataExercicios({ ...dataExercicios, nome: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Descrição"
                                    value={dataExercicios.descricao}
                                    onChangeText={(text) => setDataExercicios({ ...dataExercicios, descricao: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Séries"
                                    value={dataExercicios.serie}
                                    onChangeText={(text) => setDataExercicios({ ...dataExercicios, serie: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Repetições"
                                    value={dataExercicios.repeticoes}
                                    onChangeText={(text) => setDataExercicios({ ...dataExercicios, repeticoes: text })}
                                />

                                <Picker
                                    selectedValue={dataExercicios.codtreino}
                                    onValueChange={(itemValue) => {
                                        setDataExercicios({ ...dataExercicios, codtreino: itemValue });
                                        console.log('CodTreino selecionado:', itemValue);
                                    }}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Selecione um treino" value="" />
                                    {treinos.length > 0 ? (
                                        treinos.map((treino) => (
                                            <Picker.Item key={treino.codigo} label={treino.nome} value={treino.codigo} />
                                        ))
                                    ) : (
                                        <Picker.Item label="Nenhum treino disponível" value="" />
                                    )}
                                </Picker>
                            </View>

                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={handleUpdate}>
                                    <Text style={styles.txtBtn}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btns, styles.btnCancel]} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.txtBtn}>Cancelar</Text>
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
    video: {
        width: '80%',
        height: 300,
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