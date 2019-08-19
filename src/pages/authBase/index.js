import React, { Component } from 'react';
import { SafeAreaView, Dimensions, Text, Alert, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { merchantId } from '../../../api';
import commons from '../../../getItems';
import Toast from 'react-native-easy-toast';
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
            contacts: [],
            phoneList: []
        }
    }

    dealJson (contacts) {
        this.setState({
            phoneList: []
        });
        let list = [];
        for (var i = 0; i < contacts.length; i++) {
            list.push({
                name: contacts[i].givenName + ' ' + contacts[i].familyName,
                id: contacts[i].recordID,
                number: contacts[i].phoneNumbers.length ? contacts[i].phoneNumbers[0].number : []
            });
        }
        this.setState({
            phoneList: list
        });
    }

    _onMessage(event) {
        let action = JSON.parse(event.nativeEvent.data),
            { navigate } = this.props.navigation;

        switch (action.type) {
            case 'auth_base_back':
                navigate('Authen');
                break;
            case 'get_phone_list':
                this.refs.webview.injectJavaScript(`receiveMessage(${JSON.stringify(this.state.phoneList)}); false;`);
                break;
        }
    }

    getPhoneList() {
        let _this = this;
        if(Platform.OS === 'ios') {
            Contacts.getAll((err, contacts) => {
                if (err) {
                    _this.refs.toast.show("获取手机通讯录失败");
                    return false;
                }
                this.dealJson(contacts);
            });
        } else {

            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.'
                }
            )
            .then( () => {
            Contacts.getAll((err, contacts) => {
                    if (err === 'denied'){
                        _this.refs.toast.show("获取手机通讯录失败");
                        return false;
                    } else {
                        _this.dealJson(contacts);
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
                    ref="webview"
                    source={{ uri: `http://huopan-test.baijiajiekuan.com/rn_app/#/AuthBase?t=${new Date().getTime()}` }}
                    style={{ width: width, height: height }}
                    onMessage={event => {
                        this._onMessage(event);
                    }}
                >
                </WebView>
                <Toast position="center" ref="toast"/>
                
            </SafeAreaView>
        )
    }
}

export default AuthPhone;