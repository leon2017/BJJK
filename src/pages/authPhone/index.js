import React, { Component } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { merchantId } from '../../../api';
import commons from '../../../getItems';
const {width, height} = Dimensions.get('window');

class AuthPhone extends Component {

    constructor (props) {
        super(props);
        this.state= {
            apiKey: 'd24f14b51d1f42dcae06057c9002ef17',
            userId: '',
            userName: '',
            token: '',
            merchantId: '',
            uri: ''
        }
    }

    _onMessage (event) {

    }

    componentDidMount() {
        let _this = this;
        commons.getItemParams(this, function () {
            _this.setState({
                uri: `https://api.51datakey.com/h5/importV3/index.html#/carrier?apiKey=${_this.state.apiKey}&userId=${merchantId + ',' +  _this.state.userId}`
            });
        });

        setTimeout(function() {
            console.log(_this.state.uri);
        }, 1200)
    }
    

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView 
                     style={{width: width, height: height}}
                     source={{uri: this.state.uri }}
                     onMessage={ event => {
                         this._onMessage(event);
                     } }   
                >
                </WebView>
            </SafeAreaView>
        )
    }
}

export default AuthPhone;