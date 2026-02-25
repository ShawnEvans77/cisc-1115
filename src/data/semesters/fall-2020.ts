// src/data/semesters/fall-2020.ts
import type { Exam } from "../../types";

export const fall2020: Exam = {
  id: "fall-2020",
  label: "fall 2020",
  year: "2020",
  questions: [
    {
      id: "question-1a",
      title: "question 1a",
      topics: ["Loops", "Tracing"],
      prompt: `Trace the variables in the following code:\n\nint x = 5;\nint y = 10;\ndo {\n    x++;\n    y--;\n    while (y > 8) {\n        x = x + 2;\n        y = y - 3;\n    }\n} while (x < 10);`,
      explanation: `We want to write all of the different values x and y take throughout the program.
        
x and y begin at 5 and 10. We write down that x=5 and y=10.
        
We increment x and decrement y. 5+1 = 6, 10-1 = 9. We write that x=6 and x=9.
        
y=9 is greater than 8, so the inner while loop executes. We add 2 to x=6, so x becomes 8. Subtract 3 from y, it becomes 6. We write that x=8 and y=6.
        
y=6 is not bigger than 8, so the inner while loop terminates. x=8 is lower than 10, so the while loop continues.
        
Decrement x and y. We write that x=9 and y=5. 
        
y is not greater than 8. x is still less than 10. We continue to the next do while iteration while skipping the inner do while loop.
        
Add 1 to x and subtract 1 from y. We get x=10 and y=4. 4 is not greater than 8, 10 is not less than 10, all loops cease and the program concludes. We write that x=10 and y=4.`,
      solution: `    x |  y
   --------
    5 | 10
    6 |  9
    8 |  6
    9 |  5
   10 |  4`,
    },
    {
      id: "question-1b",
      title: "question 1b",
      topics: ["Loops", "Tracing"],
      prompt: `Trace the variables in the following code:\n\nfor (int i = 0; i < 5; i = i + 2) {\n    for (int j = i; j > 0; j--) { }\n}`,
      explanation: `We want to write all of the different values i and j take throughout the program.
  
  We start with i being equal to 0. j is equal to 0 since int j = i. However, j=0 is not greater than 0, so the inner loop does not execute. We write i=0 and nothing for j.
  
  Then, i increments to 2. j is equal to 2 since int j = i. Since this inner for loop condition is now valid, it executes. We have i=2 & j=2, then i=2 & j=1, then j goes down to zero, terminating the loop. We write that i=2 and j=2, then i=2 and j=1, then i=2 and j=0.

  Then, i increments to 4. j is equal to 4 since int j = i. Inner for loop condition is valid once more. We have i=4 & j=4. Do you notice the patern? j decrements down to 0 by one each time. We write that i=4 and j=4, i=4 and j=3, i=4 and j=2, and so on.`,
      solution: `
  i  |  j
 ---------
  0  |  -
  2  |  2
  2  |  1
  2  |  0
  4  |  4
  4  |  3
  4  |  2
  4  |  1
  4  |  0`,
    },
    {
      id: "question-2",
      title: "question 2",
      topics: ["Arithmetic", "Modulo"],
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
      id: "question-3",
      title: "question 3",
      topics: ["Binary Numbers", "Number Systems", "Hexadecimal"],
      prompt: `Show the work you used to perform the following conversions:\n\na. 1100110 (base 2) to base 10\n\nb. AB (base 16) to base 10\n\nc. 65 (base 10) to base 2`,
      explanation: `Recall how we humans use numbers. In base 10, say we have the number 512. 512 = (5x10²) + (1x10¹) + (2x10⁰). 500 plus 10 plus 2 makes 512. We have a ones place, tens place, hundreths place, and so on. The same idea applies to other bases.
  
For a, it has six digits, with 4 of them being filled in with ones. Label the rightmost digit 2⁰, the second rightmost digit 2¹, and so on. Since only the 2⁶, 2⁵, 2², and 2¹ places are filled in with ones, sum them together. 1×2⁶ + 1×2⁵ + 0×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰ yields the base 10 sum 102, our answer.
  
For b, we know that in hexadecimal, A = 10, and B = 11. Therefore, to yield the answer, we perform 10×16¹ + 11×16⁰ = 171.
  
For c, simply write out the numbers 64, 32, 16, 8, 4, 2, and 1. From these numbers, we will make 65. (64+1) makes 65. Therefore, to express this in binary, we simply write out 1000001. The leftmost 1 represents 64, the rightmost 1 reprents the 1 added to 64 in order to make 65.`,
      solution: `a. 102

    1100110
    1×2⁶ + 1×2⁵ + 0×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰

  = 64  + 32  +  0  +  0  +  4  +  2  +  0
  = 102

b. 171

    AB
    A×16¹ + B×16⁰

  = 10×16 + 11×1
  = 160   + 11
  = 171

c. 1000001

    65

    64: 1
    32: 0
    16: 0
    8 : 0
    4 : 0
    2 : 0
    1 : 1

    64 + 1 = 65

    Answer: 1000001`,
    },
    {
      id: "question-5a",
      title: "question 5a",
      topics: ["Math Methods"],
      prompt: `Assume the six integers i, j, k, m, n, and l exist and are all initialized.\n\nAssume there exists a method max3(), which accepts 3 integers as input and returns the largest integer.\n\nWrite one Java statement to find the maximum of the six integers using any combination of Math.max() and max3().`,
      explanation: `Java lacks a max method that accepts an arbitrary number of arguments. The standard Math.max() method only accepts two integers. So, we need to 'cheat' in order to find the maximum of six integers.\n\nIf we use max3 twice, we can find the maximum of (i, j, k) and (m, n, l) separately. After doing this, we send the maximum of those two sets to the two argument accepting Math.max() method. The maximum of those two sets are found and then compared. Logically, the result of a Math.max() call on the maximum of (i,j,k) and (m,n,l) should find the absolute highest number.`,
      solution: `int max = Math.max(max3(i, j, k), max3(m, n, l));`,
    },
    {
      id: "question-5b",
      title: "question 5b",
      topics: ["Equations", "Math Methods"],
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
      id: "question-5c",
      title: "question 5c",
      topics: ["Arrays", "Binary Search"],
      prompt: `Perform a binary search on the following array searching for the number 18:\n\nint[] nums = {12, 77, 87, 89, 100, 117, 125, 189, 235, 529, 1000};\n\nList the low, mid and high values at each step until the algorithm stops. Do NOT write any code. Enter into the table below the low, mid and high values as the binary search progresses. You may use either the subscript (index) values or the actual number stored at the subscript. Not all rows of the table may be needed.`,
      explanation: `The array has 11 values, with the minimum index being 0 and the maximum index being 10. Recall that binary search involves jumping to the middle in search of your number. If the middle is too small, move right. If the middle is too big, move left.

  (0+10)/2 is 5. Write in {0, 5, 10}. nums[5] is 117, which is bigger than 18. Due to this, we move left by changing high to mid-1. The new high becomes 4.
  
  (0+4)/2 is 2. Write in {0, 2, 4}. nums[2] is 87, which is bigger than 18. Due to this, we move left by changing high to mid-1. The new high becomes 1.
  
  (0+1)/2 is 0, since the decimal is truncated in integer division. Write in {0, 0, 1}. nums[0] is 12, which is smaller than 18. Due to this, we move right by changing low to mid+1. The new low becomes 1.
  
  (1+1)/2 is 1. Write in {1, 1, 1}. nums[1] is 77, which is bigger than 18. Due to this, we move left by changing high to mid-1. The new high becomes 0.
  
  Write in {1, -, 0}. The binary search while loop condition, while (low <= high), has been violated. We failed to find 18.`,
      solution: `  Low | Mid  | High
 ----------------------
    0 |   5  |   10
    0 |   2  |    4
    0 |   0  |    1
    1 |   1  |    1
    1 |   -  |    0`,
    },
    {
      id: "question-6",
      title: "question 6",
      topics: ["Arrays", "Loops", "Split", "Strings"],
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
            // separated by space
            System.out.println(parts[0] + " " + parts[1]);
        }
    }
}`,
    },
    {
      id: "question-7",
      title: "question 7",
      topics: ["Arrays", "File", "Scanner", "Sorting"],
      prompt: `Write a complete Java program, including at least one comment in the main program and one in each method, to do the following:
