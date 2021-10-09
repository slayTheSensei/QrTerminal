import * as React from 'react';
import { Text, View, StyleSheet, ImageURISource, TouchableOpacity } from 'react-native';
import Icon from '../Assets/Icon';
import { COLORS } from './Colors';

interface HeaderProps {
    onClose: () => void;
    title: string;
    price: string;
}

const Header = (props: HeaderProps) => {
    const { title, onClose, price } = props
    return (
        <View style={styles.container}>
            <View style={styles.back}>
                <TouchableOpacity onPress={onClose}>
                    <Icon type="Close" />
                </TouchableOpacity>
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.titleText}>{price}</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: COLORS.vinylBlack,
        borderBottomColor: COLORS.vinylGrey,
        borderBottomWidth: .4,
    },
    title: {
        flex: .33,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 18
    },
    back: {
        flex: .33,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
    },
    backText: {
        color: 'white',
    },
    right: {
        flex: .33,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
    }
});
