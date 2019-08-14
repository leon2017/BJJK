import React, { Component } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window');


class LoginH5 extends Component {

    constructor (props) {
        super(props);
    }

    _onMessage (event) {
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation;

        switch(action.type) {
            case 'sendSmsCode' :
                navigate('SetCode', {
                    mobile: action.mobile
                });
                break;
            
            case 'passwordLogin':
                navigate('PLogin');
                break;
            
            default:
                break;
        }
        
    }

    render () {
        
        return  (
            <SafeAreaView style={{flex:1}}>
                 <WebView
                    style={{width: width, height: height}}
                    source={{uri: 'http://huopan-test.baijiajiekuan.com/rn_app/#/login'}} //  uri: 'http://huopan-test.baijiajiekuan.com/rn_app/#/login'
                    onMessage={ event => {
                        this._onMessage(event);
                    } }    
                >
                </WebView>
            </SafeAreaView>
        )
    }
}

export default LoginH5;