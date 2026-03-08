import type { Exam } from "../../types";

export const spring2023: Exam = {
    id: "spring-2023",
    label: "spring 2023",
    year: "2023",
    questions: [
    {
        id: "1",
        title: "question 1",
        topics: ["Arrays", "Characters"],
        prompt: `Write the Java code for a method named maxChar that receives two char arrays of the same size as arguments and returns a newly created array of type char. Each element of the new array that is returned is the larger (based on the ASCII code) of the corresponding elements of the two arrays received. For example if ['x', '3', '?'] and ['7', '4', 'e'] were passed to maxChar, it would return the array: ['x', '4', 'e']. Or, if ['6', 'f', 'n'] and ['S', 'u', ','] were passed to maxChar, then ['S', 'u', 'n'] would be returned.`,
        explanation: `Simply follow the instructions verbatim. Create a new character array, "C", with the exact same size of one of the input arrays. Loop with your boundary being the size of one of the input arrays. If A[i] is bigger than B[i], put it in C. Otherwise, put B[i] in C. Then return C.`,
        solution: `public static char[] maxChar(char[] A, char[] B) {
        
    // storing the size of one of the arrays in a variable
    int n = A.length; 

    // creating a new array same size as input arrays
    char[] C = new char[n]; 

    for (int i = 0; i < n; i++) {
        // if A[i] is bigger put it in, else C[i]
        C[i] = A[i] > B[i] ? A[i] : B[i]; 
    }

    // return the new array
    return C; 
}`
    },
    {
        id: "3",
        title: "question 3",
        topics: ["Arrays", "Binary Search"],
        prompt: `Given the array of numbers below, show all the steps as you perform a binary search, looking for the key of 11:\n\nint[] nums = {9, 15, 23, 67, 78, 85, 111, 117, 135, 225, 829, 1000};\n\nEnter into the table the low, mid and high values as the binary search progresses. DO NOT write any code. You may use either the subscript (index) values or the actual number stored at the subscript. Not all rows of the table may be needed.`,
        explanation: `The array has 12 values, with the minimum index being 0 and the maximum index being 11. Recall that binary search involves jumping to the middle in search of your number. If the middle is too small, move right. If the middle is too big, move left.

(0+11)/2 is 5. Write in {0, 5, 11}. nums[5] is 85, which is bigger than 11. Due to this, we move left by changing high to mid-1. The new high becomes 4.

(0+4)/2 is 2. Write in {0, 2, 4}. nums[2] is 23, which is bigger than 11. Due to this, we move left by changing high to mid-1. The new high becomes 1.

(0+1)/2 is 0, since the decimal is truncated in integer division. Write in {0, 0, 1}. nums[0] is 9, which is smaller than 11. Due to this, we move right by changing low to mid+1. The new low becomes 1.

(1+1)/2 is 1. Write in {1, 1, 1}. nums[1] is 15, which is bigger than 11. Due to this, we move left by changing high to mid-1. The new high becomes 0.

Write in {1, -, 0}. The binary search while loop condition, while (low <= high), has been violated. We failed to find 11.`,
        solution: `  Low | Mid  | High
 ----------------------
    0 |   5  |   11
    0 |   2  |    4
    0 |   0  |    1
    1 |   1  |    1
    1 |   -  |    0`,
    },
    {
        id: "6",
        title: "question 6",
        topics: ["Equations", "Math Methods"],
        prompt: `Write a Java expression that would compute the following:`,
        mathLatex: `w = \\sqrt{\\dfrac{\\sqrt{\\dfrac{x+y}{z}} - 1}{(1+x)^2}}`,
        explanation: `Pretend you're entering this equation into Google to calculate it. It is a simple combination of Math.sqrt(), Math.pow(), and several parentheses.`,
        solution: `double result = Math.sqrt((Math.sqrt((x + y) / z) - 1) / Math.pow(1 + x, 2));`,
    },
    ]
};