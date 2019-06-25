import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import axios from 'axios';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Login :</Text>
                <TextInput value={this.state.email}
                           style={styles.textinput}
                           placeholder="Email"
                           onChangeText={(text) => this.setState({email: text})} />
                <TextInput value={this.state.password}
                           style={styles.textinput}
                           secureTextEntry={true}
                           placeholder="Password"
                           onChangeText={(text) => this.setState({password: text})} />
                <TouchableOpacity onPress={() => {
                    console.log(this.state);

                    axios.post('http://www.api-jaouad93.tk/api/users/login',{
                        email : this.state.email,
                        password: this.state.password
                    }).then(response => {
                        let data = response.data;
                        console.log(response.data)
                        AsyncStorage.setItem('token', data["jwt_token"], ()=>{
                            AsyncStorage.setItem('id_user', JSON.stringify(data["id_user"]), ()=> {
                                this.props.navigation.navigate('Profile');
                            });
                        });

                    }).catch(error => {
                        console.log(error.response.data);
                        alert("Try again !")
                    })
                }}>
                    <Text style={styles.textbutton}>CONNECT</Text>
                </TouchableOpacity>
                {/*<ActivityIndicator size="large" color="#ff3860" />*/}
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Register')}}>
                    <Text style={styles.registerbouton}>You do not have an account ?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize : 40,
        color: '#000',
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#ff3860',
        borderBottomWidth: 1.5,
    },
    textinput: {
        textAlign: 'center',
        alignSelf: 'stretch',
        height: 40,
        fontSize: 20,
        marginTop: 40,
        marginLeft: 65,
        marginRight: 72,
        marginBottom: 20,
        color: '#000',
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
        color: '#fff',
        backgroundColor: '#ff3860',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
    },
    registerbouton:{
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#ff3860',
        marginLeft: 0,
    }
});
