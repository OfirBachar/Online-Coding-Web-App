import { createContext, useState, useEffect} from "react";
import { baseUrl, getRequest } from "../utils/services";
import PropTypes from "prop-types";


export const CodeBlocksContext = createContext();

export const CodeBlocksProvider = ({children}) => {

    const[codeBlocks, setCodeBlocks] = useState(null);
    const[iscodeBlocksLoading, setiscodeBlocksLoading] = useState(false);
    const[codeBlocksError, setcodeBlocksError] = useState(null);

    let blocksEntrances = [];

    useEffect(() => {
        const getCodeBlocks = async () => {

            setiscodeBlocksLoading(true);
            setcodeBlocksError(null);

            const response = await getRequest(`${baseUrl}/codeBlocks/`)

            setiscodeBlocksLoading(false);

            if(response.error){
                return setcodeBlocksError(response);
            }

            setCodeBlocks(response);
            blocksEntrances.length = response.length;

        };

        getCodeBlocks();
    }, []);


    return( 
        <CodeBlocksContext.Provider
            value = {{
                codeBlocks, 
                iscodeBlocksLoading,
                codeBlocksError,
            }}
        >
            {children}
        </CodeBlocksContext.Provider>
        
    );
};

CodeBlocksProvider.propTypes = {
    children: PropTypes.node.isRequired, // This validates that 'children' is provided and is of type 'node'.
};