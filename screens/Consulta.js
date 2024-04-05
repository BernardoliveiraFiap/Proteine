import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsultaScreen = () => {
  const [records, setRecords] = useState([]);
  const [gramsInput, setGramsInput] = useState({});
  const [proteinOutput, setProteinOutput] = useState({});

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const savedRecords = await AsyncStorage.getItem('records');
      if (savedRecords !== null) {
        const parsedRecords = JSON.parse(savedRecords);
        if (Array.isArray(parsedRecords)) {
          setRecords(parsedRecords);
        } else {
          console.warn('Os registros salvos não estão no formato de array:', parsedRecords);
        }
      } else {
        console.warn('Nenhum registro encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  const foodItems = [
    { name: 'Filé de Frango', proteinPer100g: 23 },
    { name: 'Ovo (com gema)', proteinPerUnit: 6 },
    { name: 'Ovo (sem gema)', proteinPerUnit: 3 },
    { name: 'Contrafilé', proteinPer100g: 21 },
    { name: 'Shake de Whey', proteinPerUnit: 30 },
  ];

  const calculateProtein = (foodName, grams) => {
    let protein = 0;
    if (foodName === 'Ovo (com gema)' || foodName === 'Ovo (sem gema)' || foodName === 'Shake de Whey') {
      protein = foodItems.find(item => item.name === foodName).proteinPerUnit * grams;
    } else {
      protein = (foodItems.find(item => item.name === foodName).proteinPer100g / 100) * grams;
    }
    setProteinOutput(prevState => ({ ...prevState, [foodName]: protein }));
  };

  const saveRecord = async (foodName) => {
    try {
      const record = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        foodName: foodName,
        gramsConsumed: gramsInput[foodName],
        proteinConsumed: proteinOutput[foodName],
        createdAt: new Date().toLocaleString(),
      };
      const updatedRecords = [...records, record];
      setRecords(updatedRecords);
      await AsyncStorage.setItem('records', JSON.stringify(updatedRecords));
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
      Alert.alert('Erro', 'Houve um erro ao salvar o registro. Por favor, tente novamente.');
    }
  };

  const deleteRecord = async (id) => {
    try {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
      await AsyncStorage.setItem('records', JSON.stringify(updatedRecords));
      Alert.alert('Sucesso', 'Registro deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o registro:', error);
      Alert.alert('Erro', 'Houve um erro ao deletar o registro. Por favor, tente novamente.');
    }
  };

  const clearRecords = async () => {
    try {
      await AsyncStorage.removeItem('records');
      setRecords([]);
      Alert.alert('Sucesso', 'Registros limpos com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar registros:', error);
      Alert.alert('Erro', 'Houve um erro ao limpar os registros. Por favor, tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho "Alimentos" */}
      <View style={styles.header}>
        <Icon name="" size={20} color="#007bff" />
        <Text style={[styles.headerTitle, styles.whiteText]}>Alimentos</Text>
      </View>

      {/* Renderização dos itens de alimentação */}
      {foodItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {item.name === 'Shake de Whey' ? (
            <Icon name="glass" size={50} color="#007bff" />
          ) : (
            <Icon name="cutlery" size={50} color="#007bff" />
          )}
          <Text style={[styles.title, styles.whiteText]}>{item.name}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={item.name.includes('Ovo') ? "Quantidade (unidade)" : "Quantidade (g)"}
              value={gramsInput[item.name]}
              onChangeText={(value) => setGramsInput(prevState => ({ ...prevState, [item.name]: value }))}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity onPress={() => calculateProtein(item.name, gramsInput[item.name])}>
            <Text style={[styles.button, styles.whiteText]}>Calcular Proteína</Text>
          </TouchableOpacity>
          {proteinOutput[item.name] && (
            <Text style={[styles.info, styles.whiteText]}>Proteína: {proteinOutput[item.name]}g</Text>
          )}
          <TouchableOpacity onPress={() => saveRecord(item.name)}>
            <Text style={[styles.button, styles.whiteText]}>Salvar Registro</Text>
          </TouchableOpacity>
          <View style={styles.itemSpacer} />
        </View>
      ))}

      {/* Espaçamento abaixo dos itens de alimentação */}
      <View style={styles.bottomSpacer} />

      {/* Lista de registros salvos */}
      <View style={styles.recordList}>
        <Text style={[styles.title, styles.whiteText]}>Registros Salvos</Text>
        <TouchableOpacity onPress={clearRecords}>
          <Text style={[styles.link, styles.whiteText]}>Limpar Registros</Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.info, styles.whiteText]}>Clique em um registro para deletá-lo:</Text>
          <View>
            {records.map((record) => (
              <TouchableOpacity key={record.id} onPress={() => deleteRecord(record.id)}>
                <Text style={[styles.record, styles.whiteText]}>
                  {record.foodName} - {record.gramsConsumed}g - {record.proteinConsumed}g de proteína - {record.createdAt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Adiciona espaço abaixo do cabeçalho "Alimentos"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20, 
    marginBottom: 30,
  },
  itemContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bottomSpacer: {
    height: 20, // Espaçamento abaixo dos itens de alimentação
  },
  recordList: {
    marginTop: 20,
  },
  record: {
    marginBottom: 5,
  },
  link: {
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  info: {
    marginBottom: 5,
  },
  whiteText: {
    color: '#fff',
  },
  itemSpacer: {
    marginBottom: 60, // Adiciona espaçamento após o item de alimentação
  },
});

export default ConsultaScreen;
