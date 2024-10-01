import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export function Teste() {
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  // Função para solicitar permissão ao abrir a galeria
  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão da galeria para isso funcionar!');
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    // Selecionar a imagem da galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      // Converter a imagem selecionada para Base64 e atualizar o estado
      convertImageToBase64(selectedImageUri);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      // Ler o arquivo como Base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);
    } catch (error) {
      console.error('Erro ao converter imagem para base64:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
      )}
      {base64Image && (
        <Text style={{ marginTop: 20 }}>Base64: {base64Image.substring()}...</Text> // Mostrar os primeiros 100 caracteres
      )}
    </View>
  );
}