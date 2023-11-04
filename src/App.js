
import './App.css';
import gptLogo from "./assets/chatgpt.webp";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.png"
import home from "./assets/home.png"
import rocket from "./assets/rocket.png"
import saved from "./assets/bookmark.png"
import sendBtn from "./assets/send.png"
import gptImgLogo from "./assets/chatgptLogo.png"
import userIcon from "./assets/user-icon.png"

import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';


function App() {

  const msgEnd = useRef(null);

  const [input, setInput] = useState(" ");
  const [ messages,setMessages] = useState([
    {
      text: "Hi, I am ChatGPT, What you have to ask",
      isBot:true,
    }
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])


  const handleSend= async () =>{
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true}
    ]);
  }

  const handleEnter =async(e)=>{
    if (e.key ==='Enter') await handleSend();
  }

  const handleQuery = async (e)=>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true}
    ]);
  }

  return (
      // <h1>hey there</h1>
    <div className="App">
      <div className="sidebar">
          <div className="upperSide">
              <div className="upperSideTop"><img src={gptLogo} alt="logo" className='logo'/>  <span className="brand">ChatGPT</span>
                <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt="addBtn" className='addBtn'/>New Chat</button>
                </div>
                <div className="upperSideBottom">
                  <button className="query" onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="msI" />What is Programming ?</button>
                  <button className="query" onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon}alt="msI" />How to use an API ?</button>
                
              </div>
          </div>
          <div className="lowerSide">
              <div className="listItems"><img src={home} alt="home" className="listitemsImg" />Home</div>
              <div className="listItems"><img src={saved} alt="saved" className="listitemsImg" />Saved</div>
              <div className="listItems"><img src={rocket} alt="rocket" className="listitemsImg" />Upgrade to pro</div>
          </div>
      </div>
      <div className="main">
          <div className="chats">
            
            
            {messages.map((message, i)=>
                <div key={i} className={message.isBot?"chat bot":"chat"}>
                <img className="chatImg" src={message.isBot?gptImgLogo:userIcon} alt="userIcon" /> <p className="txt">{ message.text }</p>
                </div>
            )}
            <div ref={msgEnd}/>
          </div>

          <div className="chatFooter">
            <div className="inp">
              <input type="text" placeholder="Send a message" value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} /><button className="send" onClick={handleSend}  ><img src={sendBtn} alt="send" /></button>
            </div>
            <p>ChatGPT can make mistakes. Verify important information.</p>
          </div>
      </div>

    </div>
  );
  }

export default App;
