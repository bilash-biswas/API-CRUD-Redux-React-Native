import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateStudent } from '../UpdateStudent';
import { deleteStudent } from '../DeleteStudent';
import { setStudents } from '../../redux/studentSlice';
import { useDispatch } from 'react-redux';
import { fetchStudent } from '../FetchStudent';

const UpdateStudentScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { student } = route.params;
    const dispatch = useDispatch();

    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);

    const handleUpdate = async () => {
        const message = await updateStudent({ id: student.id, name, email });
        alert(message);

        const response = await fetchStudent();
        dispatch(setStudents(response));

        navigation.goBack();
    };

    const handleDelete = async () => {
        Alert.alert(
            "Delete Student", 
            "Are you sure you want to delete this student?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {},
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const message = await deleteStudent(student.id);
                            const response = await fetchStudent();
                            dispatch(setStudents(response)); 
                            navigation.goBack(); 
                        } catch (error) {
                            Alert.alert("Error", error.message || "An error occurred while deleting the student.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Enter name" 
            />
            <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail} 
                placeholder="Enter email" 
            />

            <TouchableOpacity
                onPress={handleUpdate}
                style={styles.updateButton}
            >
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteButton}
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateStudentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    updateButton: {
        backgroundColor: 'blue',
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
