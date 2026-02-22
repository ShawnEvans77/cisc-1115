export interface Question {
  id: string;
  title: string;
  topics: string[];
  prompt: string;
  explanation: string;
  solution: string;
}

export interface Exam {
  id: string;
  label: string;
  year: string;
  questions: Question[];
}

export const exams: Exam[] = [
  {
    id: "fall-2020",
    label: "Fall 2020",
    year: "2020",
    questions: [
      {
        id: "question-2",
        title: "Question 2",
        topics: ["Arithmetic", "Modulo", "Variables"],
        prompt: `Assume the existence of an int variable called inches. Compute and print how many miles, yards, feet and inches that number represents.\n\nThe rules are: 1 foot equals 12 inches, 36 inches equals 1 yard, and 5280 feet equals 1 mile.\n\nFor example, if int inches = 245897, then the output is:\n\n245897 inches equals 3 miles 1550 yards 1 foot and 5 inches`,
        explanation: `To solve this problem, you most use the modulo and division operator.\n\nStart by dividing inches by the total number of inches in a mile (5280 x 12), then 'strip off' those miles using the modolo operator. We strip off the miles so that we are left with how many yards were in the original variable. You repeat the process when you divide the remaining yards by 36, the number of inches in a yard. This process continues and you eventually arrive at the solution.\n\nThey can ask different variants of this problem. Sometimes it is coins, sometimes it is hours. Remember to start large then work your way down, stripping off units as necessary.`,
        solution: `public class Fall2020Question2 {
    public static void main(String[] args) {

        // creating the inches variable
        int inches = 245897;

        // 5280 feet are in one mile. 5280*12 is the number of 
        // inches in a mile. Divide inches by (5280*12) to see 
        // how many miles are in it.
        int miles = inches / (5280 * 12);

        // remove the miles using the modulus operator.
        int remainingYards = inches % (5280 * 12);

        // 36 inches are in one yard.
        int yards = remainingYards / 36;

        // remove all yards.
        int remainingFeet = inches % 36; 

        // 12 inches in one foot.
        int feet = remainingFeet / 12;

        // remove the remaining feet.
        int remainingInches = inches % 12;

        // neatly print out the result using printf
        System.out.printf(
            "%d inches equals %d miles %d yards %d foot and %d inches\\n",
            inches, miles, yards, feet, remainingInches
        );
    }
}`,
      },
      {
        id: "question-5a",
        title: "Question 5a",
        topics: ["Methods", "Conditionals"],
        prompt: `Assume the six integers i, j, k, m, n exist and are all initialized.

Assume there exists a method max3(), which accepts 3 integers as input and returns the largest integer.

Write one Java statement to find the maximum of the six integers using any combination of Math.max() and max3().`,
        explanation: "Explanation goes here.",
        solution: "int max = Math.max(Math.max( Math.max(i, j), Math.max(k, l)), Math.max(m, n));",
      },
      {
        id: "question-7",
        title: "Question 7",
        topics: ["Recursion"],
        prompt: "Question prompt goes here.",
        explanation: "Explanation goes here.",
        solution: "// Solution code goes here",
      },
    ],
  },
  {
    id: "spring-2021",
    label: "Spring 2021",
    year: "2021",
    questions: [
      {
        id: "question-1",
        title: "Question 1",
        topics: ["Loops", "Nested Loops"],
        prompt: `Write Java code to repeatedly print each single digit between 1 and 9 the number of times based upon its numeric value.\n\nThus, you would get a triangle of the shape below where 1 prints once, 2 twice … and 9 prints 9 times.`,
        explanation: `This is a classic nested loop problem. The outer loop controls which digit we are currently printing (i goes from 1 to 9). The inner loop controls how many times that digit gets printed — it runs exactly i times.\n\nAfter the inner loop finishes printing i copies of the digit, we call System.out.println() with no arguments to move to the next line, which creates the triangle shape.\n\nThe key insight: the digit value and the repeat count are the same number, so we can use i for both.`,
        solution: `public class Spring2021Question1 {
    public static void main(String[] args) {

        for (int i = 1; i <= 9; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print(i);
            }

            System.out.println();
        }

    }
}`,
      },
      {
        id: "question-2",
        title: "Question 2",
        topics: ["Loops"],
        prompt: "Question prompt goes here.",
        explanation: "Explanation goes here.",
        solution: "// Solution code goes here",
      },
      {
        id: "question-5",
        title: "Question 5",
        topics: ["Arrays"],
        prompt: "Question prompt goes here.",
        explanation: "Explanation goes here.",
        solution: "// Solution code goes here",
      },
      {
        id: "question-6",
        title: "Question 6",
        topics: ["OOP"],
        prompt: "Question prompt goes here.",
        explanation: "Explanation goes here.",
        solution: "// Solution code goes here",
      },
      {
        id: "question-7",
        title: "Question 7",
        topics: ["Recursion"],
        prompt: "Question prompt goes here.",
        explanation: "Explanation goes here.",
        solution: "// Solution code goes here",
      },
    ],
  },
];