// src/data/semesters/spring-2021.ts
import type { Exam } from "../../types";

export const spring2021: Exam = {
  id: "spring-2021",
  label: "spring 2021",
  year: "2021",
  questions: [
    {
      id: "question-1",
      title: "question 1",
      topics: ["Loops", "Patterns"],
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
      topics: ["Characters", "Scanner", "Strings"],
      prompt: `Write Java code to read strings of lower-case letters from the keyboard and count the number of vowels in each word.\n\nVowels are the letters a, e, i, o, and u.\n\nWhen all strings have been read in, print the string that has the largest number of vowels (duplicates included) and how many vowels were in the string. When more than one string has the greatest number of vowels, print the first string found with that number.\n\nFor example, given input: 

she of groceries yourselves here radio
        
The output is: 

groceries – 4 vowels`,
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

        // randInt from [min, max]
        int randIntInclusive = (int) (Math.random() * (max - min + 1) + min);

        // randInt from [min, max)
        int randIntExclusive = (int) (Math.random() * (max - min) + min);

        In this case, we will be using the inclusive formula. 

        We begin by creating a variable representing how many rolls will happen, and a variable representing the highest possible roll. We create a histogram array with a size of max roll plus one, since by doing this we can access index "max roll." For example, since the max roll is 14, we make the array of size 14+1, as that would give us access to an index 14. An array of size 15 has indices 0 to 14.

        We create a loop going a thousand times, as we will roll one thousand times. We roll from [1, 6], then [1,8]. We sum these values together.

        We then mark this summed roll in this histogram using histogram[roll]++. If we rolled a five, then we add one to index five. If we rolled a five again, then index five becomes two. If we roll a ten, then we add one to index 10.

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
      title: "question 6",
      topics: ["Arrays", "Scanner"],
      prompt: `Write Java code to do the following:

Read an arbitary amount of numbers from the keyboard with each number being between 1 and 100.

If a number entered is not between 1 and 100, print an error message.

If a -1 is read in, end the loop, then print which numbers between 1 and 100 the program did not read in.`,
      explanation: `The main notable thing we do here is using a histogram to track which numbers were read in, represented by an array. We create an array of size 101, and we use indices 1 to 100. We use a while loop continuing until a -1 is entered. 
        
        We print the error message for if the number is not between 1 and 100. Otherwise, when reading a valid number, we update the appropiate index in the histogram. If a 35 was read in, add one to index 35. If a 67 was read in, add one to index 67.
        
        We conclude the program by printing which indices still have a value of zero. A value of zero indicates we never read in that number.`,
      solution: `import java.util.Scanner;
public class Spring2021Question6 {
    public static void main(String[] args) {

        // creating the histogram.
        int[] histogram = new int[101];

        // creating the scanner.
        Scanner sc = new Scanner(System.in);

        // read in a number.
        int number = sc.nextInt();

        System.out.println("Enter some numbers between 1 and 100. Enter -1 to terminate the program: ");

        // continue until we arrive to a -1
        while (number != -1) {

            // error condition
            if (number < 1 || number > 100) {
                System.out.println("ERROR: Number must be between 1 and 100.");
            } else {
                // adding one to the number in the histogram
                histogram[number]++;
            }

            number = sc.nextInt();
        }

        System.out.println("The following numbers were not read in: ");

        for (int i = 1; i < histogram.length; i++) {
            // a value of zero means this number was not read in.
            if (histogram[i] == 0) {
                System.out.print(i + " ");
            }
        }

        sc.close();
    }

}`,
    },
    {
      id: "question-7",
      title: "question 7",
      topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
      prompt: `tba`,
      explanation: `tba`,
      solution: `tba`,
    },
    {
      id: "question-8",
      title: "question 8",
      topics: ["Arrays", "File", "Scanner", "Sorting"],
      prompt: `Write a complete Java program with comments in main and in each method to do the following.
  
A city is divided into 100 neighborhoods, each with a unique name. Every three months, each neighborhood reports the prices of four houses sold; not all neighborhoods have sales to report every three months. A file contains the sales data in the format:

neighborhood price price price price
For example, Midtown 23055 10000 19000 32009 (Note: prices are in whole dollars)

Design a Java class with a main method that does the following:
1. Invokes method readData which reads the data from the input file, stores values into arrays and returns the number of records read in.
2. Invokes method modifyData, passing an array of double as the parameter. The method modifies the value in the array based on rules specified below.
3. Invokes method sortArrays to parallel sort the arrays of double and String. The method should be invoked only once.
4. In main, prints to a file the neighborhood name and average of the three neighborhoods that have the highest average prices, in descending order (highest average price first), and the three neighborhoods that have the lowest average prices in ascending order (lowest average price first). The neighborhood should be left adjusted, the price right adjusted with two decimal places and the header row should be included.

Method Details:
I. readData:
   a. Receives an array of String and array of double
   b. Reads the neighborhood name as String and the four prices as integer from a file
   c. Stores the neighborhood name in the array of String and the average of the 4 prices in the array of double
   d. Returns the number of neighborhood records read in as an integer
II. modifyData:
   a. Receives an array of double and an integer representing the number of records read in by readData
   b. Computes the overall average home price for all homes read in by readData (the average of the averages)
   c. Increases the average price for each neighborhood by 10% if the average home price for that neighborhood is below the overall average home price homes sold and decreases the average price for each neighborhood by 15% if the average home price for that neighborhood is above the overall average
III. sortArrays:
   a. Receives the arrays of double and String and an integer representing the number of records read in by readData as parameters
   b. Parallel sorts the arrays, only for the number of records read in by readData, with the primary sort on the array of double in descending order`,
      explanation: `Explanation goes here.`,
      solution: `import java.util.Scanner;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class Spring2021Question8 {

    public static void main(String[] args) throws IOException {

        final int MAX_NEIGHBORHOODS = 100;

        String[] neighborhoods = new String[MAX_NEIGHBORHOODS];
        double[] averagePrices = new double[MAX_NEIGHBORHOODS];

        int numRecords = readData(neighborhoods, averagePrices);

        modifyData(neighborhoods, averagePrices, numRecords);
        sortArrays(neighborhoods, averagePrices, numRecords);

        PrintWriter writer = new PrintWriter("spring_2021_output.txt");

        writer.printf("%-15s%s\\n", "Neighborhood", "Avg Price");
        for (int i = 0; i < 3; i++) {
            writer.printf("%-15s%9.2f\\n", neighborhoods[i], averagePrices[i]);
        }

        writer.close();
    }

    public static int readData(String[] neighborhoods, double[] averagePrices) throws IOException {
        Scanner sc = new Scanner(new File("spring_2021_input.txt"));
        int numNeighborhoods = 0;

        while (sc.hasNext()) {
            neighborhoods[numNeighborhoods] = sc.next();
            averagePrices[numNeighborhoods] = (sc.nextDouble() + sc.nextDouble() + sc.nextDouble() + sc.nextDouble()) / 4.0;
            numNeighborhoods++;
        }

        sc.close();
        return numNeighborhoods;
    }

    public static void modifyData(String[] neighborhoods, double[] averagePrices, int numRecords) {
        double sum = 0;

        for (int i = 0; i < numRecords; i++) {
            sum += averagePrices[i];
        }

        double average = sum / numRecords;

        for (int i = 0; i < numRecords; i++) {
            if (average < averagePrices[i]) {
                averagePrices[i] -= averagePrices[i] * .15;
            } else if (average > averagePrices[i]) {
                averagePrices[i] -= averagePrices[i] * .10;
            }
        }
    }

    public static void sortArrays(String[] neighborhoods, double[] averagePrices, int numRecords) {

        for (int i = 0; i < numRecords; i++) {
            for (int j = 0; j < numRecords; j++) {
                if (averagePrices[j] < averagePrices[j + 1]) {

                    String tempString = neighborhoods[j + 1];
                    neighborhoods[j + 1] = neighborhoods[j];
                    neighborhoods[j] = tempString;

                    double tempDouble = averagePrices[j + 1];
                    averagePrices[j + 1] = averagePrices[j];
                    averagePrices[j] = tempDouble;
                }
            }
        }
    }
}`,
    },
  ],
};