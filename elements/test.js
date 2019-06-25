import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, StyleSheet, ActivityIndicator } from 'react-native';
import {Audio, Video, ImagePicker, Permissions} from 'expo';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Test extends Component
{

    constructor(props)
    {
        super(props);
        this.playbackObject = new Audio.Sound();
        this.state = { dataSource: ds.cloneWithRows([]), load: true };
    }

    componentDidMount()
    {
        fetch('http://www.api-jaouad93.tk/api/audio/get_all_audio/5')
            .then((response) => response.json())
            .then((responseJson) =>
            {
                this.setState({ dataSource: ds.cloneWithRows( responseJson['successful'] ) }, () => { this.setState({ loading: false }) });
            })
            .catch((error) =>
            {
                console.error(error);
            });
    }


    play = async (url) => {
        console.log('PLAY ' + url);
        //this.setState({trackplayer: true});
        await this.playbackObject.loadAsync({uri : url});
        await this.playbackObject.playAsync();
    };

    render()
    {
        return(
            <View style = { styles.container1 }>
                {
                    (this.state.load)
                        ?
                        (<ActivityIndicator size = "large"/>)
                        :

                        (<ListView style = {{ alignSelf: 'stretch' }}
                                   dataSource = { this.state.dataSource }
                                   renderRow = {( rowData ) =>
                                       <TouchableOpacity style = { styles.item } activeOpacity = { 0.4 }>
                                           <Text style = { styles.text }>{ rowData.titre.toUpperCase() }</Text>
                                           <TouchableOpacity onPress={() => this.play(rowData.url)} ><Text>play</Text></TouchableOpacity>
                                       </TouchableOpacity>
                                   }
                                   renderSeparator = {() =>
                                       <View style = { styles.separator }/>
                                   }
                                   enableEmptySections = { true }/>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container1:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },

        container2:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15
            },

        item:
            {
                padding: 15
            },

        text:
            {
                fontSize: 18
            },

        separator:
            {
                height: 2,
                backgroundColor: 'rgba(0,0,0,0.5)'
            }
    });
