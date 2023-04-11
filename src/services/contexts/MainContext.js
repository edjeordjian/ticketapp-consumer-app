import React from 'react'

const MainContext = React.createContext(undefined);

const useMainContext = () => {
    const context = React.useContext(MainContext);

    if (! context){
        throw new Error("Context must be inside the provider");
    }

    return context;
};

export {
    MainContext, useMainContext
};
