import { IoArrowUpCircleOutline } from "react-icons/io5";
import { IoArrowDownCircleOutline } from "react-icons/io5";

import React, { useState } from "react";
import Looter from "./Looter";
import Navbar from "./Navbar";

const Faq = () => {

    let questions = [
        {
          question: "How you connect with giant industries",
          answer: "Apna Connection",
        },
        {
          question: "Most popular connection growing web site",
          answer: "Apna Connection",
        },
        {
          question:
            "DiD you know about that how any countries are using Apna Connection  Website",
          answer: "49 Countries",
        },
        {
          question:
            "DiD you know about that how many peoples are using Apna Connection Website",
          answer: "49 billions of people",
        },
        {
          question:
            "Do you know Anually Profit of Apna-connection websites is?",
          answer: "$3 Billions dollars ",
        },
      ];


        // State to manage visibility of answers
  const [visibleAnswers, setVisibleAnswers] = useState([]);

  // Function to toggle visibility of answer
  const toggleAnswer = (index) => {
    const newVisibleAnswers = [...visibleAnswers];
    newVisibleAnswers[index] = !newVisibleAnswers[index];
    setVisibleAnswers(newVisibleAnswers);
  };
  return (
   <>
    <div className=" w-full overflow-x-hidden">
      <Navbar />
    <div className="mt-[1rem] bg-[#2363ab] text-center p-[1rem] text-white font-bold text-[2rem] md:mt-[6rem]">
      Apna Connection Q & A
    </div>
    <div className=" mt-[5rem]">
      {questions.map((data, index) => (
        <div className=" flex justify-center w-screen mt-[18px]" key={index}>
          <div className=" border-2 w-[70vw]  p-[12px] rounded-md">
            <p onClick={() => toggleAnswer(index)} className=" flex justify-between items-center">
              <p>
              {data.question}
              </p>
              <p className="   cursor-pointer text-[2rem] ">
                {visibleAnswers[index] ? <IoArrowUpCircleOutline /> : <IoArrowDownCircleOutline />}
              </p>
            </p>
            {/* Toggle visibility based on state */}
            {visibleAnswers[index] && (
              <p className="mt-[1rem] relative">
                {data.answer}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className=" mt-[2rem]">
  <Looter />
  </div>
  </>
  )
}

export default Faq