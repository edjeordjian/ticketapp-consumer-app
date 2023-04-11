import React from 'react';
import { View, Text } from 'react-native';

const BlankLine = (props) => {
    const auxArray = Array.from({
        length: props.number ? props.number : 1
    }, (_, idx) => idx);

    return (
        <View>
            {auxArray.map((idx) => (
                <Text key={idx} index={idx}>&nbsp;</Text>
            ))}
        </View>
    );
};

export {
    BlankLine
};
