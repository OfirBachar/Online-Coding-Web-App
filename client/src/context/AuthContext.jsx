 import { createContext, useState } from "react";
import PropTypes from "prop-types";


 export const AutoContext = createContext();

 export const AutoContextProvider = ({children}) => {
    const [codeBlock, setCodeBlock] = useState(null);


    const updateCodeBlock = (newCodeBlock) => {
        setCodeBlock(newCodeBlock);
    }

    return(
        <AutoContext.Provider
            value={{
                codeBlock,
                updateCodeBlock
            }}
        >{children}
        </AutoContext.Provider>
    )
 };


 AutoContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // This validates that 'children' is provided and is of type 'node'.
};
