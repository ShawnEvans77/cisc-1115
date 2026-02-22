export interface Question {
  id: string;
  title: string;
  topics: string[];
  prompt: string;
  mathHtml?: string;
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
        explanation: `To solve this problem, you must use the modulo and division operator.\n\nStart by dividing inches by the total number of inches in a mile (5280 x 12), then 'strip off' those miles using the modulo operator. We strip off the miles so that we are left with how many yards were in the original variable. You repeat the process when you divide the remaining yards by 36, the number of inches in a yard. This process continues and you eventually arrive at the solution.\n\nThey can ask different variants of this problem. Sometimes it is coins, sometimes it is hours. Remember to start large then work your way down, stripping off units as necessary.`,
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
        topics: ["Max Method", "Nested Method Calls"],
        prompt: `Assume the six integers i, j, k, m, n, and l exist and are all initialized.\n\nAssume there exists a method max3(), which accepts 3 integers as input and returns the largest integer.\n\nWrite one Java statement to find the maximum of the six integers using any combination of Math.max() and max3().`,
        explanation: `Java lacks a max method that accepts an arbitrary number of arguments. The standard Math.max() method only accepts two integers. So, we need to 'cheat' in order to find the maximum of six integers.\n\nIf we use max3 twice, we can find the maximum of (i, j, k) and (m, n, l) separately. After doing this, we send the maximum of those two sets to the two argument accepting Math.max() method. The maximum of those two sets are found and then compared. Logically, the result of a Math.max() call on the maximum of (i,j,k) and (m,n,l) should find the absolute highest number.`,
        solution: `int max = Math.max(max3(i, j, k), max3(m, n, l));`,
      },
      {
        id: "question-5b",
        title: "Question 5b",
        topics: ["Arithmetic", "Math Methods"],
        prompt: `Write a Java expression that would compute the following:`,
        mathHtml: `
          <div style="display:flex;justify-content:center;align-items:center;padding:2.5rem 1rem">
            <div style="display:inline-flex;flex-direction:column;align-items:center;gap:0px">
              <div style="display:flex;align-items:center;gap:0.5rem;padding-bottom:0.5rem;border-bottom:2.5px solid #1A1208;font-size:1.5rem;font-family:'DM Mono',monospace">
                <span>x<sup style="font-size:0.75em">2</sup></span>
                <span style="margin:0 0.25rem">&#8722;</span>
                <div style="display:inline-flex;flex-direction:column;align-items:center">
                  <span style="border-bottom:1.5px solid #1A1208;padding-bottom:0.2rem;padding-left:0.3rem;padding-right:0.3rem;font-size:1.1rem">1</span>
                  <span style="padding-top:0.2rem;font-size:1.1rem">(y + 3)</span>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;padding-top:0.5rem;font-size:1.5rem;font-family:'DM Mono',monospace">
                <div style="display:inline-flex;flex-direction:column;align-items:center">
                  <span style="border-bottom:1.5px solid #1A1208;padding-bottom:0.2rem;padding-left:0.5rem;padding-right:0.5rem;font-size:1.1rem">1</span>
                  <span style="padding-top:0.2rem;font-size:1.1rem">z</span>
                </div>
                <span style="margin:0 0.25rem">+</span>
                <span>&#8730;x</span>
              </div>
            </div>
          </div>
        `,
        explanation: `Pretend you're entering this equation into Google to calculate it. It is a simple combination of Math.sqrt(), Math.pow(), and several parentheses.`,
        solution: `double result = (Math.pow(x, 2) - (1.0 / (y + 3))) / ((1.0 / z) + Math.sqrt(x));`,
      },
      {
        id: "question-6",
        title: "Question 6",
        topics: ["Strings", "Loops", "substring", "indexOf"],
        prompt: `You are given a string containing a series of 9 digit zip codes with a dash separating the two parts and one space separating each full zip code from the next one. For example,\n\nString str="11230-1234 11011-3489 07621-8845";\n\nWrite Java code to print the first 5 digits of each zip code followed by the last 4 digits of the zip code as separate values.\n\nFor example:\n11230 1234\n11011 3489\n07621 8845\n\nNOTE: The first part of the full zip code is always 5 digits, the second part is always 4 digits and there's always a dash in between the two parts. Keep in mind that your code must handle a String that has any number of such pairs, not just the three in the example above.`,
        explanation: `We solve this problem easily by using the split method. Split the input string based on spaces, creating an array of zip codes. For each zip code in the array, split it based on the dash, then print the first five & last four numbers of that zip code.`,
        solution: `public class Fall2020Question6 {
    public static void main(String[] args) {

        String str = "11230-1234 11011-3489 07261-8845";

        // create an array of zip codes
        String[] codes = str.split(" ");
        // codes = {"11230-1234", "11011-3489", "07261-8845"}

        // for every zip code in the array of zip codes
        for (int i = 0; i < codes.length; i++) {
            // split the current zip code based on the dashes
            String[] parts = codes[i].split("-"); 

            // print the first five numbers of the zip code, then the last four
            // seperated by space
            System.out.println(parts[0] + " " + parts[1]);
        }
    }
}`,
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
        prompt: `Write Java code to repeatedly print each single digit between 1 and 9 the number of times based upon its numeric value.\n\nThus, you would get a triangle of the shape below where 1 prints once, 2 twice … and 9 prints 9 times.\n\n1\n22\n333\n4444\n55555\n666666\n7777777\n88888888\n999999999`,
        explanation: `Two nested loops are needed to solve this problem. Any problem involving patterns is going to involve nested loops.\n\nThe outer for loop determines what digit is printed. The inner for loop determines how many times that digit is printed. When i = 1, that means 1 will be printed. j goes up to i, so 1 is only printed once. When i = 2, that means 2 will be printed. j goes up to 2, so 2 is printed twice. The process continues the same way up to 9.`,
        solution: `public class Spring2021Question1 {
    public static void main(String[] args) {

        // outer for loop determines what digit is printed
        for (int i = 1; i <= 9; i++) {

            // inner for loop determines how many times that digit is printed
            for (int j = 0; j < i; j++) {
                System.out.print(i);
            }

            // blank print statement so that separate digits are printed on different lines.
            System.out.println();
        }

    }
}`,
      },
      {
        id: "question-2",
        title: "Question 2",
        topics: ["Scanner", "Strings"],
        prompt: `Write Java code to read strings of lower-case letters from the keyboard and count the number of vowels in each word.\n\n(vowels are a, e, i, o and u).\n\nWhen all strings have been read in, print the string that has the largest number of vowels (duplicates included) and how many vowels were in the string. When more than one string has the greatest number of vowels, print the first string found with that number.\n\nFor example,\n\nGiven input: she of groceries yourselves here radio\n\nThe output is: groceries – 4 vowels`,
        explanation: `The solution, for the most part, is a direct regurgitation of the prompt. Start by creating a Scanner. Create an empty string that will represent the string with the most vowels. Create a tracker that remembers how many vowels were in the string with the most vowels.\n\nCreate a while loop bounded by the scanner hasNext() method, a boolean method telling you if there is anything more to read from the input stream. Read in the current string and create a variable representing how many vowels are inside of it. Next, create a for loop to count how many vowels are in that string.\n\nUse an if statement that checks if this string has more vowels than the tracker for the highest vowel count string. If it does, update the tracker.\n\nAt the program's end, print the highest vowel string and how many vowels it had.`,
        solution: `import java.util.Scanner;
public class Spring2021Question2 {
    public static void main(String[] args) {

        // create the scanner, most vowel string, and vowel count tracker
        Scanner sc = new Scanner(System.in);
        String mostVowelsString = "";
        int highestVowelCount = 0;

        System.out.println("Enter some words: ");

        // while there are still tokens in the input stream
        while (sc.hasNext()) {

            // read from the input stream
            String word = sc.next();
            int numVowels = 0;

            // count how many vowels are in this string
            for (int i = 0; i < word.length(); i++) {
                char letter = word.charAt(i);

                if (letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u') {
                    numVowels++;
                }
            }

            // if this string has more vowels than the tracker, update it
            if (highestVowelCount < numVowels) {
                highestVowelCount = numVowels;
                mostVowelsString = word;
            }

        }

        // print the highest vowel string and how many vowels it had
        System.out.println();
        System.out.printf("%s - %d vowels", mostVowelsString, highestVowelCount);

        sc.close();
    }

}`,
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