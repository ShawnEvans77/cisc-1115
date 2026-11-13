import type { Exam } from "../../types";

export const spring2021: Exam = {
  id: "spring2021",
  label: "spring 2021",
  year: "2021",
  questions: [
    {
      id: "1",
      title: "question 1",
      topics: ["Loops", "Patterns"],
      prompt: `Write Java code to repeatedly print each single digit between **1 and 9** the number of times based upon its numeric value.

Thus, you would get a triangle of the shape below where **1** prints once, **2** prints twice … and **9** prints 9 times.
[[text]]1
22
333
4444
55555
666666
7777777
88888888
999999999[[/text]]`,
      explanation: `This needs two **nested loops**. Almost any pattern problem does.

The **outer** loop decides *which* digit is printed. The **inner** loop decides *how many times* that digit is printed.
[[table]]
i (outer) | Inner loop runs | Line printed
1 | 1 time | 1
2 | 2 times | 22
3 | 3 times | 333
… | … | …
9 | 9 times | 999999999
[[/table]]

After the inner loop finishes, an empty **println()** moves to the next line. Without it, every digit would end up on one long line.`,
      solution: `public class Spring2021Question1 {
    public static void main(String[] args) {

        // outer for loop determines what digit is printed
        for (int i = 1; i <= 9; i++) {

            // inner for loop determines how many times that digit is printed
            for (int j = 0; j < i; j++) {
                System.out.print(i);
            }

            // move to the next line before the next digit
            System.out.println();
        }
    }
}`,
    },
    {
      id: "2",
      title: "question 2",
      topics: ["Characters", "Scanner", "Strings"],
      prompt: `Write Java code to read strings of lower-case letters from the keyboard and count the number of vowels in each word.

Vowels are the letters **a**, **e**, **i**, **o**, and **u**.

When all strings have been read in, print the string that has the **largest number of vowels** (duplicates included) and how many vowels were in the string. When more than one string has the greatest number of vowels, print the **first** string found with that number.

For example, given the input:
[[text]]she groceries yourselves here radio[[/text]]

The output is:
[[text]]groceries - 4 vowels[[/text]]`,
      explanation: `The solution is mostly a direct translation of the prompt.

Create a Scanner, an empty String to hold the **best word so far**, and an int for **its vowel count**.

Use a **while** loop on **hasNext()**, which is true as long as there is more to read. Read the current word, then use a **for** loop with **charAt()** to count its vowels.

If this word has *more* vowels than the best so far, it becomes the new best:
[[table]]
Word | Vowels | Best so far
she | 1 | she (1)
groceries | 4 | groceries (4)
yourselves | 4 | groceries (4), a tie keeps the first
here | 2 | groceries (4)
radio | 3 | groceries (4)
[[/table]]

Use **>** and *not* **>=** here. "groceries" and "yourselves" both have 4 vowels, and with **>** the later word does not replace the earlier one, just like the prompt asks.

At the end, print the winning word and its vowel count.

When typing input at the keyboard, **hasNext()** keeps waiting for more. Signal the end of input with Ctrl+D (Mac/Linux) or Ctrl+Z then Enter (Windows).`,
      solution: `import java.util.Scanner;

public class Spring2021Question2 {
    public static void main(String[] args) {

        // create the scanner, the best word so far, and its vowel count
        Scanner sc = new Scanner(System.in);
        String mostVowelsString = "";
        int highestVowelCount = 0;

        System.out.println("Enter some words: ");

        // while there are still words to read
        while (sc.hasNext()) {

            String word = sc.next();
            int numVowels = 0;

            // count how many vowels are in this word
            for (int i = 0; i < word.length(); i++) {
                char letter = word.charAt(i);

                if (letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u') {
                    numVowels++;
                }
            }

            // strictly more vowels: on a tie, the first word found stays
            if (numVowels > highestVowelCount) {
                highestVowelCount = numVowels;
                mostVowelsString = word;
            }
        }

        // print the word with the most vowels and how many it had
        System.out.printf("%s - %d vowels\\n", mostVowelsString, highestVowelCount);

        sc.close();
    }
}`,
    },
    {
      id: "3a",
      title: "question 3a",
      topics: ["Loops", "Tracing"],
      prompt: `Show how the code executes step-by-step. Display (trace) the values of x and y as they change.
[[code]]int x = 7;
int y = 3;
//print x and y values at this point
while (x+y < 13) {
    x = x + 2;
    y = y - 1;
    //print x and y values at this point
    do {
        x--;
        y++;
        //print x and y values at this point
    } while (x>10);
}[[/code]]`,
      explanation: `There are **three print points**. Write down x and y every time execution passes one of them.

Start: **x = 7, y = 3**.

**7 + 3 = 10**, which is less than 13, so enter the while loop. x goes up 2 and y goes down 1: **x = 9, y = 2**. Then the do while runs at least once: **x = 8, y = 3**. 8 is not greater than 10, so the do while stops.

**8 + 3 = 11** is less than 13, so go around again. **x = 10, y = 2**, then inside the do while **x = 9, y = 3**. 9 is not greater than 10.

**9 + 3 = 12** is less than 13, so go around one more time. **x = 11, y = 2**, then **x = 10, y = 3**. 10 is *not* greater than 10, so the do while stops.

**10 + 3 = 13** is not less than 13, so the while loop ends.

**Quick double check:** x + y goes up by exactly 1 per trip around the while loop. The first two lines change the sum by +2 - 1, and the do while changes it by -1 + 1. So the sum goes 10, 11, 12, 13, and the loop stops at 13.`,
      solutionType: "text",
      solution: `[[table]]
x | y | Print point
7 | 3 | before the while
9 | 2 | while: x + 2, y - 1
8 | 3 | do while: x--, y++
10 | 2 | while: x + 2, y - 1
9 | 3 | do while: x--, y++
11 | 2 | while: x + 2, y - 1
10 | 3 | do while: x--, y++ (both loops end)
[[/table]]`,
    },
    {
      id: "3b",
      title: "question 3b",
      topics: ["Loops", "Tracing"],
      prompt: `Show how the code executes step-by-step. Display (trace) the values of i and j at the print point.
[[code]]for (int i=12; i>9; i--) {
    for (int j=i-2; j<15; j=j+2)
        //print i and j values at this point
}[[/code]]`,
      explanation: `The outer loop runs for **i = 12, 11, and 10**. It stops once i reaches 9.

For each i, the inner loop starts j at **i - 2** and counts up **by 2** while j is less than 15.
[[table]]
i | j starts at | j values | First value that fails
12 | 10 | 10, 12, 14 | 16
11 | 9 | 9, 11, 13 | 15 (not *less than* 15)
10 | 8 | 8, 10, 12, 14 | 16
[[/table]]`,
      solutionType: "text",
      solution: `[[table]]
i | j
12 | 10
12 | 12
12 | 14
11 | 9
11 | 11
11 | 13
10 | 8
10 | 10
10 | 12
10 | 14
[[/table]]`,
    },
    {
      id: "4",
      title: "question 4",
      topics: ["Arrays", "Methods", "References", "Tracing"],
      prompt: `Fill in the table below to trace the values of the arrays in main at various points.
[[code]]int[] array1 = {10,20,30,40,50};
int[] array2 = {5,4,3,2,1};
int[] array3 = new int[5];

//print the array values at this point
doIt(array1, array2);
//print the array values at this point

array2 = array1;

//print the values at this point
array3 = doIt(array1, array2);
//print the array values at this point
} //end of main

public static int[] doIt(int[] arr1, int[] arr2) {
    int[] arr3 = new int[5];
    for (int i=0; i<arr1.length; i++)
        arr3[i] = arr1[i] + arr2[arr2.length-1-i];
    return arr3;
}[[/code]]

[[table]]
Point | Array | Values
before first doIt | array1 | ?
before first doIt | array2 | ?
before first doIt | array3 | ?
after first doIt | array1 | ?
after first doIt | array2 | ?
after first doIt | array3 | ?
before second doIt | array1 | ?
before second doIt | array2 | ?
after second doIt | array1 | ?
after second doIt | array2 | ?
after second doIt | array3 | ?
[[/table]]`,
      explanation: `Three ideas make this question easy.

**doIt never changes its parameters.** It only reads from arr1 and arr2, and writes into its own brand new arr3. So array1 and array2 never change because of a doIt call.

**The first call's result is thrown away.** **doIt(array1, array2)** returns an array, but nothing stores it. array3 is still the five zeros from **new int[5]**.

**array2 = array1 copies the reference, not the values.** After that line, array2 and array1 are two names for the *same* array {10, 20, 30, 40, 50}. The old {5, 4, 3, 2, 1} array is simply abandoned.

For the second call, arr1 and arr2 are both that same array. Each arr3[i] adds an element from the front to the matching element from the back:
[[table]]
i | arr1[i] | arr2[4 - i] | arr3[i]
0 | 10 | 50 | 60
1 | 20 | 40 | 60
2 | 30 | 30 | 60
3 | 40 | 20 | 60
4 | 50 | 10 | 60
[[/table]]
This time the result is stored in array3.`,
      solutionType: "text",
      solution: `[[table]]
Point | Array | Values
before first doIt | array1 | 10 20 30 40 50
before first doIt | array2 | 5 4 3 2 1
before first doIt | array3 | 0 0 0 0 0
after first doIt | array1 | 10 20 30 40 50
after first doIt | array2 | 5 4 3 2 1
after first doIt | array3 | 0 0 0 0 0
before second doIt | array1 | 10 20 30 40 50
before second doIt | array2 | 10 20 30 40 50
after second doIt | array1 | 10 20 30 40 50
after second doIt | array2 | 10 20 30 40 50
after second doIt | array3 | 60 60 60 60 60
[[/table]]`,
    },
    {
      id: "5",
      title: "question 5",
      topics: ["Arrays", "Random Numbers"],
      prompt: `You are playing a game that has **two dice**.

One die has **6** sides numbered __1 through 6__ and the second die has **8** sides numbered __1 through 8__. A turn involves rolling both dice together.

Write Java code to play **1,000** turns and keep track of the sum of the two dice in each roll. Logically, the possible sums you can get range from __2 to 14__.

When all 1,000 turns have been completed, print a formatted table showing the value of the sum of the two dice (2 through 14) and the number of times that value occurred.

Your output should look similar to this. The counts in your output will be different, since the dice are random.
[[text]]Dice Sum   Count
       2      11
       3      36
       4      56
       5      93
       6     109
       7     130
       8     110
       9     136
      10      99
      11      92
      12      60
      13      47
      14      21[[/text]]

On the exam, you could answer either this question or question 6.`,
      explanation: `To solve this question, we will use an array as a **histogram**. A histogram tracks how many times each roll happened. We create an array of size **15**, which gives us indices 0 to 14. We only use indices **2 to 14**.

Recall the formulas for generating a random integer:
[[code]]// randInt from [min, max]
int randIntInclusive = (int) (Math.random() * (max - min + 1) + min);

// randInt from [min, max)
int randIntExclusive = (int) (Math.random() * (max - min) + min);[[/code]]

In this case, we will be using the *inclusive* formula, since a 6-sided die can land on 6.

Loop a thousand times. Each time, roll from [1, 6] and from [1, 8], and add the two rolls together.

We then mark this sum in the histogram using **histogram[roll]++**. If we rolled a five, we add one to index five. If we rolled a five again, index five becomes two. If we roll a ten, we add one to index ten.

So after a few rolls, the histogram array could look like this:
[[text]]{0, 0, 30, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 100, 0}[[/text]]

Index **2** is 30, so we rolled a 2 thirty times. Index **7** is 50, so we rolled a 7 fifty times. Index **13** is 100, so we rolled a 13 one hundred times.

We end the program by printing each dice sum from 2 to 14 and how many times it occurred.`,
      solution: `public class Spring2021Question5 {
    public static void main(String[] args) {

        // we are rolling a thousand times
        final int NUM_ROLLS = 1000;

        // the max possible roll is 14
        final int MAX_ROLL = 14;

        // an array of size 15, granting us access to indices 2 to 14
        int[] histogram = new int[MAX_ROLL + 1];

        for (int i = 0; i < NUM_ROLLS; i++) {

            // rolling 1 to 6 and 1 to 8
            int dieOneRoll = (int) (Math.random() * (6 - 1 + 1) + 1);
            int dieTwoRoll = (int) (Math.random() * (8 - 1 + 1) + 1);

            // summing the rolls
            int roll = dieOneRoll + dieTwoRoll;

            // updating this roll in the histogram
            histogram[roll]++;
        }

        System.out.printf("%8s%8s\\n", "Dice Sum", "Count");

        // print each possible roll and how many times it happened
        for (int i = 2; i < histogram.length; i++) {
            System.out.printf("%8d%8d\\n", i, histogram[i]);
        }
    }
}`,
    },
    {
      id: "6",
      title: "question 6",
      topics: ["Arrays", "Scanner"],
      prompt: `Write Java code to do the following:

Read from the keyboard an unknown number of values, each of which is between **1 and 100**.

If a number entered is *not* between **1 and 100** (except for **-1**, which ends the input), print an error message.

When a **-1** is read in, stop the loop and print which of the numbers between 1 and 100 were *not* read in.

Sample run:
[[text]]Enter some numbers between 1 and 100. Enter -1 to stop:
1 2 3 4 5 6 7 8 9 10 11 15 20 50 55 75 99 98 97 96 23 26 29 -1
The following numbers were not read in:
12 13 14 16 17 18 19 21 22 24 25 27 28 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 51 52 53 54 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 100[[/text]]

On the exam, you could answer either this question or question 5.`,
      explanation: `The trick is a **histogram** that remembers which numbers were read in. Make an array of size **101** so indices **1 to 100** exist, one slot per possible number.

Print the instructions *first*, then read the first number. Reading before printing leaves the user staring at a blank screen.

Use a **while** loop that continues until a **-1** is entered. Read the next number at the *bottom* of the loop.
[[table]]
Number read | What happens
35 | histogram[35]++
150 | error message, not between 1 and 100
0 | error message, not between 1 and 100
-1 | loop ends
[[/table]]

Once the loop ends, go through indices 1 to 100 and print every index that is still **zero**. A zero means we __never__ read in that number.`,
      solution: `import java.util.Scanner;

public class Spring2021Question6 {
    public static void main(String[] args) {

        // one slot for each number from 1 to 100 (index 0 is unused)
        int[] histogram = new int[101];

        Scanner sc = new Scanner(System.in);

        // tell the user what to do before waiting for input
        System.out.println("Enter some numbers between 1 and 100. Enter -1 to stop:");
        int number = sc.nextInt();

        // continue until we read a -1
        while (number != -1) {

            if (number < 1 || number > 100) {
                System.out.println("ERROR: " + number + " is not between 1 and 100.");
            } else {
                // mark this number as read
                histogram[number]++;
            }

            number = sc.nextInt();
        }

        System.out.println("The following numbers were not read in:");

        for (int i = 1; i < histogram.length; i++) {
            // a value of zero means this number was never read in
            if (histogram[i] == 0) {
                System.out.print(i + " ");
            }
        }
        System.out.println();

        sc.close();
    }
}`,
    },
    {
      id: "7",
      title: "question 7",
      topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
      prompt: `Perform the following conversions. You must show how you computed your answer.

a. 1011111 (base 2) to base 10

b. 246 (base 10) to base 2

c. BA (base 16) to base 2`,
      explanation: `**Every place in a number is worth a power of its base.** In base 10, 512 is 5×10² + 1×10¹ + 2×10⁰: a ones place, a tens place, a hundreds place. Base 2 and base 16 work the same way, with powers of 2 and 16.

For **a**, the number has seven digits. Label the rightmost digit 2⁰, the next 2¹, and so on up to 2⁶. Then add up every place that holds a 1.

For **b**, write out the powers of two: 128, 64, 32, 16, 8, 4, 2, and 1. Start from the biggest and take each one that still fits. 246 - 128 = 118, 118 - 64 = 54, 54 - 32 = 22, 22 - 16 = 6. 8 does not fit into 6, so skip it. 6 - 4 = 2, 2 - 2 = 0, and 1 is not needed. Write a 1 for every power you took and a 0 for every one you skipped.

For **c**, every hex digit is exactly four binary digits. Convert **B** and **A** separately and put the groups side by side.`,
      solutionType: "text",
      solution: `**a. 95**
[[table]]
Place | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 64 | 32 | 16 | 8 | 4 | 2 | 1
Digit | 1 | 0 | 1 | 1 | 1 | 1 | 1
[[/table]]
64 + 16 + 8 + 4 + 2 + 1 = **95**

**b. 11110110**
[[table]]
Power of 2 | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
Used? | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0
[[/table]]
128 + 64 + 32 + 16 + 4 + 2 = 246, so the answer is **11110110**.

**c. 10111010**
[[table]]
Hex digit | B | A
Decimal | 11 | 10
Binary group | 1011 | 1010
[[/table]]
Put the groups together: **10111010**.`,
    },
    {
      id: "8",
      title: "question 8",
      topics: ["Arrays", "File", "Scanner", "Sorting"],
      prompt: `Write a complete Java program with comments in main and in each method.

A city is divided into **100 neighborhoods**, each with a unique name. Every three months, each neighborhood reports the prices of **four houses** sold; not all neighborhoods have sales to report every three months. Prices are in whole dollars. The file is structured like this:
[[text]]Midtown 23055 10000 19000 32009
Flatbush 3456683 23435 23456 4000
Brownsville 345565 234355 32434 53432[[/text]]

**Main:**

  1. Invoke method **readData** which reads the data from the input file, stores values into arrays and returns the number of records read in.
  2. Invoke method **modifyData**, passing an array of double as the parameter. The method modifies the values in the array based on rules specified below.
  3. Invoke method **sortArrays** to parallel sort the arrays of double and String. The method should be invoked *only once*.
  4. In main, print to a file the neighborhood name and average of the **three neighborhoods that have the highest average prices** in descending order (highest average price first), and the **three neighborhoods that have the lowest average prices** in ascending order (lowest average price first). The neighborhood should be left adjusted, the price right adjusted with two decimal places, and the header row should be included.

The program's output should look similar to this:
[[text]]Neighborhood   Avg Price
Eastside       108162.50
Greenfields     67576.06
Southside       60967.78

Neighborhood   Avg Price
Chelsea         47663.28
Westside        48830.93
Uptown          57200.00[[/text]]

**Method details:**

  **I. readData:**
      a. Receives an array of String and an array of double.
      b. Reads the neighborhood name as a String and the four prices as integers from a file.
      c. Stores the neighborhood name in the array of String and the __average__ of the 4 prices in the array of double.
      d. Returns the number of neighborhood records read in as an integer.

  **II. modifyData:**
      a. Receives an array of double and an integer representing the number of records read in by readData.
      b. Computes the **overall average** home price for all homes read in by readData (the average of the averages).
      c. **Increases** the average price for each neighborhood by **10%** if the average home price for that neighborhood is *below* the overall average, and **decreases** the average price for each neighborhood by **15%** if the average home price for that neighborhood is *above* the overall average.

  **III. sortArrays:**
      a. Receives the arrays of double and String and an integer representing the number of records read in by readData.
      b. Parallel sorts the arrays, only for the number of records read in by readData, with the primary sort on the array of double in **descending** order.`,
      explanation: `This is a long problem, but each method is doing one very specific job. The key is to not let all the details blur together.

**readData** fills two parallel arrays. The String array stores the neighborhood names, and the double array stores the average of the four prices for that neighborhood. The prices are whole dollars, so read them with **nextInt()**, add them up, and divide by **4.0** so the average keeps its decimal. Every time we read a full record, we increment the counter. At the end, that counter tells the rest of the program how many real records are in the arrays.

**modifyData** first computes the overall average by summing the neighborhood averages and dividing by the number of records. Then it loops through the averages again and applies the rule:
[[table]]
Neighborhood average is | Change | Multiply by
below the overall average | up 10% | 1.10
above the overall average | down 15% | 0.85
equal to the overall average | none | (left alone)
[[/table]]

**sortArrays** is a parallel sort. This means whenever two average prices swap places, the matching neighborhood names must swap too. If you only sort the prices array, the names and averages will no longer match.

After sorting in descending order, the highest averages are at the **front** and the lowest are at the **end**. So main prints the first three records for the highest prices, then the last three *backwards*, starting from the very last one, for the lowest.

For the columns, **%-15s** left adjusts the name in a field 15 characters wide, and **%9.2f** right adjusts the price with two decimal places.`,
      solution: `import java.util.Scanner;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class Spring2021Question8 {

    public static void main(String[] args) throws IOException {

        // room for all 100 neighborhoods
        final int MAX_NEIGHBORHOODS = 100;

        String[] neighborhoods = new String[MAX_NEIGHBORHOODS];
        double[] averagePrices = new double[MAX_NEIGHBORHOODS];

        // read the file, adjust the averages, then sort highest to lowest
        int numRecords = readData(neighborhoods, averagePrices);
        modifyData(averagePrices, numRecords);
        sortArrays(averagePrices, neighborhoods, numRecords);

        PrintWriter writer = new PrintWriter("spring_2021_output.txt");

        // the three highest averages are at the front of the sorted arrays
        writer.printf("%-15s%9s\\n", "Neighborhood", "Avg Price");
        for (int i = 0; i < 3; i++) {
            writer.printf("%-15s%9.2f\\n", neighborhoods[i], averagePrices[i]);
        }

        // the three lowest are at the end, so walk backwards to print lowest first
        writer.println();
        writer.printf("%-15s%9s\\n", "Neighborhood", "Avg Price");
        for (int i = numRecords - 1; i >= numRecords - 3; i--) {
            writer.printf("%-15s%9.2f\\n", neighborhoods[i], averagePrices[i]);
        }

        writer.close();
    }

    public static int readData(String[] neighborhoods, double[] averagePrices) throws IOException {
        // read each name and its four prices, and store the name and average price
        Scanner sc = new Scanner(new File("spring_2021_input.txt"));
        int numNeighborhoods = 0;

        while (sc.hasNext()) {
            neighborhoods[numNeighborhoods] = sc.next();

            int sum = 0;
            for (int i = 0; i < 4; i++) {
                sum += sc.nextInt();
            }
            averagePrices[numNeighborhoods] = sum / 4.0;

            numNeighborhoods++;
        }

        sc.close();
        return numNeighborhoods;
    }

    public static void modifyData(double[] averagePrices, int numRecords) {
        // find the overall average (the average of the averages)
        double sum = 0;

        for (int i = 0; i < numRecords; i++) {
            sum += averagePrices[i];
        }

        double average = sum / numRecords;

        // raise below-average neighborhoods by 10%, lower above-average ones by 15%
        for (int i = 0; i < numRecords; i++) {
            if (averagePrices[i] < average) {
                averagePrices[i] *= 1.10;
            } else if (averagePrices[i] > average) {
                averagePrices[i] *= 0.85;
            }
        }
    }

    public static void sortArrays(double[] averagePrices, String[] neighborhoods, int numRecords) {
        // bubble sort by price, highest first, swapping the names right along with the prices
        for (int i = 0; i < numRecords - 1; i++) {
            for (int j = 0; j < numRecords - 1 - i; j++) {
                if (averagePrices[j] < averagePrices[j + 1]) {

                    double tempDouble = averagePrices[j + 1];
                    averagePrices[j + 1] = averagePrices[j];
                    averagePrices[j] = tempDouble;

                    String tempString = neighborhoods[j + 1];
                    neighborhoods[j + 1] = neighborhoods[j];
                    neighborhoods[j] = tempString;
                }
            }
        }
    }
}`,
    },
  ],
};
