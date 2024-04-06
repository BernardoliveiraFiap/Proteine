import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const PeitoTricepsScreen = () => {
  const [exercicios, setExercicios] = useState([
    { id: 1, nome: 'Supino com Halter - 3x10', concluido: false },
    { id: 2, nome: 'Fly Maquina - 3x10', concluido: false },
    { id: 3, nome: 'Supino Inclinado Maquina - 3x10', concluido: false },
    { id: 4, nome: 'Cross Over Polia Alta - 3x10', concluido: false },
    { id: 5, nome: 'Triceps Barra V - 3x10', concluido: false },
    { id: 6, nome: 'Triceps Polia com Corda - 3x10', concluido: false },
    { id: 7, nome: 'Triceps Testa Polia com Corda - 3x10', concluido: false },
    { id: 8, nome: 'Triceps Banco - 3x10', concluido: false },
    { id: 9, nome: '', concluido: false }, // ID vazio para adicionar no futuro
    { id: 10, nome: '', concluido: false }, // ID vazio para adicionar no futuro
    { id: 11, nome: '', concluido: false }, // ID vazio para adicionar no futuro
  ]);

  const handleEdit = (id, novoNome) => {
    const updatedExercicios = exercicios.map(exercicio => {
      if (exercicio.id === id) {
        return { ...exercicio, nome: novoNome };
      }
      return exercicio;
    });
    setExercicios(updatedExercicios);
    AsyncStorage.setItem('OmbrosExercicios', JSON.stringify(updatedExercicios));
  };

  const toggleConcluido = (id) => {
    const updatedExercicios = exercicios.map(exercicio => {
      if (exercicio.id === id) {
        return { ...exercicio, concluido: !exercicio.concluido };
      }
      return exercicio;
    });
    setExercicios(updatedExercicios);
    AsyncStorage.setItem('OmbrosExercicios', JSON.stringify(updatedExercicios));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true}>
        <FlatList
          data={exercicios}
          renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: item.concluido ? 'green' : 'black' }]}>
              <TextInput
                value={item.nome}
                onChangeText={(text) => handleEdit(item.id, text)}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => toggleConcluido(item.id)}>
                <Text style={styles.concluidoButton}>
                  {item.concluido ? 'Concluído' : 'Não Concluído'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  list: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    minWidth: 200,
  },
  input: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  concluidoButton: {
    color: 'white',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
});

export default PeitoTricepsScreen;
