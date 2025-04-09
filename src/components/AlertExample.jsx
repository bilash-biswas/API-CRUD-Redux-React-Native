import { View, Text, Button, Alert } from 'react-native'
import React from 'react'

const showAlert = () => {
    Alert.alert(
        'Alert Title',
        'Alert Message',
        [
            {
                text : 'Cancel',
                onPress : () => console.log('Cancel'),
                style : 'cancel',
            },
            {
                text : 'OK',
                onPress : () => console.log("OK"),
                style : 'destructive'
            }
        ],
        { cancelable : false }
    )
}

const AlertExample = () => {
    return (
        <View>
            <Text className='font-bold'>Alert Example</Text>
            <Button title='Show Alert' onPress={showAlert}/>
        </View>
    )
}

export default AlertExample