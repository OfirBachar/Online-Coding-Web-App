import { useContext } from "react";
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CodeBlocksContext } from "../context/CodeBlocksContext";
import { AutoContext } from "../context/AuthContext";


const Lobby = () => {
    const {updateCodeBlock} = useContext(AutoContext);
    const {codeBlocks, iscodeBlocksLoading, codeBlocksError} = useContext(CodeBlocksContext)

    return (
        <Container>
            <div className="Lobby">
                <header className="header-container">
                    <h1> Hi welcome to our online coding web app!</h1>
                    <h3> Choose code block:</h3>
                </header>
                <div className="body-container">
                    {iscodeBlocksLoading && <p>Loading code blocks...</p>}
                    {codeBlocks ? (
                    codeBlocks.map((codeBlock, index) => (
                    <Link to={`/codeBlock/${codeBlock._id}`} key={index} onClick={() => updateCodeBlock(codeBlock)}>
                        <div className="code-block-link">
                            <h2> {index +1}. {codeBlock?.title}</h2>
                        </div>
                    </Link>
                    ))
                    ) : 
                    <div>{codeBlocksError && <p>No code blocks in the DB...</p>}</div>
                }
                </div>
            </div>
        </Container>
      );
    
};
 
export default Lobby;

