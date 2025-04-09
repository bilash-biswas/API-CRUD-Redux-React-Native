import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchStudent } from '../FetchStudent';
import { setStudents, setLoading, setError } from '../../redux/studentSlice';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { students, loading, error} = useSelector(state => state.student);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                const studentData = await fetchStudent();
    
                if (Array.isArray(studentData) && studentData.length > 0) {
                    dispatch(setStudents(studentData));
                } else {
                    dispatch(setError("No students found in database."));
                }
            } catch (err) {
                dispatch(setError(err.message));
            } finally {
                dispatch(setLoading(false));
            }
        };
    
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if(searchQuery.trim() === "") {
            setFilteredStudents(students);
        }else {
            const filtered = students.filter(student => 
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStudents(filtered);
        }
    }, [searchQuery, students]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('Add New Student')}>
                    <Text style={styles.addButton}>Add</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]); 

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading students...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>❌ Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                    style={styles.searchInput}
                    placeholder="Search students by name or email..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
            {filteredStudents.length === 0 ? (
                <Text style={styles.noStudentText}>No students found</Text>
            ) : (
                <FlatList
                    data={filteredStudents}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            style={styles.studentItem}
                            onPress={() => navigation.navigate('Update Student', { student : item})}
                        >
                            <Text style={styles.studentText}>📌 {item.name}</Text>
                            <Text style={styles.studentEmail}>{item.email}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    studentItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    studentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    studentEmail: {
        fontSize: 16,
        color: '#555',
    },
    noStudentText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
        padding: 20,
        borderRadius: 10,
    },
    errorText: {
        color: '#721c24',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton : {
        padding: 5, 
        borderRadius: 10, 
        fontWeight:'bold',
        borderWidth:1, 
        borderColor:'purple', 
        color: 'black', 
        marginRight: 15, 
        fontSize: 16 
    }
});