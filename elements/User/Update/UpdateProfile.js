import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image
} from 'react-native';
import axios from 'axios';
import {ImagePicker, Permissions} from "expo";

export default class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "https://www.dreamteam-portage.com/sites/default/files/temoignages/unknown-profil-consultant-dreamteam_0.jpg",
            firstname: "",
            lastname: "",
            age: "0",
            poids: "0",
            taille: "0",
            ville: "none",
            description: "...",
            token: ""
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("token").then((value) => {
            this.setState({"token": value});
        }).done();
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    _pickImage = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        alert("You don't choose a picture");
        console.log(result)

        if (!result.cancelled) {
            console.log(this.state.image)
            this.setState({ image: result.uri});
            console.log(this.state.image)
        }
    };

    render() {
        //let { image } = this.props.navigation.getParam('image');
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Modifier le profile</Text>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.avatar} source={{uri : this.state.image}}/>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                        <Text style={styles.textbutton2} onPress={this._pickImage} >Changer la photo</Text>
                        <TouchableOpacity onPress={() => {
                            console.log(this.state.token)
                            axios.put('http://www.api-jaouad93.tk/api/profile/update_picture',{
                                picture: this.state.image
                            },{
                                headers: {
                                    'api-token' : this.state.token
                                }
                            }).then(response => {
                                console.log(response.data);
                            }).catch(error => {
                                console.log(error.response.data)
                                alert("Try again !")
                            })
                        }
                        }>
                            <Text style={styles.textbutton2}>Enregister</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <TextInput //value={this.props.navigation.getParam('firstname')}
                           style={styles.textinput}
                           placeholder="firstname"
                           onChangeText={(text) => this.setState({firstname: text})} />
                <TextInput //value={this.props.navigation.getParam('lastname')}
                           style={styles.textinput}
                           placeholder="lastname"
                           onChangeText={(text) => this.setState({lastname: text})} />
                <TextInput //value={this.props.navigation.getParam('age')}
                           style={styles.textinput}
                           placeholder="age"
                           onChangeText={(text) => this.setState({age: text})} />
                <TextInput //value={this.props.navigation.getParam('poids')}
                           style={styles.textinput}
                           placeholder="poids"
                           onChangeText={(text) => this.setState({poids: text})} />
                <TextInput //value={this.props.navigation.getParam('taille')}
                           style={styles.textinput}
                           placeholder="taille"
                           onChangeText={(text) => this.setState({taille: text})} />
                {/*<TextInput //value={this.props.navigation.getParam('ville')}*/}
                           {/*style={styles.textinput}*/}
                           {/*placeholder="ville"*/}
                           {/*onChangeText={(text) => this.setState({ville: text})} />*/}
                <TextInput //value={this.props.navigation.getParam('description')}
                           multiline = {true}
                           style={styles.textinput2}
                           placeholder="description"
                           onChangeText={(text) => this.setState({description: text})} />

                           <View style={{flexDirection: 'row-reverse'}}>
                               <TouchableOpacity onPress={() => {
                                   console.log(this.state.token)
                                   axios.put('http://www.api-jaouad93.tk/api/profile/update',{
                                       firstname : this.state.firstname,
                                       lastname : this.state.lastname,
                                       age : this.state.age,
                                       weight : this.state.poids,
                                       size : this.state.taille,
                                       city : this.state.ville,
                                       description : this.state.description
                                   },{
                                       headers: {
                                           'api-token' : this.state.token
                                       }
                                   }).then(response => {
                                       console.log(response.data);
                                       this.props.navigation.navigate('Profile')
                                   }).catch(error => {
                                       console.log(error.response.data)
                                       alert("Try again !")
                                   })
                               }
                               }>
                                    <Text style={styles.textbutton}>Enregister</Text>
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
    textbutton2:{
        alignItems: "center",
        fontSize: 15,
        color: '#742543',
        backgroundColor: '#FFE400',
        marginTop: 10,
        marginLeft: 10,
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
