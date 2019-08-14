import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    base_nav: {
        backgroundColor: '#fff',
        height: 43,
    },
    header_nav: {
        position: 'relative',
        width: '100%',
        height: 120
    },
    backText: {
        position: 'absolute',
        left: 14,
        top: 12,
        zIndex: 10
    },
    back: {
        width: 16, 
        height: 16,
    },
    base_txt: {
        position: 'absolute',
        left: 0,
        top: 9,
        width: '100%',
        color: '#4a4a4a',
        fontSize: 18,
        textAlign: 'center',
        zIndex: 1
    },
    base_question: {
        position: 'absolute',
        top: 9,
        right: 14,
        fontSize: 14,
        color: '#567bff',
        zIndex:10
    },
    nav_list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        height:35,
        lineHeight: 35
    },
    small_txt: {
        fontSize: 10,
        color: '#9b9b9b',
        lineHeight: 35
    },
    small_des: {
        fontSize: 10,
        color: '#567bff',
        lineHeight: 35
    },
    content_list: {
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20
    },
    view_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 44,
        borderBottomWidth:1,
        borderStyle: 'solid',
        borderColor: '#f0f0f0'
    },
    list_label: {
        height: 44,
        lineHeight: 44,
        fontSize: 14,
        color: '#000117'
    },
    wechat_input: {
        width: '50%',
        textAlign: 'right'
    },
    addres_input: {
        width: '100%',
        textAlign: 'right'
    },
    list_con: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    change_txt: {
        color: '#9b9b9b',
        fontSize: 14,
        height: 44,
        lineHeight: 44
    },
    list_img: {
        marginTop: 16,
        width: 12,
        height: 12,
        marginLeft: 5
    },
    sm_txt: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#9b9b9b',
        fontSize: 14,
        height: 30,
        lineHeight: 30
    },
    base_bottom: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 10,
        paddingBottom: 20
    },
    view_btn: {
        width: '100%',
        height: 44,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        paddingTop: 6
    },
    btn_1: {
        width: '100%',
        height: 44,
        backgroundColor: '#bbcaff',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 44
    }
});