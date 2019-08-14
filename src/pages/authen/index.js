import React, { Component } from 'react';
import { SafeAreaView , ScrollView, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window');

class Authen extends Component {
    constructor (props) {
        super(props);
    }
    _onMessage(event) {
        let action = JSON.parse(event.nativeEvent.data),
            {navigate} = this.props.navigation;
        
            switch (action.type) {
                case 'auth_phone':
                    navigate('AuthPhone');
                    break;
                case 'auth_base':
                    navigate('AuthBase');
                    break;
            }
    }

    render () {
        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                        style={{width: width, height: height}}
                        source={{uri: 'http://huopan-test.baijiajiekuan.com/rn_app/#/ThreeAction'}}
                        onMessage={ event => {
                            this._onMessage(event);
                        } }    
                    >
                    </WebView>
            </SafeAreaView>
        )
    }
}

export default Authen;