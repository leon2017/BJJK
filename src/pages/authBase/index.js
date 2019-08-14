import React, { Component } from 'react';
import { SafeAreaView, Dimensions, Text, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { merchantId } from '../../../api';
import commons from '../../../getItems';
const { width, height } = Dimensions.get('window');
import Contacts from 'react-native-contacts';


class AuthPhone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'd24f14b51d1f42dcae06057c9002ef17',
            userId: '',
            userName: '',
            token: '',
            merchantId: '',
            uri: '',
            contact: ''
        }
    }

    _onMessage(event) {
        let action = JSON.parse(event.nativeEvent.data),
            { navigate } = this.props.navigation;

        switch (action.type) {
            case 'auth_base_back':
                navigate('Authen');
                break;
        }
    }

    getPhoneList() {
        if (Platform.OS === 'ios') {
            
        } else {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.'
                }
            ).then(() => {
                Contacts.getAll((err, contacts) => {
                    if (err === 'denied') {
                        // error
                    } else {
                        // contacts returned in Array
                        this.setState({
                            contact: JSON.stringify(contacts)
                        })
                    }
                })
            })
        }
    }

    componentDidMount() {
        this.getPhoneList();
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    source={{ uri: `http://huopan-test.baijiajiekuan.com/rn_app/#/AuthBase?t=${new Date().getTime()}` }}
                    style={{ width: width, height: height }}
                    onMessage={event => {
                        this._onMessage(event);
                    }}
                >
                </WebView>

                <Text>{this.state.contact}</Text>
            </SafeAreaView>
        )
    }
}

export default AuthPhone;