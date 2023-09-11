import{Routes, Route, Navigate} from "react-router-dom";
import  Lobby  from "./pages/Lobby";
import  CodeBlock  from "./pages/CodeBlock";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CodeBlocksProvider } from "./context/CodeBlocksContext";

function App() {
  return (
    <CodeBlocksProvider>
      <Container>
        <Routes>
          <Route path="/" element ={<Lobby />} />
          <Route path="/CodeBlock/:codeBlockId" element ={ <CodeBlock/>} />
          <Route path="*" element ={<Navigate to="/" />} />
        </Routes>
      </Container>
    </CodeBlocksProvider>
  );
}

export default App;