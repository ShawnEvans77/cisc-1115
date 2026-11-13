import type { Exam } from "../../types";

export const fall2018: Exam = {
  id: "fall2018",
  label: "fall 2018",
  year: "2018",
  questions: [
    {
      id: "1a",
      title: "question 1a",
      topics: ["Arrays", "Debugging", "Loops"],
      prompt: `The code below is preceded by a comment saying what it should do. There is **at least one** problem with the code and it fails to do what was intended.

Show how to modify or rewrite the code so that it does work as intended. If there are multiple problems, correct each one. Assume that all variables used have already been declared.
[[code]]// INTENT: given an array arr of int values
// set small equal to the smallest of the array values
small = arr[0];
for (int j = 0; j < arr.length-1; j++)
    if (small < arr[j])
        arr[j] = small;[[/code]]`,
      explanation: `Finding the smallest value is a classic pattern: *assume* the first value is the smallest, then walk the rest of the array and replace your guess whenever you find something smaller. This code gets **three** things wrong:
[[table]]
Problem | Original | Fixed
Loop stops early | j < arr.length-1 | j < arr.length
Comparison is backwards | small < arr[j] | arr[j] < small
Assignment is backwards | arr[j] = small | small = arr[j]
[[/table]]

**The loop stops early.** **j < arr.length-1** never looks at the last element, so a minimum at the very end is missed. (Starting at 1 is optional, since arr[0] is already in small.)

**The comparison is backwards.** **small < arr[j]** is true when arr[j] is *bigger*. We want to react when arr[j] is *smaller*.

**The assignment is backwards.** **arr[j] = small** overwrites the array and leaves small alone. We want to update **small**.`,
      solution: `small = arr[0];
for (int j = 1; j < arr.length; j++)   // FIX: check every element, including the last
    if (arr[j] < small)                // FIX: react when arr[j] is smaller
        small = arr[j];                // FIX: update small, not the array`,
    },
    {
      id: "1b",
      title: "question 1b",
      topics: ["Arrays", "Casting", "Debugging", "Loops"],
      prompt: `The code below is preceded by a comment saying what it should do. There is **at least one** problem with the code and it fails to do what was intended.

Show how to modify or rewrite the code so that it does work as intended. If there are multiple problems, correct each one. Assume that all variables used have already been declared.
[[code]]// INTENT: compute the average of all n values in the integer array arr;
// compute the average as a double and store it in the double variable avg
int sum = 0;
int n = arr.length;
for (int k = arr.length; k <= 0; k--)
    sum = sum + arr[k];
double avg = sum / n;[[/code]]`,
      explanation: `There are **three** problems: two in the loop and one in the division.
[[table]]
Problem | Original | Fixed
Loop never runs | k <= 0 | k >= 0
Starts out of bounds | k = arr.length | k = n - 1
Integer division | sum / n | (double) sum / n
[[/table]]

**The loop never runs.** k starts at arr.length, which is positive, so **k <= 0** is false right away. Counting down, the loop should run *while* **k >= 0**.

**The starting index is out of bounds.** Even with the condition fixed, **arr[arr.length]** does not exist. The last valid index is **arr.length - 1**.

**The division is integer division.** sum and n are both ints, so **sum / n** chops off the decimal *before* the result reaches avg. An average of 2.5 would come out as 2.0. Cast one side to double first.

Counting backwards is fine, by the way. Addition does not care about order, so a forward loop would also work.`,
      solution: `int sum = 0;
int n = arr.length;
for (int k = n - 1; k >= 0; k--)    // FIX: start at the last valid index and loop while k >= 0
    sum = sum + arr[k];
double avg = (double) sum / n;      // FIX: cast so the division keeps its decimal`,
    },
    {
      id: "1c",
      title: "question 1c",
      topics: ["Arrays", "Debugging", "Loops"],
      prompt: `The code below is preceded by a comment saying what it should do. There is **at least one** problem with the code and it fails to do what was intended.

Show how to modify or rewrite the code so that it does work as intended. If there are multiple problems, correct each one. Assume that all variables used have already been declared.
[[code]]// INTENT: the array b should have the values of array a in reverse order
int[] a = {1,2,3,4,5};
int[] b = new int[5];
for (int i=0; i<=a.length; i++)
    b[i-1] = a[a.length-i];[[/code]]`,
      explanation: `The body of the loop is actually set up for i going from **1 to a.length**. Check the first and last passes:
[[table]]
i | b[i-1] | a[a.length-i]
1 | b[0] | a[4]
5 | b[4] | a[0]
[[/table]]

That is exactly a reversal. The only problem is that the loop starts at **i = 0**, and on that first pass **b[-1]** and **a[5]** are both *out of bounds*, which crashes the program.

**Start the loop at 1** and keep **i <= a.length**.`,
      solution: `int[] a = {1,2,3,4,5};
int[] b = new int[5];
for (int i = 1; i <= a.length; i++)   // FIX: start at 1 so b[i-1] and a[a.length-i] stay in bounds
    b[i-1] = a[a.length-i];`,
    },
    {
      id: "2a",
      title: "question 2a",
      topics: ["Loops", "Tracing"],
      prompt: `What is printed by the following code?
[[code]]int x = 5;
do {
    System.out.println(x);
    x = x + 3;
} while (x < 10);
System.out.println("now " + x);[[/code]]`,
      explanation: `A **do while** loop always runs its body **at least once**, and checks the condition at the *bottom*.
[[table]]
Pass | Prints | x after x + 3 | x < 10?
1 | 5 | 8 | true, go again
2 | 8 | 11 | false, stop
[[/table]]

The last line prints "now " followed by the final value of x, which is **11**.`,
      solutionType: "text",
      solution: `[[text]]5
8
now 11[[/text]]`,
    },
    {
      id: "2b",
      title: "question 2b",
      topics: ["Loops", "Tracing"],
      prompt: `What is printed by the following code?
[[code]]for (int i = 3; i > 1; i--) {
    System.out.println(i + " and " + (i * 10 - 1));
}
System.out.println("finished");[[/code]]`,
      explanation: `The loop counts down from 3 and stops once i is no longer greater than 1, so it only runs for **i = 3 and i = 2**.

The parentheses around the math matter. Without them, Java would glue i onto the String first and then try to subtract from a String, which does not compile. With them, the math happens *first*:
[[table]]
i | i × 10 − 1 | Printed
3 | 29 | 3 and 29
2 | 19 | 2 and 19
[[/table]]

Then i becomes 1, the loop ends, and "finished" prints.`,
      solutionType: "text",
      solution: `[[text]]3 and 29
2 and 19
finished[[/text]]`,
    },
    {
      id: "2c",
      title: "question 2c",
      topics: ["Loops", "Tracing"],
      prompt: `What is printed by the following code?
[[code]]double z = 5.4321;
int j = 4;
while (j < z) {
    System.out.println(j + " is less than " + z);
    j++;
}
System.out.println("it is " + j + " at the end");[[/code]]`,
      explanation: `Comparing an int to a double is allowed. Java treats j as a decimal for the comparison.
[[table]]
j | j < 5.4321? | Prints
4 | true | 4 is less than 5.4321
5 | true | 5 is less than 5.4321
6 | false | (loop ends)
[[/table]]

Notice that z prints exactly as stored, **5.4321**, and that the last line shows j *after* it went one past the limit: **6**.`,
      solutionType: "text",
      solution: `[[text]]4 is less than 5.4321
5 is less than 5.4321
it is 6 at the end[[/text]]`,
    },
    {
      id: "3",
      title: "question 3",
      topics: ["Strings", "Tracing"],
      prompt: `What is printed by the following sections of code?

a.
[[code]]String source = "ID is 12-AB-1X ";
int pos = source.indexOf('-');
int pos1 = source.indexOf(' ', pos+1);
String str1 = source.substring(pos+1, pos1);
System.out.println(str1);[[/code]]

b.
[[code]]source = "from Denver,CO.";
int pos2 = source.lastIndexOf(',');
int pos3 = source.lastIndexOf(' ', pos2);
String str2 = source.substring(pos3+1, pos2);
System.out.println(source.substring(pos3+1, pos2));[[/code]]

c.
[[code]]System.out.println(str1.compareTo(str2) > 0);[[/code]]`,
      explanation: `String questions get much easier once you **write the indices under the characters**. In the tables below, ␣ marks a space.

For **a**, notice the String ends with a space.
[[table]]
Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
Char | I | D | ␣ | i | s | ␣ | 1 | 2 | - | A | B | - | 1 | X | ␣
[[/table]]
The first dash is at index **8**, so pos = 8. Searching for a space starting at index 9 finds the one at index **14**, so pos1 = 14. **substring(9, 14)** takes indices 9 through 13 (the end index is not included), which is "AB-1X".

For **b**:
[[table]]
Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
Char | f | r | o | m | ␣ | D | e | n | v | e | r | , | C | O | .
[[/table]]
**lastIndexOf(',')** searches from the end, and the comma is at index **11**. **lastIndexOf(' ', 11)** searches *backwards* starting at index 11, and finds the space at index **4**. **substring(5, 11)** is "Denver".

For **c**, compareTo looks at the first characters that differ. "AB-1X" starts with 'A' and "Denver" starts with 'D'. 'A' comes before 'D', so the result is negative, and negative > 0 is **false**.`,
      solutionType: "text",
      solution: `[[text]]AB-1X
Denver
false[[/text]]`,
    },
    {
      id: "4",
      title: "question 4",
      topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
      prompt: `Perform the following conversions:

a. 101010 (base 2) to base 10

b. CA (base 16) to base 10

c. 10101011 (base 2) to base 16

d. 50 (base 10) to base 2

e. F8 (base 16) to base 2

f. Perform the following addition of two binary (base 2) numbers. Your answer should be a number in binary.
[[text]]101 + 110 = ?[[/text]]`,
      explanation: `Every place in a number is worth a power of its base. In base 10, 512 is 5×10² + 1×10¹ + 2×10⁰. Base 2 and base 16 work the same way, just with powers of 2 and 16.

For **a**, label the places 2⁵ down to 2⁰ and add up the places that hold a 1.

For **b**, C is 12 and A is 10 in hexadecimal. Multiply each digit by its power of 16.

For **c**, one hex digit is exactly four binary digits. Split the number into groups of four starting from the right and convert each group.

For **d**, write out the powers of two (32, 16, 8, 4, 2, 1) and pick the ones that add up to 50.

For **e**, turn each hex digit into its four-bit group and line them up.

For **f**, add column by column from the right. In binary, 1 + 1 is 10: write the 0 and carry the 1.`,
      solutionType: "text",
      solution: `**a. 42**
[[table]]
Place | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 32 | 16 | 8 | 4 | 2 | 1
Digit | 1 | 0 | 1 | 0 | 1 | 0
[[/table]]
32 + 8 + 2 = **42**

**b. 202**

C×16¹ + A×16⁰ = 12×16 + 10 = 192 + 10 = **202**

**c. AB**
[[table]]
Binary group | 1010 | 1011
Hex digit | A | B
[[/table]]
1010 is 10, which is A. 1011 is 11, which is B.

**d. 110010**
[[table]]
Power of 2 | 32 | 16 | 8 | 4 | 2 | 1
Used? | 1 | 1 | 0 | 0 | 1 | 0
[[/table]]
32 + 16 + 2 = 50, so the answer is **110010**.

**e. 11111000**
[[table]]
Hex digit | F | 8
Binary group | 1111 | 1000
[[/table]]
F is 15 = 1111, and 8 = 1000. Together: **11111000**.

**f. 1011**
[[text]]   1      carries
    101
  + 110
  -----
   1011[[/text]]
Check in base 10: 5 + 6 = 11, and 11 is 1011 in binary.`,
    },
    {
      id: "5",
      title: "question 5",
      topics: ["Arrays", "Methods", "Pass by Value", "Tracing"],
      prompt: `What is printed by the following code found in main of a Java program with the methods below?
[[code]]int[] arr = {1,2,3,4,5};

doOne(arr[0]);
System.out.println(arr[0]);

doTwo(arr,1);
System.out.println(arr[1]);

doThree(arr);
System.out.println(arr[2]);[[/code]]

The program contains the following methods:
[[code]]static void doOne(int n){
    n=n*10;
}

static void doTwo(int[] arr, int j){
    arr[j] = arr[j+2] *10;
}

static void doThree(int[] arr){
    for (int i=0; i<arr.length; i++)
        arr[i] = arr[i]*5;
}[[/code]]`,
      explanation: `This question is all about what a method can and cannot change.

**doOne** receives **arr[0]**, which is just the int 1. Java passes a *copy* of the value. The method multiplies its own copy by 10 and then throws it away. The array is untouched, so main prints **1**.

**doTwo** receives the array itself. More precisely, it receives a copy of the *reference* to the same array in memory, so any change it makes is visible in main. With j = 1, it sets arr[1] to arr[3] times 10, which is 40. Main prints **40**.

**doThree** also receives the array, and multiplies every element by 5. At this point the array is {1, 40, 3, 4, 5}, so it becomes {5, 200, 15, 20, 25}. Main prints arr[2], which is **15**.
[[table]]
After | arr
doOne(arr[0]) | {1, 2, 3, 4, 5}
doTwo(arr, 1) | {1, 40, 3, 4, 5}
doThree(arr) | {5, 200, 15, 20, 25}
[[/table]]`,
      solutionType: "text",
      solution: `[[text]]1
40
15[[/text]]`,
    },
    {
      id: "6a",
      title: "question 6a",
      topics: ["Arrays", "Loops", "Modulo"],
      prompt: `An array, **numbers**, of integers is filled with 100 random numbers whose values range from 10 to 199 (inclusive). You do NOT have to write code to generate the random numbers.

Write the code to count how many elements of the array are even and between 30 and 40 (inclusive).`,
      explanation: `Loop through the array and test each value against **three** conditions at once:

  • **numbers[i] % 2 == 0** checks that it is even. An even number has no remainder when divided by 2.
  • **numbers[i] >= 30** and **numbers[i] <= 40** check the range. *Inclusive* means 30 and 40 themselves count, so use >= and <=, not > and <.

All three must be true, so they are joined with **&&**:
[[table]]
Value | Even? | 30 to 40? | Counted?
30 | yes | yes | yes
31 | no | yes | no
36 | yes | yes | yes
40 | yes | yes | yes
42 | yes | no | no
[[/table]]`,
      solution: `int count = 0;

for (int i = 0; i < numbers.length; i++) {
    // even, and between 30 and 40 inclusive
    if (numbers[i] % 2 == 0 && numbers[i] >= 30 && numbers[i] <= 40) {
        count++;
    }
}

System.out.println(count);`,
    },
    {
      id: "6b",
      title: "question 6b",
      topics: ["Equations", "Math Methods"],
      prompt: `The quadratic formula can be used to solve for the two values of x in a quadratic equation of the form ax²+bx+c=0.

Write an expression in Java that will compute one of the values of x based on the formula below:`,
      mathLatex: `x = \\dfrac{-b + \\sqrt{b^2 - 4ac}}{2a}`,
      explanation: `This is a direct translation problem. Keep the **same structure** as the formula instead of simplifying it in your head.
[[table]]
Math | Java
√(b² − 4ac) | Math.sqrt(…)
b² | Math.pow(b, 2)
[[/table]]

Java does not use **^** for exponents, which is why b² becomes **Math.pow(b, 2)**.

The whole top of the fraction goes in one set of parentheses, and the whole bottom goes in another. *Without* the parentheses around the bottom, Java would divide by 2 and then **multiply** by a.

The denominator uses **2.0** instead of **2** so the division is decimal division, not integer division.`,
      solution: `double x1 = ( -b + Math.sqrt( Math.pow(b , 2) - 4 * a * c) ) / (2.0 * a);`,
    },
    {
      id: "6c",
      title: "question 6c",
      topics: ["Arrays", "Binary Search"],
      prompt: `Suppose I am doing a binary search on the following array for the number **1**:
[[code]]int[] nums = {5, 77, 78, 89, 100, 117, 125, 235, 390, 1000};[[/code]]

List the low, mid and high values at each step until 1 is not found. Do NOT write any code. You may use either the subscript (index) values or the actual number stored at the subscript.`,
      explanation: `The array has 10 values, so the indices go from **0 to 9**. Binary search jumps to the middle. If the middle is too big, move left. If the middle is too small, move right.

(0 + 9) / 2 is 4, since integer division drops the decimal. nums[4] is 100, which is bigger than 1, so we move left by setting high to mid - 1. High becomes 3.

(0 + 3) / 2 is 1. nums[1] is 77, still bigger than 1. High becomes 0.

(0 + 0) / 2 is 0. nums[0] is 5, still bigger than 1. High becomes -1.

Now low is 0 and high is -1. The loop condition **low <= high** is false, so the search stops. 1 is smaller than everything in the array, so high keeps dropping until it falls off the left edge.`,
      solutionType: "text",
      solution: `[[table]]
Low | Mid | High | nums[mid]
0 | 4 | 9 | 100
0 | 1 | 3 | 77
0 | 0 | 0 | 5
0 | - | -1 | -
[[/table]]

The search stops because low (0) is greater than high (-1). 1 is not in the array.`,
    },
    {
      id: "7",
      title: "question 7",
      topics: ["Arrays", "File", "Methods", "Scanner", "Sorting"],
      prompt: `Write a complete Java program with comments in main and in each method.

**Data:** the input data for this program is given as two columns of numbers. All data will be entered from a file named **input.txt** and all output will go to the screen. Assume there will not be more than 100 rows of data in the file.

Sample data set:
[[text]]7 23.56
16 88.12
10 75.1[[/text]]

Design a Java class with a main method that does the following:

  1. Reads the data into two arrays of doubles, **arr1** and **arr2**, by invoking the method **readData** with both arrays as parameters. The return value from readData should be stored in an integer variable **num**.
  2. Modifies all of the values in the arr2 array by invoking the method **changeArray**, passing both arrays and num as parameters.
  3. Sorts arr1 and arr2 separately by invoking the method **sortArray** twice: once for arr1 and once for arr2.
  4. Prints the values in both arrays to the screen in two columns as shown below, with a header and the numbers right aligned.
[[text]] arr1    arr2
 7.00  164.92
10.00  751.00
16.00 1409.92[[/text]]

**Method details:**

**readData** reads two double values per line from the input file. The first value of each line is stored in arrOne, and the second value is stored in arrTwo. For example, in the sample data above, 7 would go into arrOne[0] and 23.56 would go into arrTwo[0]. This is repeated until there are no more values in the file.
  • arrOne: an array of doubles for storing the 1st value read in per row
  • arrTwo: an array of doubles for storing the 2nd value read in per row
  • Returns num: an integer representing the number of rows that were read in

**changeArray** has the parameters:
  • alpha: an array of doubles
  • beta: an array of doubles
  • k: an integer representing the number of elements in alpha and beta to be processed

The method multiplies each element of beta by the corresponding value of alpha and stores the result into beta. For example, beta[0], 23.56, is multiplied by alpha[0], 7, and the result, 164.92, is stored in beta[0].

**sortArray** sorts the first k elements of the parameter array into ascending order.
  • arrToOrder: an array of doubles to be sorted
  • k: an integer representing the number of elements in the array arrToOrder`,
      explanation: `Take it one method at a time.

**readData** opens input.txt with a Scanner and reads two doubles per row with a **while** loop on **hasNextDouble()**. The first goes into arrOne, the second into arrTwo, and a counter tracks how many rows were read. That counter is the return value.

**changeArray** loops through the first k elements and multiplies **beta[i]** by **alpha[i]**, storing the result back into beta. Main passes arr1 as alpha and arr2 as beta, since **arr2 is the one that changes**:
[[table]]
arr1 (alpha) | arr2 before (beta) | arr2 after
7 | 23.56 | 164.92
16 | 88.12 | 1409.92
10 | 75.1 | 751.00
[[/table]]

**sortArray** is a plain ascending sort. This solution uses selection sort: find the smallest remaining value and swap it into place. The two arrays are sorted *separately*, **not in parallel**. The 1409.92 that started next to 16 ends up next to 16 again only because both happen to be the largest.

For the output, **printf** handles the right alignment. **%5.2f** prints a decimal with two places, padded to a width of 5. 1409.92 is 7 characters wide, so the second column uses **%7.2f**.`,
      solution: `import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class Fall2018Question7 {

    public static void main(String[] args) throws IOException {
        // room for up to 100 rows of data
        double[] arr1 = new double[100];
        double[] arr2 = new double[100];

        // read both columns and remember how many rows there were
        int num = readData(arr1, arr2);

        // multiply each arr2 value by the matching arr1 value
        changeArray(arr1, arr2, num);

        // sort each array on its own
        sortArray(arr1, num);
        sortArray(arr2, num);

        // print both arrays in right aligned columns
        System.out.printf("%5s %7s\\n", "arr1", "arr2");
        for (int i = 0; i < num; i++) {
            System.out.printf("%5.2f %7.2f\\n", arr1[i], arr2[i]);
        }
    }

    public static int readData(double[] arrOne, double[] arrTwo) throws IOException {
        // read two doubles per row until the file runs out, and return the row count
        Scanner sc = new Scanner(new File("input.txt"));
        int num = 0;

        while (sc.hasNextDouble()) {
            arrOne[num] = sc.nextDouble();
            arrTwo[num] = sc.nextDouble();
            num++;
        }

        sc.close();
        return num;
    }

    public static void changeArray(double[] alpha, double[] beta, int k) {
        // multiply each beta value by the matching alpha value
        for (int i = 0; i < k; i++) {
            beta[i] = beta[i] * alpha[i];
        }
    }

    public static void sortArray(double[] arrToOrder, int k) {
        // selection sort the first k elements into ascending order
        for (int i = 0; i < k - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < k; j++) {
                if (arrToOrder[j] < arrToOrder[minIndex]) {
                    minIndex = j;
                }
            }

            double temp = arrToOrder[i];
            arrToOrder[i] = arrToOrder[minIndex];
            arrToOrder[minIndex] = temp;
        }
    }
}`,
    },
  ],
};
