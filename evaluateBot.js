import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

export default async function evaluateCode(question, answer, userSolution) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are a professional coding coach and evaluator. You look at code given as a response to a problem, evaluate the code, and give a letter grade.',
      },
      {
        role: 'user',
        content: `Please take this coding question: ${question} and this user solution ${userSolution} and grade it for correctness based on the this answer: ${answer}. Note all of the code is for Javascript. Please provide constructive critisim.`,
      },
    ],
    functions: [
      {
        name: 'evaluateCode',
        parameters: {
          type: 'object',
          properties: {
            getLetterGrade: {
              type: 'integer',
              desciption:
                "Give a score from 1 to 10 (1 being the worse and 10 being the best) how closely and accurately the user's response anwered the coding challenge and adhered to the answer.",
              maximum: 10,
              minimum: 1,
            },
            getGradeDescription: {
              type: 'string',
              desciption:
                "Give a full explaination for the grade provided and tips and tricks on how to better adhere to the answer if the user's answer was not correct.",
            },
          },
        },
      },
    ],
    function_call: { name: 'evaluateCode' },
  });

  return response.choices[0].message.function_call.arguments;
}

evaluateCode(
  `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]`,
  `function twoSum(nums, target) {
  let vals = {};

  for (let i = 0; i < nums.length; i++) {
    if (target - nums[i] in vals) {
      return [vals[target-nums[i]], i];
    } else {
      vals[nums[i]] = i;
    }
  }
  return [];
};`,
  `const twoSum = function (nums, target) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const pair = nums.indexOf(target - nums.pop());
    if (pair !== -1) return [pair, len - 1 - i];
  }
  return [];
};`
).then((res) => {
  console.log(JSON.parse(res));
});
