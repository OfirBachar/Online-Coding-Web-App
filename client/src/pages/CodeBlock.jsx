import { useContext, useState, useEffect } from "react";
import { AutoContext } from "../context/AuthContext";
import { Link } from "react-router-dom"
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import smiley_face from "../asserts/smiley_face.svg"

const server_url = 'http://localhost:5000';

const CodeBlock = () => {

  const {codeBlock} = useContext(AutoContext);
  const [userType, setUserType] = useState(null);
  const [code, setCode] = useState("");
  const [solution, setSolution] = useState("");
  const [title, setTitle] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [userId] = useState(Math.floor(Math.random() * 100000));
  const [rightAnswer, setRightAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [socketEdit, setSocketEdit] = useState();

  const updateCodeBlock = (newCodeBlock) => {
    setSolution(newCodeBlock.solution);
    setCode(newCodeBlock.code);
    setTitle(newCodeBlock.title);
}

  useEffect(() => {
    const socket = io(server_url);
    setSocketEdit(socket);

    socket.on("connect", () => {
      updateCodeBlock(codeBlock);

      socket.emit("send-code-block-title", {
        codeBlockTitle: title,
        userId: userId,
        codeBlock: codeBlock
      });
    });

    socket.on("receive-codeBlock", (data) => {
      if (!data) return;
        if (userType) return;
        setUserType({
          user: data.user,
          isMentor: data.isMentor,
        });
    });

    socket.on("solve-exercise", () => {
      setRightAnswer(true);
    });

    socket.on("receive-changes", (newCode) => {
      if (!newCode) return;
      if (userType?.isMentor) {
        setCodeValue(newCode);
      }
    });

    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("disconnect", () => {
      console.log("server disconnected");
    });
    return () => {
      socket.emit("remove-user", { codeBlockTitle: title, userId: userId });
      socket.disconnect();
    };
  }, [codeBlock, title, userId, userType]);

  const checkCodeblock = () => {

    console.log("code:", codeValue?.toString());
    console.log("solution", solution?.toString());

    if (codeValue?.toString() === solution?.toString()) {
      setRightAnswer(true);
      setWrongAnswer(false);
      socketEdit.emit("correct-answer", title);
    } else{
      setRightAnswer(false);
      setWrongAnswer(true);
    }
  };

  const handleEditorChange = (codeValue) => {
    setCode(codeValue);
    socketEdit.emit("send-changes", { title, code: codeValue });
  };

  return (
    <>
      {codeBlock ? (
        <>
          <div className="codeBlock-container">
            <div className="codeBlock-title">
              <h1> Welcome to {codeBlock?.title} code block!</h1>
            </div>
            {rightAnswer ? (
              <div className="correct-answer">
                <img src={smiley_face} width="300" alt="smile picture" />
                <h2>Correct answer, good job</h2>
                <Link to={"/"}>
                  <button className="btn correct-btn">
                    <h4>Check out more exercises</h4>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="editor">

                {userType?.isMentor ? (
                  <h4>mentor user: read only</h4>
                ) : (
                  <h4>student user: edit code <br /><br />
                    Try to fix the code :</h4>

                )}
                <div className="editor-container">
                  <Editor
                    options={{ readOnly: userType?.isMentor }}
                    theme="vs-dark"
                    height="300px"
                    width="80%"
                    onChange={handleEditorChange}
                    value={codeValue ? codeValue : code}
                    defaultLanguage="javascript"
                    defaultValue={code}
                  />
                </div>
                <div className="check-code-btn">
                    {userType?.isMentor ? (
                      null
                    ) : (
                      <button
                      onClick={checkCodeblock}>
                      check code
                    </button>
                    )}
                    <Link to={"/"}>
                      <button className="btn correct-btn">
                        <h4>Check out more exercises</h4>
                      </button>
                    </Link>
                  <div>
                    {wrongAnswer ? (
                    <h4 className="Wrong-Answer-title">
                      Wrong answer, try again
                    </h4>
                  ) : null}

                  </div>
                </div>

              </div>
            )}
          </div>
        </>
      ) : (
        "loading"
      )}
    </>
  );

};
 
export default CodeBlock;

{/* <Container>
<div className="CodeBlock">
    <header className="header-container">
        <h1> Welcome to {codeBlock?.title} code block!</h1>
    </header>
    <div className="body-container">
      {codeBlock ? 
        (<div className="code-block">
              <h4>Try to fix the code...</h4>

            <h2> {"Code Block title:"} {codeBlock?.title}</h2>
            <div className="code-check">
              {equalToTheSolution ? ( 
                <div className="correct-answer">
                  <img src={smiley_face} height="300px"/>
                  <h2>Correct answer, good job</h2>
                    <Link to={"/"}>
                      <button className="btn correct-btn">
                        <h4>Check out more exercises</h4>
                      </button>
                    </Link>
                </div>
            ) : null}
            </div>
            <div className="mode"> 
              {userType?.isMentor ? (
                  <h4>mentor user: read only</h4>
                ) : (
                  <h4>student user: edit code </h4>
                )}
            </div>
            <div className="editor-code">
                <Editor
                  options={{ readOnly: userType?.isMentor }}
                  theme="vs-dark"
                  height="300px"
                  width="80%"
                  onChange={handleEditorChange}
                  value={code ? code : codeBlock.Code}
                  defaultLanguage="javascript"
                  defaultValue={codeBlock.CodeToEdit}
                />
              </div>
          </div>
     ) : ( <div>{<p>No code block with this id...</p>}</div>)}
    </div>
</div>
</Container> */}