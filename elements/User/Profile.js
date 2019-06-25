import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    AsyncStorage,
    ListView,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import {Audio, Video, ImagePicker, Permissions} from 'expo';
import Loading from '../Loading/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Test from "../test";


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let playVideo = false;

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.playbackObject = new Audio.Sound();
        //this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
        this.state = {
            image: "https://www.dreamteam-portage.com/sites/default/files/temoignages/unknown-profil-consultant-dreamteam_0.jpg",
            banniere: "https://www.dijonlhebdo.fr/wp-content/themes/dijonlhebdo/img/placeholder.png",
            firstname: "Firstname",
            lastname: "Lastname",
            arrayHolder: {},
            abonnements: "0",
            abonnes: "0",
            age: "",
            poids: "",
            taille: "",
            ville: "",
            description: "Etudiant en développement informatique, titulaire d'un bac STI2D option SIN, j'ai toujours été passionné par l'informatique en général, je suis curieux et intéressé par ces technologie du quotidien et savoir comment elle fonctionne. Aujourd'hui je poursuis cette voie avec cette école, j'ai réalisé plusieurs projet (GITHUB), j'apprécie le travail en groupe et je suis actuellement en recherche d'un stage ou d'une alternance principalement dans le Web ou le Mobile (mais je reste ouvert aux autres proposition), cela me permettrait de mettre en pratique mes compétences rapidement et efficacement dans un cadre professionnel.",
            component_partage: true,
            component_audio: false,
            component_video: false,
            trackplayer: false,
            dataSource: ds.cloneWithRows([]),
            dataSource2: ds.cloneWithRows([]),
            loading: true,
            id: '',
            //loading: true,
            data: [
                {id: 1, title: "photo 1 ", time: "1 days a go", image: "https://lorempixel.com/400/200/nature/6/"},
                {id: 2, title: "photo 2 ", time: "2 minutes a go", image: "https://lorempixel.com/400/200/nature/5/"},
                {id: 3, title: "photo 3 ", time: "3 hour a go", image: "https://lorempixel.com/400/200/nature/4/"},
                {id: 4, title: "photo 4.", time: "4 months a go", image: "https://lorempixel.com/400/200/nature/6/"},
                {id: 5, title: "photo 5 ", time: "5 weeks a go", image: "https://lorempixel.com/400/200/sports/1/"},
                {id: 6, title: "photo 6 ", time: "6 year a go", image: "https://lorempixel.com/400/200/nature/8/"},
                {id: 7, title: "photo 7 ", time: "7 minutes a go", image: "https://lorempixel.com/400/200/nature/1/"},
                {id: 8, title: "photo 8 ", time: "8 days a go", image: "https://lorempixel.com/400/200/nature/3/"},
                {id: 9, title: "photo 9 ", time: "9 minutes a go", image: "https://lorempixel.com/400/200/nature/4/"},
            ],
        };

    }

    componentDidMount() {
        this.setState({loading : true})
        this.get_me();

    }

    play = async (url) => {
        console.log('PLAY ' + url);
        //this.setState({trackplayer: true});
        await this.playbackObject.loadAsync({uri: url});
        await this.playbackObject.playAsync();
    };

    // play = async () => {
    //     console.log('PLAY');
    //     this.setState({trackplayer: true});
    //     await this.playbackObject.loadAsync({uri: 'https://storage.googleapis.com/audio_space_art/5/06-A-lammoniaque.mp3'});
    //     await this.playbackObject.playAsync();
    // };

    stop = async () => {
        console.log('STOP');
        this.setState({trackplayer: false});
        await this.playbackObject.stopAsync();
        await this.playbackObject.unloadAsync();
    };

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    useCameraHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            base64: false,
        });

        if (!result.cancelled) {

        }
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
            this.setState({image: result.uri});
        }
    };
    _pickImage2 = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        alert("You don't choose a banner");
        console.log(result)

        if (!result.cancelled) {
            this.setState({banniere: result.uri});
        }
    };


    get_me() {

        AsyncStorage.getItem('id_user', (err, id_user) => {
            this.setState({id: id_user});

            let url = 'http://www.api-jaouad93.tk/api/profile/get_profile/' + this.state.id;
            axios.get(url)
                .then((response) => {
                    let data = response.data['successful'];
                    console.log(JSON.stringify(response.data));
                    console.log(data['successful']);
                    this.setState({
                            firstname: data['firstname'],
                            lastname: data['lastname'],
                            image: data['picture_url'],
                            age: data['age'],
                            poids: data['weight'],
                            taille: data['size'],
                            ville: data['city'],
                            description: data['description'],
                        },
                    );
                    this.get_audio();
                    this.get_video();
                })
                .catch(function (error) {
                    this.props.navigation.navigate('Disconnected')
                    console.log(error);
                })
        });
    }

    get_audio() {
        fetch('http://www.api-jaouad93.tk/api/audio/get_all_audio/' + this.state.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({dataSource: ds.cloneWithRows(responseJson['successful'])});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    get_video() {
        fetch('http://www.api-jaouad93.tk/api/video/get_all_video/' + this.state.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({dataSource2: ds.cloneWithRows(responseJson['successful']),loading: false});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        let {image} = this.state;
        let {banniere} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.header} source={{uri: banniere}}/>
                </View>
                <Image onPress={() => {
                    this._pickImage()
                }} style={styles.avatar} source={{uri: image}}/>
                <View style={{borderColor: '#742543', borderWidth: 1, backgroundColor: '#742543', height: 220}}>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginLeft: 30}}>
                        <Text style={styles.get}>{this.state.firstname} </Text>
                        <Text style={styles.get}>{this.state.lastname}</Text>
                    </View>
                    <View style={{flexDirection: 'row', inline: 'block'}}>
                        <TouchableOpacity style={{marginTop: 5, marginLeft: 5, marginRight: 10}}>
                            <Text style={{
                                fontSize: 15,
                                color: '#FFE400',
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: "#FFE400",
                            }} onPress={() => {
                                this.props.navigation.navigate('UpdateProfile', {
                                    firstname: this.state.firstname,
                                    lastname: this.state.lastname,
                                    age: this.state.age,
                                    poids: this.state.poids,
                                    taille: this.state.taille,
                                    ville: this.state.ville,
                                    description: this.state.description,
                                    image: this.state.image,
                                })
                            }}>Modifier le profil</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, color: "#fff"}}>Abonnements : {this.state.abonnements}</Text>
                        <Text style={{fontSize: 20, color: '#fff', marginLeft: 5}}> Abonnés
                            : {this.state.abonnes} </Text>
                    </View>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.profil}>Age : {this.state.age} ans</Text>
                            <Text style={styles.profil}>Poids : {this.state.poids} kg</Text>
                            <Text style={styles.profil}>Taille : {this.state.taille} cm</Text>
                            {/*<Text style={styles.profil}>Ville : {this.state.ville}</Text>*/}
                        </View>
                        <Text style={styles.profil}>Description : </Text>
                        <ScrollView style={{height: 75}}>
                            <Text style={styles.profil}>{this.state.description}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={{flexDirection: "row", alignSelf: "center"}}>
                    <TouchableOpacity><Text style={styles.partage} onPress={() => this.setState({
                        component_partage: true,
                        component_audio: false,
                        component_video: false
                    })}>Partage</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.audio} onPress={() => this.setState({
                        component_audio: true,
                        component_partage: false,
                        component_video: false
                    })}>Audio</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.video} onPress={() => this.setState({
                        component_video: true,
                        component_partage: false,
                        component_audio: false
                    })}>Video</Text></TouchableOpacity>
                </View>
                {
                    this.state.component_partage ?
                        <View style={{marginTop: 10}}>
                            <FlatList style={styles.list}
                                      data={this.state.data}
                                      keyExtractor={(item) => {
                                          return item.id;
                                      }}
                                      ItemSeparatorComponent={() => {
                                          return (
                                              <View style={styles.separator}/>
                                          )
                                      }}
                                      renderItem={(post) => {
                                          const item = post.item;
                                          return (
                                              <View style={styles.card}>

                                                  <View style={styles.cardHeader}>
                                                      <View>
                                                          <Text style={styles.title}>{item.title}</Text>
                                                          <Text style={styles.time}>{item.time}</Text>
                                                      </View>
                                                  </View>

                                                  <Image style={styles.cardImage} source={{uri: item.image}}/>

                                                  <View style={styles.cardFooter}>
                                                      <View style={styles.socialBarContainer}>
                                                          <View style={styles.socialBarSection}>
                                                              <TouchableOpacity style={styles.socialBarButton}>
                                                                  <Image style={styles.icon}
                                                                         source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
                                                                  <Text style={styles.socialBarLabel}>78</Text>
                                                              </TouchableOpacity>
                                                          </View>
                                                          <View style={styles.socialBarSection}>
                                                              <TouchableOpacity style={styles.socialBarButton}>
                                                                  <Image style={styles.icon}
                                                                         source={{uri: 'https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                                                                  <Text style={styles.socialBarLabel}>25</Text>
                                                              </TouchableOpacity>
                                                          </View>
                                                          <View style={styles.socialBarSection}>
                                                              <TouchableOpacity style={styles.socialBarButton}>
                                                                  <Image style={styles.icon}
                                                                         source={{uri: 'https://png.icons8.com/metro/75/3498db/administrator-male.png'}}/>
                                                                  <Text rkType='primary4 hintColor'
                                                                        style={styles.socialBarLabel}>13</Text>
                                                              </TouchableOpacity>
                                                          </View>
                                                      </View>
                                                  </View>
                                              </View>
                                          )
                                      }}/>
                        </View> : null
                }
                {
                    this.state.component_audio ?
                        <View style={{marginTop: 10}}>
                            <ScrollView style={{height: 275}}>
                                {
                                    <ListView dataSource={this.state.dataSource}
                                              renderRow={(rowData) =>

                                                  <TouchableOpacity style={styles.item} activeOpacity={0.4}>
                                                      <View style={styles.audio}>
                                                          <View style={{
                                                              flexDirection: 'row',
                                                              justifyContent: 'space-around',
                                                              paddingVertical: 10
                                                          }}>
                                                              <Text style={{
                                                                  fontSize: 20,
                                                                  color: '#ff3860'
                                                              }}>{rowData.titre.toUpperCase()}</Text>
                                                              <View style={{flexDirection: 'row'}}>
                                                                  <TouchableOpacity
                                                                      onPress={() => this.play(rowData.url)}><Text
                                                                      style={styles.audiobutton}>Play</Text></TouchableOpacity>
                                                                  <TouchableOpacity onPress={() => this.stop()}><Text
                                                                      style={styles.audiobutton}>Stop</Text></TouchableOpacity>
                                                              </View>
                                                          </View>
                                                      </View>
                                                  </TouchableOpacity>
                                              }/>

                                }
                            </ScrollView>
                        </View> : null

                }
                {
                    this.state.component_video ?
                        <View style={{marginTop: 10}}>
                            <ScrollView style={{height: 275}}>
                                {
                                    <ListView dataSource={this.state.dataSource2}
                                              renderRow={(rowData) =>

                                                  <TouchableOpacity style={styles.item} activeOpacity={0.4}>
                                                      <View style={styles.audio}>
                                                          <View style={{
                                                              flexDirection: 'row',
                                                              justifyContent: 'space-around',
                                                              paddingVertical: 10
                                                          }}>
                                                              <Video
                                                                  id={"video"}
                                                                  source={{uri: rowData.url}}
                                                                  rate={1.0}
                                                                  volume={1.0}
                                                                  isMuted={false}
                                                                  resizeMode="cover"
                                                                  shouldPlay
                                                                  isLooping
                                                                  style={{width: 120, height: 75}}
                                                              />
                                                              <Text style={{
                                                                  fontSize: 20,
                                                                  color: '#ff3860'
                                                              }}>{rowData.titre.toUpperCase()}</Text>
                                                              <View>
                                                                  <TouchableOpacity><Text style={styles.audiobutton}>Play</Text></TouchableOpacity>
                                                                  <TouchableOpacity><Text style={styles.audiobutton}>Stop</Text></TouchableOpacity>
                                                              </View>
                                                          </View>
                                                      </View>
                                                  </TouchableOpacity>
                                              }/>

                                }
                            </ScrollView>
                        </View> : null
                }

                {/*<TouchableOpacity style={styles.buttonContainer} onPress={this.get_me.bind(this)}>*/}
                {/*<Text>GET PROFILE</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.buttonContainer} onPress={this._pickImage}>*/}
                {/*<Text>Profile librairie</Text>*/}
                {/*</TouchableOpacflexDirection: 'row'ity>*/}
                {/*<TouchableOpacity style={styles.buttonContainer} onPress={this._pickImage2}>*/}
                {/*<Text>Banniere librairie</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.buttonContainer} onPress={this.useCameraHandler}>*/}
                {/*<Text>Camera + autorisations</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<Text style={{fontSize: 30, color: "#ff3860"}}>Audio :</Text>*/}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#581D33",
        flex: 1
    },
    header:{
        backgroundColor: "#ff3860",
        height:200,
    },
    edit: {
        position: 'absolute',
        marginTop: 25,
        marginLeft: 350,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 3,
        borderColor: "#FFE400",
        marginBottom:10,
        position: 'absolute',
        marginLeft: 10,
        marginTop: 130,
        zIndex: 2
    },
    get:{
        fontSize:20,
        color:"#fff",
        fontWeight:'600',
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#ff3860",
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:50,
        height:45,
        borderRadius:50,
        backgroundColor: '#ff3860',
    },
    title:{

        //marginLeft: ,
        color: '#581D33',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profil:{
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        color: '#fff'
    },
    partage: {
        color: "#FFE400",
        paddingHorizontal: 37,
        fontSize: 20,
        borderWidth: 2,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderColor: '#FFE400',
    },
    audio: {
        color: "#FFE400",
        paddingHorizontal: 37,
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#FFE400',
    },
    audiobutton: {
        fontSize: 15,
        color:'#581D33',
        backgroundColor: '#FFE400',
        marginRight: 5,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 'bold',
        width: 75
    },
    video:{
        color: "#FFE400",
        paddingHorizontal: 37,
        fontSize: 20,
        borderWidth: 2,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#FFE400',
    },
    list: {
        paddingHorizontal: 17,
        height: 275,
    },
    // separator: {
    //     marginTop: 10,
    // },

    card:{
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor:"#FFE400"
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        flex: 1,
        height: 150,
        width: null,
    },

    time:{
        fontSize:13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width:25,
        height:25,
    },

    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
            padding: 15
        },

    text: {
            fontSize: 18
        },

    separator: {
            height: 2,
            backgroundColor: '#ff3860'
        }
})
