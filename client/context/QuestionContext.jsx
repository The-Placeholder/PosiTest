import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const QuestionContext = createContext({});

export function QuestionContextProvider({ children }) {
  const [questionData, setquestionData] = useState(null);
  const [questionId, setquestionId] = useState(1);
  // TODO usestate for user_response?

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const { data } = await axios.get(`/question/${questionId}`);
        setquestionData(data);
        console.log('from axios', data);
      } catch (err) {
        return <div>Error getting userdata {err}</div>;
      }
      if (!questionData && questionId) {
        getQuestion();
      }
    };
  }, [questionData, questionId]);

  return (
    <QuestionContext.Provider value={{ questionData, setquestionId }}>
      {children}
    </QuestionContext.Provider>
  );
}
