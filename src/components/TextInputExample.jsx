import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const TextInputExample = () => {
    const [email, setEmail] = useState('');
    return (
        <View>
            <Text style={styles.container}>TextInputExample</Text>
            <Text style={styles.container}>{email}</Text>
            <TextInput 
                style={styles.input}
                placeholder='Enter Your email.'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
                multiline
                numberOfLines={10}
            />
        </View>
    )
}

export default TextInputExample

const styles = StyleSheet.create({
    container : {
        fontSize : 20,
        fontWeight : 'bold',
        width:'100%'
    },
    input : {
        borderWidth : 1,
        borderColor : 'red',
        borderRadius : 10,
        padding : 10,
        width : '100%'
    }
});