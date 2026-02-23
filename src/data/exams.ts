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
        topics: ["Equations", "Math Methods"],
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
        topics: ["Arrays",  "Loops", "Split", "Strings"],
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
        topics: ["Arrays", "File", "Scanner", "Sorting"],
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
        explanation: `The readData() method involves using a Scanner to read input from a text stream by using a while loop bounded by the hasNext() method. We use a counter in conjunction with the .next() and .nextDouble() methods to move data from the file into our arrays. Since the file is structured like "Pauline 167.8 567.0", we read in the name using sc.next(), and we calculate the average through (sc.nextDouble()+sc.nextDouble()) / 2.0 as each person has two trip lengths.
        
        computeTripLength() is self explanatory.
        
        The sorting involves the compareTo() method, which we use for comparing strings. s1.compareTo(s2) > 0 is equivalent to "s1 > s2." s1.compareTo(s2) < 0 is equivalent to "s1 < s2." This solution uses BubbleSort. SelectionSort and InsertionSort solutions are also valid."`,
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
  },
  {
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

        // raindInt from [min, max]
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
        id: 'question-7',
        title: 'question 7',
        topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
        prompt: `tba`,
        explanation: `tba`,
        solution: `tba`
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
  explanation: "Explanation goes here.",
  solution: `import java.util.Scanner;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class Spring2021Question7 {

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
  },
];