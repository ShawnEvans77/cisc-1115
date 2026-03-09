import type { Exam } from "../../types";

export const fall2018: Exam = {
    id: "fall-2018",
    label: "fall 2018",
    year: "2018",
    questions: [
    {
        id: "6b",
        title: "question 6b",
        topics: ["Equations", "Math Methods"],
        prompt: `The quadratic formula can be used to solve for the two values of x in a quadratic equation of the form ax²+bx+c=0. Write an expression in Java that will compute one of the values of x based on the formula below:`,
        mathLatex: `x = \\dfrac{-b + \\sqrt{b^2 - 4ac}}{2a}`,
        explanation: `Pretend you're entering the equation into Google. This is a simple answer created using Math.sqrt() and Math.pow().`,
        solution: `double x1 = ( -b + Math.sqrt( Math.pow(b , 2) - 4 * a * c) ) / (2.0 * a);`,
    },
    ]
};