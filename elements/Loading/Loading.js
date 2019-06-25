import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export default class Loading extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FFE400" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#742543',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
