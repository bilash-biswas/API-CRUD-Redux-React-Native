import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { addStudent } from '../AddStudent';
import { setStudents } from '../../redux/studentSlice';
import { fetchStudent } from '../FetchStudent';
import { useDispatch } from 'react-redux';

const AddStudentScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleAddStudent = async () => {
        if (name.length === 0 || email.length === 0) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }


        try {
            const response = await addStudent({ name, email });
            
            if (response.success) {
                const students = await fetchStudent();
                dispatch(setStudents(students));
                Alert.alert('Success', response.message, [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    }
                ]);
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <TextInput
                    value={name}
                    placeholder='Enter Name'
                    onChangeText={setName}
                    style={[styles.input, { marginBottom: 20 }]}
                    keyboardType='default'
                    placeholderTextColor='gray'
                />

                <TextInput
                    value={email}
                    placeholder='Enter Email'
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType='email-address'
                    placeholderTextColor='gray'
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddStudent}
                >
                    <Text style={styles.buttonText}>
                        Add Student
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'lightgray',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '90%',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: 'black',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});