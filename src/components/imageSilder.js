import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    PanResponder,
    Animated,
    Image,
    Text,
    TouchableHighlight,
    Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');


/**
 * 图片轮播组件
 * 必有属性：
 *  images:['http://....']，图片链接数组
 * 可选属性：
 *  width: 默认100%
 *  height: 默认150
 *  autoplay: 默认false
 *  throttleDis: 滑动大于多少距离就显示下一张。默认100
 *  throttleTime: 滑动时间，快于多少就显示下一张
 *  loopDur 自动播放时，每一张的间隔时间，默认2000 (单位ms)
 * 
 * @export
 * @class ImageSlider
 * @extends {Component}
 */

export default class ImageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPosX: 0,
            posAni: new Animated.Value(0),
            index: 0,
            touching: false,
        }
        this.defaultOption = {
            height: 150,
            throttleTime:500, //ms
            throttleDis:100,
            loopDur:2000 //ms
        }
    }
    componentWillMount() {
        let startX;
        let prePosX;
        let throttleDis = this.props.throttleDis ? this.props.throttleDis : this.defaultOption.throttleDis,
            throttleTime = this.props.throttleTime ? this.props.throttleTime : this.defaultOption.throttleTime,
            startTime;

        /**
         * 触摸处理
         */
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                return true;
            },
            onPanResponderStart: (evt) => {
                this._stopMoving();
                this._stopAutoPlay();

                startX = evt.nativeEvent.pageX;
                prePosX = this.state.curPosX;
                startTime = Date.now();
                this.setState({ touching: true })
            },
            onPanResponderMove: (evt) => {
                this.setState({
                    curPosX: prePosX + evt.nativeEvent.pageX - startX
                })
            },
            onPanResponderRelease: (evt) => {
                this.setState({ touching: false });

                let dis = evt.nativeEvent.pageX - startX;
                let time = Date.now() - startTime;
                let direct = 0;

                if (dis < 0) {
                    if (dis < -throttleDis || time < throttleTime) {
                        direct = -1;
                    }
                } else if (dis > 0) {
                    if (dis > throttleDis || time < throttleTime) {
                        direct = 1;
                    }
                }

                this._moveTo(this.state.index - direct)
            }
        });
    }
    componentDidMount() {
        if (this.props.autoplay)
            this._autoPlay();
    }

    componentWillUnmount() {
        this._stopAutoPlay();
    }

    /**
     * 停止动画
     */
    _stopMoving() {
        this.state.posAni.stopAnimation((val) => {
            this.state.curPosX = val;
            this.setState({ curPosX: val });//使用setState设置不会立即生效
        })
    }

    /**
     * 跳转到第几张
     * 
     * @param {any} index 索引
     * @param {any} loop 是否循环
     * 
     * @memberOf ImageSlider
     */
    _moveTo(index, loop) {
        if (index < 0)
            index = 0;
        else if (index >= this.props.images.length) {
            index = loop ? 0 : this.props.images.length - 1;
        }

        this.state.posAni.setValue(this.state.curPosX);

        Animated.timing(this.state.posAni, {
            toValue: -Dimensions.get('window').width * index
        }).start(() => {
            this.setState({ index, curPosX: -Dimensions.get('window').width * index });
            this._startAutoPlay()
        });

    }

    /**
     * 跳转到下一张
     * 
     * 
     * @memberOf ImageSlider
     */
    _moveToNext() {
        this._moveTo(this.state.index + 1, true);
    }

    _autoPlay() {
        this.timer = setTimeout(() => {
            this._moveToNext();
        }, this.props.loopDur ? this.props.loopDur : this.defaultOption.loopDur)
    }

    _stopAutoPlay() {
        clearTimeout(this.timer);
    }

    _startAutoPlay() {
        if (!this.props.autoplay)
            return;
        this._stopAutoPlay();
        this._autoPlay();
    }

    /**
     * 下方的按键事件
     * 
     * @param {any} index 按键索引值
     * 
     * @memberOf ImageSlider
     */
    _btnPress(index) {
        this._stopAutoPlay();
        this._moveTo(index);
    }

    render() {
        this.width = this.props.width ? this.props.width : Dimensions.get('window').width;
        this.height = this.props.height ? this.props.height : this.defaultOption.height;
        return (
            <View  style={{width: width - 40, height:135, marginLeft: 20, overflow: 'hidden'}}>
                <Animated.View
                    style={{
                        height: this.height,
                        width: this.width * this.props.images.length,
                        left: this.state.touching ? this.state.curPosX : this.state.posAni,
                        flexDirection: 'row'
                    }}
                    {...this._panResponder.panHandlers}>
                    {this.props.images.map((image, index) => {
                        return (<Image source={{ uri: image }} style={{ height: this.height, width: this.width }} key={index}></Image>)
                    })}
                </Animated.View>
                <View style={styles.buttons}>
                    {this.props.images.map((image, index) => {
                        return (<TouchableHighlight
                            key={index}
                            underlayColor="#ccc"
                            onPress={() => this._btnPress(index)}
                            style={[styles.button, this.state.index === index ? styles.buttonSelected : {}]}>
                            <View></View>
                        </TouchableHighlight>);
                    })}
                </View>
            </View>
        );
    }
}

/**
 * 样式
 */
const styles = StyleSheet.create({
    buttons: {
        height: 15,
        marginTop: -15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        margin: 3,
        width: 8,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        opacity: 0.9
    },
    buttonSelected: {
        opacity: 1,
        backgroundColor: '#fff',
    }
});