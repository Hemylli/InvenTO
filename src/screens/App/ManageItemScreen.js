import React, {use, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput} from 'react-native';
import { styles } from '../../styles/AppStyles';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ManageItemScreen = () =>{
    const navigation = useNavigation();
}

const icons = {
    manage: require('../../../assets/icons/icone-editar.png')
}

export default function ManageItem(){
    const [busca, setBusca] = useState('');
    const [local, setLocal] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);

const handleSalvar = () =>{
    if (!nome || !local || !quantidade){
        Alert.alert('Error', 'preencha os dados corretamente.')
        return
    }
    Alert.alert('Sucesso', 'O item foi atualizado com sucesso.')
};

const handleExcluir = () =>{
    Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir?',
        [
            {text:'Cancelar', style:'cancel'},
            {text: 'Excluir', style:'destructive', onPress: () => Alert.alert('Item excluido com sucesso!') },
        ]
    );
};
return (
    <ScrollView style={styles.menuContainer}>
        <View style={styles.menuHeader}>
            <Ionicons name="arrow-back" size={24} color="#000"/>
            <Text style={styles.menuHeaderText}>Gerenciar Item</Text>
        </View>

        <TextInput
        style={styles.search}
        placeholder="Digite o nome ou local do item"
        value={busca}
        onChangeText={setBusca}
        />

        <TouchableOpacity>
            {imagem?(
                <Image source={{ url: imagem}} style={styles.Image} />
            ):(
                <Ionicons name="image-outline" size={80} color="#ccc" />         
            )}
        </TouchableOpacity>

        <TextInput
        style={styles.input}
        placeholder="Onde está localizado"
        value={local}
        onChangeText={setLocal}
        />

        
        <TextInput
        style={styles.input}
        placeholder="Nome do item"
        value={nome}
        onChangeText={setNome}
        />

        
        <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        />

        <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.saveText}>Salvar item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluir}>
            <text style={styles.deleteText}>Excluir item</text>            
        </TouchableOpacity>



    </ScrollView>

);
};




