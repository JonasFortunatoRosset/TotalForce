import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function ConfigPage() {
  const navigation = useNavigation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('codusuario');
      Alert.alert("Logout realizado com sucesso!");
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const toggleTheme = () => setIsDarkTheme(previousState => !previousState);
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  const handleChangePassword = () => {
    Alert.alert("Redefinir Senha", "Função para alterar senha não implementada.");
  };

  const handleSyncData = () => {
    Alert.alert("Sincronização", "Seus dados foram sincronizados com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Alternar Tema */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Modo Escuro</Text>
        <Switch
          trackColor={{ false: "#EB6808", true: "#FF914C" }}
          thumbColor={isDarkTheme ? "#ffffff" : "#FF914C"}
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>

      {/* Notificações */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch
          trackColor={{ false: "#EB6808", true: "#FF914C" }}
          thumbColor={isNotificationsEnabled ? "#ffffff" : "#FF914C"}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Alterar Senha */}
      <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
        <Text style={styles.settingText}>Alterar Senha</Text>
      </TouchableOpacity>

      {/* Sincronizar Dados */}
      <TouchableOpacity style={styles.settingItem} onPress={handleSyncData}>
        <Text style={styles.settingText}>Sincronizar Dados</Text>
      </TouchableOpacity>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF914C',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FF914C',
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#EB6808',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
