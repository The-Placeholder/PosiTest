import axios from 'axios';
import { createContext, useState, useEffect, useRef } from 'react';

export const QuestionContext = createContext({});

export function QuestionContextProvider({ children }) {
  const [questionData, setquestionData] = useState(null);
  const [questionId, setquestionId] = useState(1);
  const prevQuestionId = useRef(questionId);
  // TODO usestate for user_response?

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const { data } = await axios.get(`/questions/${questionId}`);
        setquestionData(data);
        console.log('from axios questiondata', data);
      } catch (err) {
        return <div>Error getting userdata {err}</div>;
      }
    };

    if (questionId !== prevQuestionId.current) {
      getQuestion();
      prevQuestionId.current = questionId;
    }
  }, [questionData, questionId]);

  return (
    <QuestionContext.Provider value={{ questionData, setquestionId }}>
      {children}
    </QuestionContext.Provider>
  );
}
