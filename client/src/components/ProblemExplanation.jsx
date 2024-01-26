import { QuestionContext } from '../../context/QuestionContext';
import { useContext } from 'react';

const ProblemExplanation = () => {
  const { questionData } = useContext(QuestionContext);

  return (
    <div className="flex flex-row flex-wrap w-full h-full p-8 bg-slate-800/80 rounded-2xl ">
      <h1 className="text-2xl text-white">
        <span className="g-orange font-bold">Question:</span>{' '}
        {questionData.the_question}
      </h1>
      <div id="answer" className="w-full">
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">See Answer</div>
          <div className="collapse-content">
            {questionData.the_answer}
            <div>
              {`What has four wings and flies? a garbage truck! i'm so cold, i can
              use my nose drippings as chopsticks. isn't this great squidward?
              it's just the 3 of us. you, me, and this brick wall you built
              between us. the inner machinations of my mind are an enigma.
              you're a man now, spongebob, and it's time you started acting like
              one. can you give spongebob his brain back, i had to borrow it for
              the week. did you hear about the goldfish that went bankrupted?
              now he's a bronzefish. plankton: 1% evil, 99% hot gas. who you
              callin' pinhead?! insurance is what i need for a crabby patty. oh
              my god! a floating shopping list! ahhh! more soup for your arm
              pit? soap... soap... what is soap? it's an alaskan bull worm! put
              those eyeballs back in your head, son! the boy cries you a sweater
              of tears... and you kill him. go out and get yourself a case of
              the krabbies. i'll never forget your one-hundred-percent
              all-secret patty, secretly assembled with undersea cheese,
              pickles, lettuce, tomato, onion, all secretly steaming between two
              fluffy seaweed sea buns. i'm cheating, mrs. puff! i'm cheating!.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemExplanation;
