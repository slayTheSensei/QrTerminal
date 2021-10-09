import * as React from 'react';
import { Text, View, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';
import { COLORS } from './Colors';

interface InlineCheckBoxProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

const InlineCheckBox = (props: InlineCheckBoxProps) => {

    const { label, onPress, selected } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <CheckBox style={styles.checkbox} value={selected} />
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default InlineCheckBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },
    checkbox: {
        marginLeft: 24,
        height: 20,
        width: 20,
        marginRight: 12,
    },
    label: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16
    }
});
