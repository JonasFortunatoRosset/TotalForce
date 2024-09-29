import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, TouchableHighlight, Modal, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

export function GoalsPage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newLoad, setNewLoad] = useState('');
  const [newStartDate, setNewStartDate] = useState(new Date());
  const [newEndDate, setNewEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const saveGoalsToStorage = async (goals) => {
    try {
      const jsonValue = JSON.stringify(goals);
      await AsyncStorage.setItem('@goals', jsonValue);
    } catch (e) {
      console.error('Erro ao salvar as metas:', e);
    }
  };

  const loadGoalsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@goals');
      if (jsonValue != null) {
        setGoals(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Erro ao carregar as metas:', e);
    }
  };

  useEffect(() => {
    loadGoalsFromStorage();
  }, []);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || newStartDate;
    setShowStartPicker(false);
    setNewStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || newEndDate;
    setShowEndPicker(false);
    setNewEndDate(currentDate);
  };

  const toggleCompleted = (id) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    saveGoalsToStorage(updatedGoals); 
  };

  const addNewGoal = () => {
    if (newTitle && newLoad && newStartDate && newEndDate) {

      const formattedStartDate = newStartDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const formattedEndDate = newEndDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

      const newGoal = {
        id: goals.length + 1,
        title: `${newLoad} Kg ${newTitle}`,
        date: `${formattedStartDate} até ${formattedEndDate}`,
        completed: false,
      };
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      saveGoalsToStorage(updatedGoals); 
      setModalVisible(false);
      setNewTitle('');
      setNewLoad('');
      setNewStartDate(new Date());
      setNewEndDate(new Date());
    } else {
      alert("Preencha todos os campos");
    }
  };

  const deleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    saveGoalsToStorage(updatedGoals); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.seta} underlayColor={null} onPress={() => navigation.navigate('HomePage')}>
          <AntDesign name="arrowleft" size={30} color="black"/>
        </TouchableHighlight>
        <View>
          <Text style={styles.txtheader}>Metas</Text>
        </View>
      </View>

      <View style={styles.body}>
        {goals.map((goal) => (
          <View key={goal.id} style={styles.boxnutri}>
            <View>
              <Text style={styles.txtbox}>{goal.title}</Text>
              <Text style={styles.txtbox}>{goal.date}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableHighlight onPress={() => toggleCompleted(goal.id)} underlayColor={null}>
                <Fontisto
                  name={goal.completed ? 'checkbox-active' : 'checkbox-passive'}
                  size={24}
                  color="black"
                />
              </TouchableHighlight>
              <TouchableHighlight style={styles.trash} onPress={() => deleteGoal(goal.id)}>
                <Feather name="trash-2" size={24} color="black"/>
              </TouchableHighlight>
            </View>
          </View>
        ))}

        <TouchableHighlight style={styles.btnadd} onPress={() => setModalVisible(true)} underlayColor={null}>
          <Text>Adicionar Meta</Text>
        </TouchableHighlight>
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
              <Text style={styles.ModalTitle}>Adicionar Metas</Text>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.BoxInputs}>
                <TextInput
                  style={styles.input}
                  placeholder="Exercício"
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Carga"
                  value={newLoad}
                  onChangeText={setNewLoad}
                />

                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.inputText}
                    value={newStartDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    editable={false}
                  />
                  <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.calendarButton}>
                    <Feather name="calendar" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                {showStartPicker && (
                  <DateTimePicker
                    value={newStartDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                  />
                )}

                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.inputText}
                    value={newEndDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    editable={false}
                  />
                  <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.calendarButton}>
                    <Feather name="calendar" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                {showEndPicker && (
                  <DateTimePicker
                    value={newEndDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEndDate}
                  />
                )}
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.btns, styles.btnSave]} onPress={addNewGoal}>
                  <Text style={styles.txtbtns}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btns, styles.btnCancel]} onPress={() => {
                  setModalVisible(false);
                  setNewTitle('');       
                  setNewLoad('');        
                  setNewStartDate(new Date());    
                  setNewEndDate(new Date());     
                }}>
                  <Text style={styles.txtbtns}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E49413',
    width: '100%',
  },
  seta: {
    marginRight: '27%',
  },
  trash: {
    marginLeft: 10,
  },
  txtheader: {
    fontSize: 50,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  boxnutri: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#E49413',
    width: 300,
    height: 110,
  },
  txtbox: {
    fontSize: 17,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnadd: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
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
   dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E49413',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
    width: 250,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  calendarButton: {
    marginLeft: 10,
  },
});

