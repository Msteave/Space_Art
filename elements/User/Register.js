import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Register :</Text>

                <TextInput value={this.state.firstname}
                           style={styles.textinput}
                           placeholder="Firstname"
                           onChangeText={(text) => this.setState({firstname: text})} />
                <TextInput value={this.state.lastname}
                           style={styles.textinput}
                           placeholder="Lastname"
                           onChangeText={(text) => this.setState({lastname: text})} />
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
                    axios.post('http://www.api-jaouad93.tk/api/users/create',{
                        firstname : this.state.firstname,
                        lastname : this.state.lastname,
                        email : this.state.email,
                        password: this.state.password,
                    }).then(response => {
                        console.log(response.data);
                        this.props.navigation.navigate('Login')
                    }).catch(error => {
                        console.log(error.response.data)
                        alert("Try again !")
                    })
                }}>
                   
                    <Text style={styles.textbutton} >REGISTER</Text>
                
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
                    <Text style={styles.loginbouton} >Already have an account?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize : 40,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#fbb448',
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
        color: '#fff',
        borderBottomColor: '#fbb448',
        borderBottomWidth: 1,
    },
    textbutton:{
        alignItems: "center",
        fontSize: 20,
        color: '#fbb448',
        marginTop: 20,
        marginBottom: 20
    },
    loginbouton:{
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#fff',
        marginLeft: 0,
    }
});

