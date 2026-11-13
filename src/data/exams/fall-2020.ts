import type { Exam } from "../../types";

export const fall2020: Exam = {
  id: "fall2020",
  label: "fall 2020",
  year: "2020",
  questions: [
    {
      id: "1a",
      title: "question 1a",
      topics: ["Loops", "Tracing"],
      prompt: `Trace the x and y variables in the following code. Write all of the values x and y take throughout the code snippet's execution.
[[code]]int x = 5;
int y = 10;

do {
    x++;
    y--;

    while (y > 8) {
        x = x + 2;
        y = y - 3;
    }
} while (x < 10);[[/code]]`,
      explanation: `Write down every pair of values x and y take, **in order**.

x and y begin at **5 and 10**.

Enter the do while. Increment x and decrement y: **x = 6, y = 9**.

y = 9 is greater than 8, so the *inner* while runs. Add 2 to x and subtract 3 from y: **x = 8, y = 6**. Now y = 6 is not greater than 8, so the inner loop stops.

At the bottom of the do while, x = 8 is less than 10, so go around again.

Increment and decrement: **x = 9, y = 5**. y is not greater than 8, so the inner loop is **skipped entirely**. x = 9 is still less than 10, so go around again.

Increment and decrement: **x = 10, y = 4**. The inner loop is skipped again. x = 10 is *not* less than 10, so the do while finally ends.`,
      solutionType: "text",
      solution: `[[table]]
x | y | What happened
5 | 10 | starting values
6 | 9 | do while: x++, y--
8 | 6 | inner while: x + 2, y - 3
9 | 5 | do while: x++, y-- (inner while skipped)
10 | 4 | do while: x++, y-- (both loops end)
[[/table]]`,
    },
    {
      id: "1b",
      title: "question 1b",
      topics: ["Loops", "Tracing"],
      prompt: `Trace the variables in the following code. Write all of the values i and j take throughout the execution of the code snippet.
[[code]]for (int i = 0; i < 5; i = i + 2) {
    for (int j = i; j > 0; j--) {

    }
}[[/code]]`,
      explanation: `Write down every value i and j take.

i starts at **0**. The inner loop sets j = i = 0, but j > 0 is false, so the inner loop **never runs**.

i goes up by 2, to **2**. j starts at 2, and the inner loop runs with j = 2, then j = 1. When j drops to 0 the condition fails and the inner loop stops.

i goes up to **4**. j starts at 4 and counts down: 4, 3, 2, 1. See the pattern? **j always starts at i and counts down to 1.**

i goes up to 6, which is not less than 5, so everything stops.

In the table, the **dash** for i = 0 means the inner loop never ran. The **j = 0** rows are the value that ends each inner loop.`,
      solutionType: "text",
      solution: `[[table]]
i | j
0 | -
2 | 2
2 | 1
2 | 0
4 | 4
4 | 3
4 | 2
4 | 1
4 | 0
[[/table]]`,
    },
    {
      id: "2",
      title: "question 2",
      topics: ["Arithmetic", "Modulo"],
      prompt: `Assume the existence of an **int** variable called inches. Compute and print how many miles, yards, feet and inches that number represents.

Remember that 1 foot equals 12 inches, 36 inches equals 1 yard, and 5280 feet equals 1 mile.

For example, if inches is:
[[code]]int inches = 245897;[[/code]]

Then the program's output is:
[[text]]245897 inches equals 3 miles 1550 yards 1 foot and 5 inches[[/text]]`,
      explanation: `This problem needs the division and modulo operators working as a team.

**Division** tells you how many whole units fit. **Modulo** tells you what is *left over* after you take those units away.

Start with the **biggest** unit. A mile is 5280 × 12 = 63360 inches. Here is every variable in the solution:
[[table]]
Variable | Computed as | Value
miles | inches / (5280 × 12) | 3
remainingYards | inches % (5280 × 12) | 55817
yards | remainingYards / 36 | 1550
remainingFeet | inches % 36 | 17
feet | remainingFeet / 12 | 1
remainingInches | inches % 12 | 5
[[/table]]

Notice that **remainingFeet** and **remainingInches** take the modulo of the *original* inches, not the leftover. That works because the units **nest evenly**: a mile is exactly 1760 yards, and a yard is exactly 3 feet. Stripping off whole miles never changes the remainder when you divide by 36 or by 12.

They can ask different variants of this problem: coins, seconds, and so on. The recipe never changes: **start large, divide to get the count, and mod to strip those units off.**`,
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
      id: "3",
      title: "question 3",
      topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
      prompt: `Show the work you used to perform the following conversions:

a. 1100110 (base 2) to base 10

b. AB (base 16) to base 10

c. 65 (base 10) to base 2`,
      explanation: `**Every place in a number is worth a power of its base.** In base 10, 512 is 5×10² + 1×10¹ + 2×10⁰: a ones place, a tens place, a hundreds place. Base 2 and base 16 work the same way, with powers of 2 and 16.

For **a**, the number has seven digits. Label the rightmost digit 2⁰, the next 2¹, and so on up to 2⁶. Then add up the places that hold a 1.

For **b**, in hexadecimal **A = 10** and **B = 11**. Multiply each digit by its power of 16.

For **c**, write out the powers of two: 64, 32, 16, 8, 4, 2, 1. Pick the ones that add up to 65. Only **64 + 1** works, so write a 1 under 64, a 1 under 1, and a 0 everywhere else.`,
      solutionType: "text",
      solution: `**a. 102**
[[table]]
Place | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 64 | 32 | 16 | 8 | 4 | 2 | 1
Digit | 1 | 1 | 0 | 0 | 1 | 1 | 0
[[/table]]
64 + 32 + 4 + 2 = **102**

**b. 171**

A×16¹ + B×16⁰ = 10×16 + 11×1 = 160 + 11 = **171**

**c. 1000001**
[[table]]
Power of 2 | 64 | 32 | 16 | 8 | 4 | 2 | 1
Used? | 1 | 0 | 0 | 0 | 0 | 0 | 1
[[/table]]
64 + 1 = 65, so the answer is **1000001**.`,
    },
    {
      id: "4a",
      title: "question 4a",
      topics: ["Arrays", "Methods", "Pass by Value", "Tracing"],
      prompt: `Fill in the table to trace the values as they are passed from main and changed in the method.
[[code]]int[] array = {1,2,3,4,5};
int x = 12;
int y = doOne(array, x);

int[] array2 = {1,2,3,4,5};
int w = doOne(array2, array2[3]);
} // end of main

public static int doOne(int[] arr, int x) {
    for (int i = 0; i < arr.length-1; i++)
        arr[i] = arr[i] * arr[i+1];
    x = x + 3;
    return x;
}[[/code]]

Trace these values for the first call:
[[table]]
Variable | Value
x in main before call to doOne | ?
array in main before call to doOne | ?
arr in doOne before loop | ?
x in doOne before loop | ?
arr in doOne after loop | ?
x in doOne after loop | ?
x in main after call to doOne | ?
y in main after call to doOne | ?
array in main after call to doOne | ?
[[/table]]

And these values for the second call:
[[table]]
Variable | Value
array2 in main before call to doOne | ?
arr in doOne before loop | ?
x in doOne before loop | ?
arr in doOne after loop | ?
x in doOne after loop | ?
w in main after call to doOne | ?
array2 in main after call to doOne | ?
[[/table]]`,
      explanation: `Two rules decide everything in this question.

**An int parameter is a copy.** The x inside doOne is a brand new variable that starts with the same value. Changing it does nothing to the x in main.

**An array parameter points at the same array.** arr and array are two names for the same block of memory, so every change doOne makes to arr shows up in main.

The loop multiplies each element by the one to its right, stopping one short of the end:
[[table]]
i | arr[i] = arr[i] × arr[i+1] | arr afterwards
0 | 1 × 2 = 2 | {2, 2, 3, 4, 5}
1 | 2 × 3 = 6 | {2, 6, 3, 4, 5}
2 | 3 × 4 = 12 | {2, 6, 12, 4, 5}
3 | 4 × 5 = 20 | {2, 6, 12, 20, 5}
[[/table]]
Notice each step uses the *original* value to the right, since that element has not been changed yet.

The loop never touches x. The line **x = x + 3** runs right after the loop, so x leaves doOne as 15. That 15 is returned and stored in y, while the x in main is still 12.

The second call has one trap: **array2[3]** is evaluated *before* the call, when it is still 4. So the method's x starts at 4 and returns 7, even though arr[3] becomes 20 during the loop.`,
      solutionType: "text",
      solution: `**First call:** doOne(array, x)
[[table]]
Variable | Value
x in main before call to doOne | 12
array in main before call to doOne | {1, 2, 3, 4, 5}
arr in doOne before loop | {1, 2, 3, 4, 5}
x in doOne before loop | 12
arr in doOne after loop | {2, 6, 12, 20, 5}
x in doOne after loop | 15
x in main after call to doOne | 12
y in main after call to doOne | 15
array in main after call to doOne | {2, 6, 12, 20, 5}
[[/table]]

**Second call:** doOne(array2, array2[3])
[[table]]
Variable | Value
array2 in main before call to doOne | {1, 2, 3, 4, 5}
arr in doOne before loop | {1, 2, 3, 4, 5}
x in doOne before loop | 4
arr in doOne after loop | {2, 6, 12, 20, 5}
x in doOne after loop | 7
w in main after call to doOne | 7
array2 in main after call to doOne | {2, 6, 12, 20, 5}
[[/table]]`,
    },
    {
      id: "4b",
      title: "question 4b",
      topics: ["Arrays", "Methods", "Pass by Value", "Tracing"],
      prompt: `Fill in the table to trace the values as they are passed from main and changed in the method.
[[code]]int[] array3 = {1,2,3,4,5};
int s = 12;
int v = 32;
int[] num = doTwo(array3, v, s);
} // end of main

public static int[] doTwo(int[] arr, int x, int y) {
    int[] ret = new int[2];
    x = arr[2];
    y = arr[3];
    ret[0] = x + arr[1];
    ret[1] = y - arr[0];
    return ret;
}[[/code]]

[[table]]
Variable | Value
array3 before call to doTwo | ?
s before call to doTwo | ?
v before call to doTwo | ?
arr in doTwo | ?
x in doTwo | ?
y in doTwo | ?
ret in doTwo | ?
array3 in main after call to doTwo | ?
num in main after call to doTwo | ?
s in main after call to doTwo | ?
v in main after call to doTwo | ?
[[/table]]`,
      explanation: `Watch the order of the arguments. The call is **doTwo(array3, v, s)**, so x gets a copy of **v** (32) and y gets a copy of **s** (12). It is easy to mix those up because s is declared first.

Inside the method, x and y are immediately overwritten: x = arr[2] = 3 and y = arr[3] = 4. Since they are copies, s and v in main stay 12 and 32.

Then the method builds a new two-element array:

  • ret[0] = x + arr[1] = 3 + 2 = **5**
  • ret[1] = y - arr[0] = 4 - 1 = **3**

doTwo only *reads* from arr, so array3 is unchanged. The returned array {5, 3} is stored in num.`,
      solutionType: "text",
      solution: `[[table]]
Variable | Value
array3 before call to doTwo | {1, 2, 3, 4, 5}
s before call to doTwo | 12
v before call to doTwo | 32
arr in doTwo | {1, 2, 3, 4, 5}
x in doTwo | 32, then 3
y in doTwo | 12, then 4
ret in doTwo | {5, 3}
array3 in main after call to doTwo | {1, 2, 3, 4, 5}
num in main after call to doTwo | {5, 3}
s in main after call to doTwo | 12
v in main after call to doTwo | 32
[[/table]]`,
    },
    {
      id: "5a",
      title: "question 5a",
      topics: ["Math Methods"],
      prompt: `Assume the six integers i, j, k, l, m, and n exist and are all initialized.

Assume there exists a method **max3()**, which accepts 3 integers as input and returns the largest integer.

Write **one** Java statement to find the maximum of the six integers using any combination of **Math.max()** and **max3()**.`,
      explanation: `**Math.max()** only accepts **two** values, so we need to group the integers.

Use **max3()** once on **i, j, k** and once on **m, n, l**. That gives the biggest value in each group. The order inside each group does not matter.

Then send those two results into **Math.max()**. The larger of the two group winners is the largest of all six.
[[table]]
Step | Call | Example with 3, 9, 2, 7, 11, 4
Group 1 | max3(i, j, k) | 9
Group 2 | max3(m, n, l) | 11
Winner | Math.max(9, 11) | 11
[[/table]]`,
      solution: `int max = Math.max(max3(i, j, k), max3(m, n, l));`,
    },
    {
      id: "5b",
      title: "question 5b",
      topics: ["Equations", "Math Methods"],
      prompt: `Write a Java expression that would compute the following:`,
      mathLatex: `\\frac{x^2 - \\dfrac{1}{(y+3)}}{\\dfrac{1}{z} + \\sqrt{x}}`,
      explanation: `This is a direct equation translation. Build the expression **one piece at a time**, and use parentheses whenever a fraction has a top and a bottom.
[[table]]
Piece | Java
x² | Math.pow(x, 2)
√x | Math.sqrt(x)
Top of the big fraction | Math.pow(x, 2) - (1.0 / (y + 3))
Bottom of the big fraction | (1.0 / z) + Math.sqrt(x)
[[/table]]

Once the top and bottom are built, wrap **each** in its own parentheses and divide.

Use **1.0** instead of **1** in the small fractions. If y and z are ints, **1 / z** would be *integer division* and come out as 0 for any z bigger than 1.`,
      solution: `double result = (Math.pow(x, 2) - (1.0 / (y + 3))) / ((1.0 / z) + Math.sqrt(x));`,
    },
    {
      id: "5c",
      title: "question 5c",
      topics: ["Arrays", "Binary Search"],
      prompt: `Perform a binary search on the following array. You are searching for the number **18**.
[[code]]int[] nums = {12, 77, 87, 89, 100, 117, 125, 189, 235, 529, 1000};[[/code]]

List the low, mid and high values at each step until the algorithm stops. Do NOT write any code. You may use either the subscript (index) values or the actual number stored at the subscript. Not all rows of the table may be needed.`,
      explanation: `The array has 11 values, so the indices go from **0 to 10**. Binary search jumps to the middle. If the middle is **too small, move right**. If the middle is **too big, move left**.

(0 + 10) / 2 is 5. nums[5] is 117, bigger than 18, so move left: high = mid - 1 = 4.

(0 + 4) / 2 is 2. nums[2] is 87, still bigger: high = 1.

(0 + 1) / 2 is 0, since integer division truncates the decimal. nums[0] is 12, smaller than 18, so move right: low = mid + 1 = 1.

(1 + 1) / 2 is 1. nums[1] is 77, bigger than 18: high = 0.

Now low is 1 and high is 0. The loop condition, **while (low <= high)**, is false. 18 is *not* in the array.`,
      solutionType: "text",
      solution: `[[table]]
Low | Mid | High | nums[mid]
0 | 5 | 10 | 117
0 | 2 | 4 | 87
0 | 0 | 1 | 12
1 | 1 | 1 | 77
1 | - | 0 | -
[[/table]]

The search stops because low (1) is greater than high (0). 18 is not in the array.`,
    },
    {
      id: "6",
      title: "question 6",
      topics: ["Arrays", "Loops", "Split", "Strings"],
      prompt: `You are given a **String** variable containing a series of nine digit zip codes separated by spaces. Each zip code contains a single dash, separating the first five numbers of the code from the final four. For example,
[[code]]String str = "11230-1234 11011-3489 07621-8845";[[/code]]

Write a program to print every zip code in the **String** on a separate line, with the *first five* and *last four* numbers of each code having a space between them.

For example, if we use the **String** from the example, your program should output the following:
[[text]]11230 1234
11011 3489
07621 8845[[/text]]

**NOTE**: Keep in mind that your code must handle a String that has an arbitrary number of zip codes, not just the three like the example above.`,
      explanation: `Use **split()** twice.

Split the input String **on spaces**. That gives an array of full zip codes like "11230-1234".

For each zip code, split *it* **on the dash**. That gives a two-element array: the first five digits at index 0 and the last four at index 1.
[[table]]
codes[i] | parts[0] | parts[1] | Printed
"11230-1234" | "11230" | "1234" | 11230 1234
"11011-3489" | "11011" | "3489" | 11011 3489
"07621-8845" | "07621" | "8845" | 07621 8845
[[/table]]

Because we loop over **codes.length**, this works no matter how many zip codes are in the String.

Keep the zip codes as **Strings**. If you turned a zip code starting with 0 into an int, the leading zero would disappear.`,
      solution: `public class Fall2020Question6 {
    public static void main(String[] args) {

        String str = "11230-1234 11011-3489 07621-8845";

        // create an array of zip codes
        String[] codes = str.split(" ");
        // codes = {"11230-1234", "11011-3489", "07621-8845"}

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
      id: "7",
      title: "question 7",
      topics: ["Arrays", "File", "Scanner", "Sorting"],
      prompt: `Write a complete Java program, including at least one comment in the main program and one in each method, to do the following.

The program will read in an unknown number of records from a file. Assume you won't have more than 100 records in total, though the actual number of records can be less than 100. Each record contains a sales rep's first name and miles traveled on two trips per year. For example, the file might look like this:
[[text]]Pauline 167.8 567.0
Alexander 451.22 56.11
Samuel 234.11 581.83[[/text]]

**Main:**

  • Declare an output file to be used in main and passed to one or more methods from main. __All output from main and methods will be printed to this file.__
  • Invoke the **first method** (below) to read the data from the input file, compute averages and store information in the arrays. The method returns the number of records read in.
  • Next, invoke the **second method** (below) which computes the average length of all trips and then prints to the output file how many individual averages are above, equal to and below the overall average.
  • Finally, invoke the **third method** (below) to sort the name and individual average trip length arrays in parallel.
  • In main, print to the output file each sales rep name and average trip length. The names and average trip length should print in columns, right adjusted. All trip lengths should be printed with two decimal places.

**Methods:**

  1. This method has **two parameters**: a String array for names and a double array for the average trip length per individual sales rep. It returns an integer.
      a. Declare the input file, read the records in the file and store each first name in an array (assume there are no duplicate names) and the average number of miles travelled for that sales rep in another array. You do not need to store the individual trip length.
      b. Return the number of sales rep records read in.

  2. This method has **three parameters**: the output file, a double array of individual average trip length and an integer representing the total number of records read in.
      a. Compute the overall average trip length across all sales reps.
      b. Compute and print to the output file how many sales reps' individual average trip length were above the overall average trip length, below the overall average trip length and equal to the overall average trip length.

  3. This method has **three parameters**: a String array of names, a double array of individual average trip length and an integer representing the total number of records read in by the first method.
      a. Sort the sales rep names in descending (reverse) alphabetical order, synchronizing the individual sales rep's average trip length in the parallel array.`,
      explanation: `This is another long method problem, so the easiest way to approach it is to let each method own one piece of the prompt.

**readData** reads one sales rep record at a time. Each record looks like "Pauline 167.8 567.0", so read the name with **sc.next()** and the two trip lengths with **sc.nextDouble()**. The average of the two trips goes into the double array, and the name goes into the String array **at the same index**.

**computeTripLength** first finds the overall average across all sales reps. Then it counts how many individual averages are above, below, or equal to it, and prints those counts to the output file. That is why the PrintWriter is one of its parameters.

With the sample file:
[[table]]
Name | Trip 1 | Trip 2 | Average | Compared to 343.01
Pauline | 167.8 | 567.0 | 367.40 | above
Alexander | 451.22 | 56.11 | 253.67 | below
Samuel | 234.11 | 581.83 | 407.97 | above
[[/table]]
The overall average is 343.01, so the file gets **2 above, 1 below, 0 equal**.

**sortArray** is a parallel sort. The primary sort is based on the names, but the average trip length has to move with the matching name. Whenever two names swap, their averages must swap too.

The String comparison uses **compareTo()**. If **names[j].compareTo(names[j + 1]) < 0**, the name at index j comes *earlier* alphabetically, so swap it toward the end. That creates descending (**Z to A**) order: Samuel, Pauline, Alexander.`,
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
