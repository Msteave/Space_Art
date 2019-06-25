import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator,
    Image
} from 'react-native';
import axios from 'axios';
import {DocumentPicker} from "expo";

export default class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Ajouter un audio</Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                        <Text style={styles.textbutton} onPress={this._pickImage} >Choisir un fichier</Text>
                    </TouchableOpacity>


                <View style={{flexDirection: 'row-reverse'}}>
                    <TouchableOpacity onPress={() => {
                        console.log(this.state);
                        axios.post('http://www.api-jaouad93.tk/api/users/login',{
                            email : this.state.email,
                            password: this.state.password
                        }).then(response => {
                            let data = response.data;
                            AsyncStorage.setItem('token', data["jwt_token"], ()=> {
                                AsyncStorage.getItem('token',(err, token) => {
                                    console.log(token);
                                    this.props.navigation.navigate('Profile');
                                });
                            });
                        }).catch(error => {
                            console.log(error.response.data);
                            alert("Try again !")
                        })
                    }}>
                        <Text style={styles.textbutton} onPress={() => {this.props.navigation.navigate('Profile')}}>Enregister</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                        <Text style={styles.textbutton}>Retour</Text>
                    </TouchableOpacity>
                </View>
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
    header: {
        fontSize : 30,
        color: '#FFE400',
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#ff3860',
        borderBottomWidth: 1.5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 3,
        borderColor: "#FFE400",
        marginBottom: 10,
    },
    textinput: {
        textAlign: 'center',
        alignSelf: 'stretch',
        height: 40,
        fontSize: 20,
        marginLeft: 65,
        marginRight: 72,
        marginBottom: 5,
        color: '#FFE400',
        borderRadius: 15,
        borderTopColor: '#ff3860',
        borderRightColor: '#ff3860',
        borderLeftColor: '#ff3860',
        borderBottomColor: '#ff3860',
        borderTopWidth: 1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderBottomWidth: 1,
    },
    textinput2: {
        textAlign: 'center',
        alignSelf: 'stretch',
        height: 100,
        fontSize: 20,
        marginLeft: 65,
        marginRight: 72,
        marginBottom: 5,
        color: '#FFE400',
        borderRadius: 15,
        borderTopColor: '#ff3860',
        borderRightColor: '#ff3860',
        borderLeftColor: '#ff3860',
        borderBottomColor: '#ff3860',
        borderTopWidth: 1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderBottomWidth: 1,
    },
    textbutton:{
        alignItems: "center",
        fontSize: 20,
        color: '#742543',
        backgroundColor: '#FFE400',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center'
    },
    registerbouton:{
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#ff3860',
        marginLeft: 0,
    }
});
