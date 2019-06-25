import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default class Disconnected extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disconnected : "https://capricornreview.co.za/wp-content/uploads/sites/71/2015/09/disconnected-icon-0926020829.png"
        }
    }

    render() {
        let { disconnected } = this.state;
        return (
            <View style={styles.container}>
                <Image style={{height: 200, width: 200}} source={{uri: disconnected}} />
                <Text style={{fontSize: 30, marginTop: 10, color:'#FFE400'}}>Pas de connexion</Text>
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
