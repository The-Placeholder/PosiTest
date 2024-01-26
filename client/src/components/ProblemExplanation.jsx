import { QuestionContext } from '../../context/QuestionContext';
import { useContext } from 'react';

const ProblemExplanation = () => {
  const { questionData } = useContext(QuestionContext);

  return (
    <div>
      <h1>problem explanation</h1>
    </div>
  );
};

export default ProblemExplanation;
