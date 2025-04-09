import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';

const StatusBarExample = () => {
    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="rgba(0,0,0,0.2)"
                translucent={false}
            />
            <Text style={styles.text}>
                Status Bar
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCA5A5', // Equivalent to red-300
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3B82F6', // Equivalent to blue-500
    }
});

export default StatusBarExample;
