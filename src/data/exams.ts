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
    label: "fall 2020",
    year: "2020",
    questions: [
      {
        id: "question-1a",
        title: "question 1a",
        topics: ["Tracing", "Loops"],
        prompt: `Trace the variables in the following code:
        
         \tint x = 5;
         int y = 10;
        \tdo{
 x++;
 y--;
 while (y >8){
 x = x+2;
 y = y-3;
 }
 } while (x < 10);
`,
        explanation: `tba`,
        solution: `--------------------------------------------------
x =  |  5  |  6  |  8  |  9  |  10  |
--------------------------------------------------
y =  |  10 |  9  |  6  |  5  |  4   |
--------------------------------------------------`,
      },
      {
        id: "question-2",
        title: "question 2",
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
        title: "question 5a",
        topics: ["Max Method", "Nested Method Calls"],
        prompt: `Assume the six integers i, j, k, m, n, and l exist and are all initialized.\n\nAssume there exists a method max3(), which accepts 3 integers as input and returns the largest integer.\n\nWrite one Java statement to find the maximum of the six integers using any combination of Math.max() and max3().`,
        explanation: `Java lacks a max method that accepts an arbitrary number of arguments. The standard Math.max() method only accepts two integers. So, we need to 'cheat' in order to find the maximum of six integers.\n\nIf we use max3 twice, we can find the maximum of (i, j, k) and (m, n, l) separately. After doing this, we send the maximum of those two sets to the two argument accepting Math.max() method. The maximum of those two sets are found and then compared. Logically, the result of a Math.max() call on the maximum of (i,j,k) and (m,n,l) should find the absolute highest number.`,
        solution: `int max = Math.max(max3(i, j, k), max3(m, n, l));`,
      },
      {
        id: "question-5b",
        title: "question 5b",
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
        title: "question 6",
        topics: ["Strings", "Loops", "substring", "indexOf"],
        prompt: `You are given a string containing a series of 9 digit zip codes with a dash separating the two parts and one space separating each full zip code from the next one. For example,\n\nString str = "11230-1234 11011-3489 07621-8845";\n\nWrite Java code to print the first 5 digits of each zip code followed by the last 4 digits of the zip code as separate values.\n\nSample output using the same str variable from above:\n11230 1234\n11011 3489\n07621 8845\n\nNOTE: The first part of the full zip code is always 5 digits, the second part is always 4 digits and there's always a dash in between the two parts. Keep in mind that your code must handle a String that has any number of such pairs, not just the three in the example above.`,
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
        title: "question 7",
        topics: ["Scanner", "Sorting", "File I/O"],
        prompt: `Write a complete Java program, including at least one comment in the main program and one in each method, to do the following:
The program will read in an unknown number of records from a file. Assume you won’t have more than 100 records in total, though the actual number of records can be less than 100. Each record contains a sales rep’s first name and miles traveled on two trips per year. For example, Pauline 167.8 567.0

Main:
  • Declare an output file to be used in main and passed to one or more methods from main. All output from main and methods will be printed to this file.
  • Invoke the first method (below) to read the data from the input file, compute averages and store information in the arrays. The method returns the number of records read in.
  • Next, invoke the second method (below) which computes the average length of all trips and then prints to the output file how many individual averages are above, equal to and below the overall average.
  • Finally, invoke the third method (below) to sort the name and individual average trip length arrays in parallel
  • In main, print to the output file each sales rep name and average trip length. The names and average trip length should print in columns, right adjusted. All trip lengths should be printed with two decimal places.

Methods:
  1. This method has two parameters: a String array for names and a double array for the average trip length per individual sales rep. It returns an integer
    a. Declare the input file, read the records in the file and store each first name in an array (assume there are no
    duplicate names) and the average number of miles travelled for that sales rep in another array. You do not need to
    store the individual trip length.
    b. Return the number of sales rep records read in.
  2. This method has three parameters – the output file, double array of individual average trip length and an integer representing the total number of records read in.
    a. Compute the overall average trip length across all sales reps.
    b. Compute and print to the output file how many sales reps individual average trip length were above the overall
    average trip length, below the overall average trip length and equal to the overall average trip length.
  3. This method has three parameters – String array of names, double array of individual average trip length and an integer
  representing the total number of records read in by the first
  method.
    a. Sort the sales rep names in descending (reverse) alphabetical order synchronizing the individual sales rep’s average trip length in the parallel array. `,
        explanation: "Explanation goes here.",
        solution: `import java.util.Scanner;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.File;

public class Fall2020Question7 {

    public static void main(String[] args) throws IOException {

        String[] names = new String[100];
        double[] averageTripLength = new double[100];

        int numSalesRep = readData(names, averageTripLength);

        PrintWriter writer = new PrintWriter("fall_2020_output.txt");

        computeTripLength(averageTripLength, writer, numSalesRep);

        sortArray(names, averageTripLength, numSalesRep);

        writer.println();

        for (int i = 0; i < numSalesRep; i++) {
            writer.printf("%10s %10.2f\n", names[i], averageTripLength[i]);
        }

        writer.close();

    }

    public static int readData(String[] names, double[] averageTripLength) throws IOException {
        File file = new File("fall_2020_input.txt");
        Scanner sc = new Scanner(file);

        int numSalesRep = 0;

        while (sc.hasNext()) {
            names[numSalesRep] = sc.next();
            averageTripLength[numSalesRep] = (sc.nextDouble() + sc.nextDouble()) / 2.0;
            numSalesRep++;
        }

        sc.close();

        return numSalesRep;
    }

    public static void computeTripLength(double[] averageTripLength, PrintWriter pw, int numRecords) {
        double sum = 0;

        for (int i = 0; i < numRecords; i++) {
            sum += averageTripLength[i];
        }

        double average = (sum / numRecords);

        int aboveAverage = 0;
        int belowAverage = 0;
        int equalAverage = 0;

        for (int i = 0; i < numRecords; i++) {
            if (averageTripLength[i] == average)
                equalAverage++;
            else if (averageTripLength[i] > average)
                aboveAverage++;
            else if (averageTripLength[i] < average)
                belowAverage++;
        }

        pw.println("Above Average: " + aboveAverage);
        pw.println("Below Average: " + belowAverage);
        pw.println("Equal to the Average: " + equalAverage);
    }

    public static void sortArray(String[] names, double[] averageTripLength, int numRecords) {

        for (int i = 0; i < numRecords; i++) {
            for (int j = 0; j < numRecords - i - 1; j++) {
                if (names[j].compareTo(names[j+1]) < 0) {
                    String temp = names[j + 1];
                    names[j + 1] = names[j];
                    names[j] = temp;

                    double temp2 = averageTripLength[j + 1];
                    averageTripLength[j + 1] = averageTripLength[j];
                    averageTripLength[j] = temp2;
                }
            }
        }
    }
}`,
      },
    ],
  },
  {
    id: "spring-2021",
    label: "spring 2021",
    year: "2021",
    questions: [
      {
        id: "question-1",
        title: "question 1",
        topics: ["Loops", "Nested Loops"],
        prompt: `Write Java code to repeatedly print each single digit between 1 and 9 the number of times based upon its numeric value.\n\nThus, you would get a triangle of the shape below where 1 prints once, 2 twice … and 9 prints 9 times.\n\n1\n22\n333\n4444\n55555\n666666\n7777777\n88888888\n999999999`,
        explanation: `Two nested loops are needed to solve this problem. Any problem involving patterns is going to involve nested loops.\n\nThe outer for loop determines what digit is printed. The inner for loop determines how many times that digit is printed. 
        
        When i = 1, that means 1 will be printed. j goes up to i, so 1 is only printed once. When i = 2, that means 2 will be printed. j goes up to 2, so 2 is printed twice. The process continues the same way up to 9.`,
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
        title: "question 2",
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
        title: "question 5",
        topics: ["Arrays", "Random Numbers"],
        prompt: `You are playing a game that has two dice. One die has 6 sides numbered 1 through 6 and the second die has 8 sides numbered 1 through 8. A turn involves rolling both die together.

Write Java code to play 1,000 turns and keep track of the sum of the two dice in each roll i.e. Logically, the possible sums you can get range from 2 to 14.

When all 1,000 turns have been completed, print a formatted table showing the value of the sum of the two dice (2 through 14) and the number of times that value occurred.`,
        explanation: `To solve this question, we will use an array as a histogram. A histogram tracks how many times certain rolls happened. We create an array of size 15. An array of size fiften will grant us indices 0 to 15, and from these indices we will only use 2 to 14.
        
        Recall the formula for generating a random number:

        // raindInt from [min, max]
        int randIntInclusive = (int) (Math.random() * (max - min + 1) + min);

        // randInt from [min, max)
        int randIntExclusive = (int) (Math.random() * (max - min) + min);

        In this case, we will be using the inclusive formula. 

        We begin by creating a number representing how many rolls will happen, and a number representing the max roll. We create a histogram array with a size of max roll plus one, since by doing this we can access index "max roll." For example, since the max roll is 14, we make the array of size 14+1, as that would give us access to an index 14.

        We create an array going a thousand times, as we will roll one thousand times. We roll from [1, 6], then [1,8]. We sum these values together.

        We then mark this summed roll in ths histogram using histogram[roll]++. If we rolled a five, then we add one to index five. If we rolled a five again, then index five becomes two. If we roll a ten, then we add one to index 10.

        Meaning, after a few rolls, the histogram array could look like this:

        {0, 0, 30, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 100, 0}

        Index 2 is 30, so we rolled a 2 thirty times.
        Index 7 is 50, so we rolled a 7 fifty times.
        Index 13 is 100, so we rolled a 13 100 times.

        We end the program by printing out a given dice sum and how many times it occurred.`,
        solution: `public class Spring2021Question5 {
    public static void main(String[] args) {
        // we are rolling a thousand times.
        final int NUM_ROLLS = 1000; 

        // the max roll possible roll is 14.
        final int MAX_ROLL = 14;

        // an array of size 15, granting us access to index 2 to 14.
        int[] histogram = new int[MAX_ROLL + 1];

        for (int i = 0; i < NUM_ROLLS; i++) {

            // rolling 1 to 6 and 1 to 8.
            int dieOneRoll = (int) (Math.random() * (6 - 1 + 1) + 1);
            int dieTwoRoll = (int) (Math.random() * (8 - 1 + 1) + 1);

            // summing the rolls.
            int roll = dieOneRoll + dieTwoRoll;

            // updating this roll in the histogram
            histogram[roll]++;
        }

        System.out.printf("%8s%8s\\n", "Dice Sum", "Count");

        // print the possible roll and how many times it happened.
        for (int i = 2; i < histogram.length; i++) {

            // printf for printing pretty
            System.out.printf("%8d%8d\\n", i, histogram[i]);
        }
    }
}`,
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
        title: "question 7",
        topics: ["Recursion"],
        prompt: "Question prompt goes here.",
        explanation: "Explanation goes here.",
        solution: "// Solution code goes here",
      },
    ],
  },
];