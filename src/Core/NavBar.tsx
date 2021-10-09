import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Icon from '../Assets/Icon';
import { useHistory } from '../Router/index';
import { COLORS } from './Colors';
import { dimentions } from './Metrics';

interface NavBarProps { }

const NavBar = (props: NavBarProps) => {
    let history = useHistory()
    const [route, setRoute] = useState('')
    const walletActiveColor = route === 'wallet' && { color: COLORS.skyGrey }
    const OrderInactiveColor = route !== 'order' && { tintColor: COLORS.lightGrey }



    useEffect(() => {
        return history.listen((location: any) => {
            const currentRoute = location.pathname.split('/')[1]
            setRoute(currentRoute)
        })
    }, [history])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flex: .33 }} onPress={() => history.push('/wallet')}>
                <View>
                    <Text style={[styles.text, walletActiveColor]}>$32</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: .33, alignItems: 'center' }} onPress={() => history.push('/order')}>
                <View>
                    <Image style={[{ width: 38, height: 29 }, OrderInactiveColor]} source={'https://i.imgur.com/6MSKabx.png' as ImageSourcePropType} />
                </View>
            </TouchableOpacity>
            <View style={{ flex: .33, alignItems: 'flex-end' }}>
                {/* <Text style={styles.text}>Profile</Text> */}
            </View>
        </View>
    );
};

export default NavBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: dimentions.fullWidth,
        backgroundColor: COLORS.vinylBlack,
        paddingHorizontal: 48,
        borderTopWidth: .3,
        borderTopColor: COLORS.vinylGrey
    },
    text: {
        color: COLORS.lightGrey,
        fontSize: 18,
        fontFamily: 'Avenir-Black'
    }
});
