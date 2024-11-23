import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.header}>
        <TouchableHighlight onPress={() => navigation.goBack()} style={styles.backButton} underlayColor={null}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableHighlight>
        <Text style={styles.title}>Configurações</Text>
      </View>

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

      {/* Alterar Foto de Perfil */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Alterar Foto", "Função para alterar foto não implementada.")}>
        <Text style={styles.settingText}>Alterar Foto de Perfil</Text>
      </TouchableOpacity>

      {/* Gerenciamento de Conta */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Conta", "Função de gerenciamento de conta em desenvolvimento.")}>
        <Text style={styles.settingText}>Gerenciamento de Conta</Text>
      </TouchableOpacity>

      {/* Histórico de Atividades */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Histórico", "Seu histórico foi carregado.")}>
        <Text style={styles.settingText}>Histórico de Atividades</Text>
      </TouchableOpacity>

      {/* Feedback */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Feedback", "Obrigado pelo seu feedback!")}>
        <Text style={styles.settingText}>Enviar Feedback</Text>
      </TouchableOpacity>

      {/* Idioma */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Idioma", "Função para alterar idioma não implementada.")}>
        <Text style={styles.settingText}>Alterar Idioma</Text>
      </TouchableOpacity>

      {/* Privacidade */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Privacidade", "Função para configurar privacidade não implementada.")}>
        <Text style={styles.settingText}>Configurações de Privacidade</Text>
      </TouchableOpacity>

      {/* Limpar Cache */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Limpar Cache", "Cache limpo com sucesso!")}>
        <Text style={styles.settingText}>Limpar Cache</Text>
      </TouchableOpacity>

      {/* Atualizações */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Atualizações", "Aplicativo está atualizado!")}>
        <Text style={styles.settingText}>Verificar Atualizações</Text>
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
  header: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 12,
    marginTop: 25,
  },
  backButton: {
    paddingRight: '20%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9756',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FF9756',
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
