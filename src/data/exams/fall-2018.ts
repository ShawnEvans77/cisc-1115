import type { Exam } from "../../types";

export const fall2018: Exam = {
    id: "fall2018",
    label: "fall 2018",
    year: "2018",
    questions: [
    {
        id: "6b",
        title: "question 6b",
        topics: ["Equations", "Math Methods"],
        prompt: `The quadratic formula can be used to solve for the two values of x in a quadratic equation of the form ax²+bx+c=0. Write an expression in Java that will compute one of the values of x based on the formula below:`,
        mathLatex: `x = \\dfrac{-b + \\sqrt{b^2 - 4ac}}{2a}`,
        explanation: `This is a direct translation problem. The main thing is to keep the same structure as the formula instead of trying to simplify it in your head.

The square root part becomes **Math.sqrt(...)**. The b² part becomes **Math.pow(b, 2)**, because Java does not use **^** for exponents.

The denominator should use **2.0 * a** instead of **2 * a** so the final division happens as decimal division, not integer division.`,
        solution: `double x1 = ( -b + Math.sqrt( Math.pow(b , 2) - 4 * a * c) ) / (2.0 * a);`,
    },
    ]
};
