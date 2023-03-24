import {useMainContext} from "../../services/contexts/MainContext";

import {useEffect} from "react/cjs/react.production.min";

import {View} from 'react-native';

const Exit = () => {
    const {signOut} = useMainContext();

    useEffect( () => {
        signOut();
    }, [] );

    return (
        <View>
        </View>
    );
};

export {
    Exit
};
