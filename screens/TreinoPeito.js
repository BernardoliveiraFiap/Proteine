import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

const TreinoPeito = () => {
  const [exercicios, setExercicios] = useState([
    { id: '1', nome: 'Supino Reto', concluido: false },
    // Adicione mais exercícios conforme necessário
  ]);

  const [inputExercicio, setInputExercicio] = useState('');
  const [editingExercicioId, setEditingExercicioId] = useState(null);

  const adicionarExercicio = () => {
    if (inputExercicio) {
      setExercicios((prevExercicios) => [
        ...prevExercicios,
        { id: Date.now().toString(), nome: inputExercicio, concluido: false }
      ]);
      setInputExercicio('');
    }
  };

  const excluirExercicio = (id) => {
    setExercicios((prevExercicios) => prevExercicios.filter((ex) => ex.id !== id));
  };

  const alternarConclusaoExercicio = (id) => {
    setExercicios((prevExercicios) =>
      prevExercicios.map((ex) =>
        ex.id === id ? { ...ex, concluido: !ex.concluido } : ex
      )
    );
  };

  const editarExercicio = (id) => {
    setEditingExercicioId(id);
    const exercicioEditado = exercicios.find((ex) => ex.id === id);
    setInputExercicio(exercicioEditado.nome);
  };

  const salvarEdicaoExercicio = () => {
    if (inputExercicio && editingExercicioId) {
      setExercicios((prevExercicios) =>
        prevExercicios.map((ex) =>
          ex.id === editingExercicioId ? { ...ex, nome: inputExercicio } : ex
        )
      );
      setInputExercicio('');
      setEditingExercicioId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {exercicios.map((item) => (
          <View key={item.id} style={[styles.item, item.concluido ? styles.concluidoItem : null]}>
            <TextInput
              value={item.nome}
              editable={false}
              multiline={true}
              style={[styles.input, { flex: 1 }]}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => alternarConclusaoExercicio(item.id)}>
                <Text style={[styles.button, styles.concluidoButton, item.concluido ? styles.concluidoButtonText : null]}>
                  {item.concluido ? 'Concluído' : 'Concluir'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editarExercicio(item.id)}>
                <Text style={[styles.button, styles.editarButton]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirExercicio(item.id)}>
                <Text style={[styles.button, styles.excluirButton]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <TextInput
          value={inputExercicio}
          onChangeText={(text) => setInputExercicio(text)}
          placeholder="Novo Exercício"
          placeholderTextColor="white"
          style={[styles.input, { flex: 1 }]}
          multiline={true}
        />
        <TouchableOpacity onPress={editingExercicioId ? salvarEdicaoExercicio : adicionarExercicio} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>{editingExercicioId ? 'Salvar' : '+'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'column',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#333', // Cor adicionada ao item
  },
  concluidoItem: {
    backgroundColor: 'green',
  },
  input: {
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  concluidoButton: {
    backgroundColor: 'green',
  },
  concluidoButtonText: {
    color: 'black',
  },
  editarButton: {
    backgroundColor: 'blue',
  },
  excluirButton: {
    backgroundColor: 'red',
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 20,
  },
});

export default TreinoPeito;
