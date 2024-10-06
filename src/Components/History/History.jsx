import React, { useEffect } from 'react';
import { Myprovider } from '../AI_Context/AiContext';
import { SiProbot } from "react-icons/si";
import { BiImageAdd } from "react-icons/bi";
import { MdMicNone } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { IoReorderThreeOutline } from "react-icons/io5";

const History = () => {
    const { recentans, data, setData, sent, recent, setPrompt, allprompt, setAllprompt, mobile, setMobile } = Myprovider();
    console.log(recentans);

    // Load history from local storage on mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('responseHistory')) || [];
        setAllprompt(savedHistory);
    }, [setAllprompt]);

    // Save history to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('responseHistory', JSON.stringify(allprompt));
    }, [allprompt]);

    const handleChange = (e) => {
        setData(e.target.value);
    };

    const handleClick = () => {
        if (data.trim().length === 0) {
            alert("Please enter a prompt");
        } else {
            sent(data);
            setData("");
            setPrompt(true);
            setAllprompt(prev => {
                const newPromptList = [...prev, data];
                localStorage.setItem('responseHistory', JSON.stringify(newPromptList)); // Save to local storage
                return newPromptList;
            });
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleClick(); // Use handleClick for consistency
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Delete") {
            setPrompt(false);
            setAllprompt([]); // Clear all history
            localStorage.removeItem('responseHistory'); // Clear from local storage
        }
    };

    // Remove a specific response from history
    const removeResponse = (index) => {
        setAllprompt(prev => {
            const newPromptList = prev.filter((_, i) => i !== index);
            localStorage.setItem('responseHistory', JSON.stringify(newPromptList)); // Update local storage
            return newPromptList;
        });
    };

    // Listen for keydown events for deletion
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown); // Cleanup
        };
    }, []);

    return (
        <>
            <div className="lg:w-screen sm:w-screen w-screen flex flex-col items-center overflow-y-scroll scroll-smooth">
                <div className="lg:w-[50rem] sm:w-80 h-screen bg-white flex flex-col justify-between">
                    <div className="lg:w-10/12 sm:w-96 h-10 bg-white flex justify-between items-center p-2">
                        <div
                            title="Collapse menu"
                            className="w-10 h-10 lg:hidden sm:block flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-200"
                        >
                            <IoReorderThreeOutline
                                className="text-2xl sm:block"
                                onClick={() => setMobile(!mobile)}
                            />
                        </div>
                        <h1 className="text-xl ms-2">Baymax AI</h1>
                        <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrs-0HLtv6pOKjkX0sDAfskoGGHnQJiEr_VlwgyjcWA&s"
                                className="w-screen"
                                alt="User Avatar"
                            />
                        </div>
                    </div>

                    <div className="lg:w-[50rem] sm:w-96 flex items-center gap-2 p-3">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrs-0HLtv6pOKjkX0sDAfskoGGHnQJiEr_VlwgyjcWA&s"
                                className="w-screen"
                                alt="AI Avatar"
                            />
                        </div>

                        <div>
                            <h1>{recent}</h1>
                        </div>
                    </div>

                    <div className="lg:w-10/12 sm:w-[25rem] h-96 flex gap-2 p-3 overflow-auto">
                        <div className="w-7 flex justify-center">
                            <SiProbot className="text-3xl my-5" style={{ color: "#698fb7" }} />
                        </div>
                        <div>
                            <p className="text-md text-wrap font-serif my-7">
                                {recentans ? recentans.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                )) : "No response available."} {/* Handle undefined recentans */}
                            </p>
                        </div>
                    </div>

                    <div className="w-12/12 bg-white flex items-center relative">
                        <input
                            type="text"
                            placeholder="Enter a prompt here"
                            className="w-full flex-1 outline-none h-16 ps-3 rounded-full"
                            style={{ background: "#F0F4F9" }}
                            value={data}
                            onChange={handleChange}
                            onKeyDown={handleKey}
                        />

                        <div className="flex text-2xl gap-2 items-center absolute right-2">
                            <BiImageAdd />
                            <MdMicNone />
                            {data.length === 0 ? null : <LuSendHorizonal onClick={handleClick} />}
                        </div>
                    </div>
                    <h1 className="text-center">The answer provided by this AI tool could be wrong, so don't take it seriously.</h1>
                </div>
                {/* Displaying history */}
                <div className="lg:w-10/12 sm:w-96 mt-4">
                    <h2 className="text-lg font-semibold">History</h2>
                    <ul className="list-disc pl-5">
                        {allprompt.map((prompt, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{prompt}</span>
                                <button onClick={() => removeResponse(index)} className="text-red-500">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default History;
