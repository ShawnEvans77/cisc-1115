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
        prompt: `Write the Java code for a method named maxChar that receives two char arrays of the same size as arguments and returns a newly created array of type char. Each element of the new array that is returned is the larger (based on the ASCII code) of the corresponding elements of the two arrays received. For example if [‘x', '3', '?'] and ['7', '4', 'e'] were passed to maxChar, it would return the array: [‘x’, ’4’, ‘e’]. Or, if ['6', 'f', 'n'] and ['S', 'u', ','] were passed to maxChar, then [‘S’, ’u’, ’n’] would be returned.`,
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

    }

    ]

};