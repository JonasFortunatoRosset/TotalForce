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
          <View key={goal.id} style={styles.boxmeta}>
            <View>
              <Text style={styles.txtbox}>{goal.title}</Text>
              <Text style={styles.txtbox}>{goal.date}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableHighlight onPress={() => toggleCompleted(goal.id)} underlayColor={null}>
                <Fontisto
                  name={goal.completed ? 'checkbox-active' : 'checkbox-passive'}
                  size={28}
                  color="black"
                />
              </TouchableHighlight>
              <TouchableHighlight underlayColor={null} style={styles.trash} onPress={() => deleteGoal(goal.id)}>
                <Feather name="trash-2" size={28} color="black"/>
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
                  maxLength={8}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Carga"
                  value={newLoad}
                  onChangeText={setNewLoad}
                  keyboardType='numeric'
                  maxLength={4}
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
                  <TouchableHighlight onPress={() => setShowEndPicker(true)} style={styles.calendarButton} underlayColor={null}>
                    <Feather name="calendar" size={24} color="black" />
                  </TouchableHighlight>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB031',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    alignItems: 'center',
  },
  boxmeta: {
    width: 280, 
    paddingVertical: 27, 
    paddingHorizontal: 15, 
    borderRadius: 15, 
    backgroundColor: '#FFB031', 
    alignItems: 'center', 
    marginBottom: 20, 
    elevation: 3, 
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  txtbox: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trash: {
    marginLeft: 10,
  },
  btnadd: {
    backgroundColor: '#FFB031',
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  ModalHeader: {
    backgroundColor: '#FFB031',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  ModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  modalBody: {
    alignItems: 'center',
  },
  BoxInputs: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#FFB031',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    color: '#000',
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB031',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  calendarButton: {
    marginLeft: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,

  },
  btns: {
    width: '48%',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5
  },
  btnSave: {
    backgroundColor: '#FFB031',
  },
  btnCancel: {
    backgroundColor: '#FFB031',
  },
  txtbtns: {
    fontSize: 16,
    color: '#000',
  },
});
