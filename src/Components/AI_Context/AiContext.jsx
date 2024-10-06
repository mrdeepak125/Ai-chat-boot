import { createContext, useContext, useState } from "react";
import runChat from "../../Config/Baymax";
import { PiArrowArcRight } from "react-icons/pi";
import { FaCopy } from "react-icons/fa";  // Icon for the copy button
import Loader from "../Loader/Loader"; // Import your loader component

const Ai_context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [allprompt, setAllprompt] = useState([]);
  const [allresponse, setAllresponse] = useState([]);
  const [loader, setLoader] = useState(false);
  const [history, setHistory] = useState(false);
  const [recent, setRecent] = useState("");
  const [recentans, setRecentans] = useState("");
  const [menu, setMenu] = useState(true);
  const [mobile, setMobile] = useState(true);

  // Function to send a prompt to the AI
  const sent = async (prompt) => {
    setQuestion(prompt);
    setLoader(true);

    const response = await runChat(prompt);

    // Remove "**" and replace "*" with numbered points
    let cleanedResponse = response.replace(/\*\*/g, "");
    
    // Split the response into lines and detect lines that should be numbered
    const lines = cleanedResponse.split("\n");
    let count = 1;  // Initialize numbering
    const formattedResponse = lines.map((line, index) => {
      // If the line starts with "*", replace it with a numbered point
      if (line.trim().startsWith("* ")) {
        return (
          <p key={index}>
            {count++}. {line.trim().substring(2)} {/* Remove "* " from the start */}
          </p>
        );
      } else {
        return <p key={index}>{line}</p>;
      }
    });

    setAnswer(formattedResponse);
    setAllresponse([...allresponse, cleanedResponse]);
    setLoader(false);
  };

  // Function to copy AI answer to clipboard
  const copyToClipboard = () => {
    // Copy the raw cleaned answer (joined by \n for proper formatting)
    const plainAnswer = answer.map((item) => item.props.children).join("\n");
    navigator.clipboard.writeText(plainAnswer);
    alert("Answer copied to clipboard!");
  };

  const passData = {
    data,
    setData,
    sent,
    prompt,
    setPrompt,
    question,
    answer,
    allprompt,
    setAllprompt,
    loader,
    setLoader,
    allresponse,
    setAllresponse,
    history,
    setHistory,
    recent,
    setRecent,
    recentans,
    setRecentans,
    menu,
    setMenu,
    mobile,
    setMobile,
    copyToClipboard
  };

  return <Ai_context.Provider value={passData}>{children}</Ai_context.Provider>;
};

const Myprovider = () => {
  return useContext(Ai_context);
};

export { Ai_context, Myprovider, ContextProvider };