The program will read in an unknown number of records from a file. Assume you won't have more than 100 records in total, though the actual number of records can be less than 100. Each record contains a sales rep's first name and miles traveled on two trips per year. For example, Pauline 167.8 567.0

Main:
  • Declare an output file to be used in main and passed to one or more methods from main. All output from main and methods will be printed to this file.
  • Invoke the first method (below) to read the data from the input file, compute averages and store information in the arrays. The method returns the number of records read in.
  • Next, invoke the second method (below) which computes the average length of all trips and then prints to the output file how many individual averages are above, equal to and below the overall average.
  • Finally, invoke the third method (below) to sort the name and individual average trip length arrays in parallel
  • In main, print to the output file each sales rep name and average trip length. The names and average trip length should print in columns, right adjusted. All trip lengths should be printed with two decimal places.

Methods:
  1. This method has two parameters: a String array for names and a double array for the average trip length per individual sales rep. It returns an integer
    a. Declare the input file, read the records in the file and store each first name in an array (assume there are no duplicate names) and the average number of miles travelled for that sales rep in another array. You do not need to store the individual trip length.
    b. Return the number of sales rep records read in.
  2. This method has three parameters – the output file, double array of individual average trip length and an integer representing the total number of records read in.
    a. Compute the overall average trip length across all sales reps.
    b. Compute and print to the output file how many sales reps individual average trip length were above the overall average trip length, below the overall average trip length and equal to the overall average trip length.
  3. This method has three parameters – String array of names, double array of individual average trip length and an integer representing the total number of records read in by the first method.
    a. Sort the sales rep names in descending (reverse) alphabetical order synchronizing the individual sales rep's average trip length in the parallel array.`,
      explanation: `The readData() method involves using a Scanner to read input from a text stream by using a while loop bounded by the hasNext() method. We use a counter in conjunction with the .next() and .nextDouble() methods to move data from the file into our arrays. Since the file is structured like "Pauline 167.8 567.0", we read in the name using sc.next(), and we calculate the average through (sc.nextDouble()+sc.nextDouble()) / 2.0 as each person has two trip lengths.
        
        computeTripLength() is self explanatory.
        
        The sorting involves the compareTo() method, which we use for comparing strings. s1.compareTo(s2) > 0 is equivalent to "s1 > s2." s1.compareTo(s2) < 0 is equivalent to "s1 < s2." This solution uses BubbleSort. SelectionSort and InsertionSort solutions are also valid.`,
      solution: `import java.util.Scanner;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.File;

public class Fall2020Question7 {

    public static void main(String[] args) throws IOException {

        // creating two arrays with no more than 100 records.
        String[] names = new String[100];
        double[] averageTripLength = new double[100];

        // readData returns the number of records read in.
        int numSalesRep = readData(names, averageTripLength);

        // PrintWriter for printing to the output file.
        PrintWriter writer = new PrintWriter("fall_2020_output.txt");

        // Calculates the average & average differences.
        computeTripLength(averageTripLength, writer, numSalesRep);

        // Sorts in parallel.
        sortArray(names, averageTripLength, numSalesRep);

        writer.println();

        for (int i = 0; i < numSalesRep; i++) {
            writer.printf("%10s %10.2f\\n", names[i], averageTripLength[i]);
        }

        writer.close();
    }

    public static int readData(String[] names, double[] averageTripLength) throws IOException {

        // reading from the input file.
        File file = new File("fall_2020_input.txt");
        Scanner sc = new Scanner(file);

        // the number of sales rep in the file.
        int numSalesRep = 0;

        // while the scanner has more things to read
        while (sc.hasNext()) {

            // read in the sales' rep name & average trip length into the two arrays.
            names[numSalesRep] = sc.next();
            averageTripLength[numSalesRep] = (sc.nextDouble() + sc.nextDouble()) / 2.0;
            numSalesRep++;
        }

        sc.close();
        return numSalesRep;
    }

    public static void computeTripLength(double[] averageTripLength, PrintWriter pw, int numRecords) {

        // method is self explanatory
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

        // basic bubble sort. compareTo used for string comparison. names[j].compareTo(names[j+1]) < 0
        // is the same as names[j] < names[j+1]
        // we swap both the person's name & trip length to make sure everything lines up properly.
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
};