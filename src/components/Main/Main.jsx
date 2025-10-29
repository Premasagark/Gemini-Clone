import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context.jsx";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main flex-1 min-h-screen pb-[15px] relative">
      <div className="nav flex items-center justify-between text-[22px] p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="rounded-full h-10" src={assets.user_icon} alt="icon" />
      </div>

      <div className="main-container max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className="greet my-[50px] text-[56px] text-[#c4c7c5] font-[500px]">
              <p>
                <span>Hello,Client</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beatiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Breifly summarize this concept: Fuel cell energy</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Imporve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title my-10 mx-0 flex items-center gap-5">
              <img src={assets.user_icon} alt="icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data flex items-start gap-5 ">
              <img src={assets.gemini_icon} alt="icon" />
              {loading ? (
                <div className="loader w-full flex flex-col gap-2.5">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-[900px] px-5 m-auto">
          <div className="search-box flex items-center justify-between gap-5 bg-[#f0f4f9] py-2.5 px-5 rounded-[50px]">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-1 bg-transparent border-0 outline-0 p-2 text-[18px]"
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="flex items-center gap-[15px]">
              <img src={assets.gallery_icon} alt="icon" />
              <img src={assets.mic_icon} alt="icon" />
              {input?(<img onClick={() => onSent()} src={assets.send_icon} alt="icon" />):(null)}
            </div>
          </div>
          <p className="bottom-info text-[13px] my-[15px] mx-auto text-center font-[300px]">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
