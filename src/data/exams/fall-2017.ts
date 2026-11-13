import type { Exam } from "../../types";

export const fall2017: Exam = {
  id: "fall2017",
  label: "fall 2017",
  year: "2017",
  questions: [
    {
      id: "1a",
      title: "question 1a",
      topics: ["Debugging", "Loops"],
      prompt: `The following code is supposed to calculate the sum of the numbers **1 to n**. Assume that sum and n have been declared and n has been assigned a value.

There is **one** error in the code. Show how to fix it so that it works properly.
[[code]]for (int i = 1; i <= n; i++) {
    sum = 0;
    sum = sum + i;
}
System.out.println("sum = " + sum);[[/code]]`,
      explanation: `The bug is where **sum = 0** lives. It is *inside* the loop, so sum gets wiped back to zero on every single iteration.

Trace it with n = 3. On the first pass sum becomes 0, then 1. On the second pass sum becomes 0, then 2. On the third pass sum becomes 0, then 3. The program prints 3 instead of 6.

An accumulator has to be set up **once**, before the loop starts. Move the reset above the loop and everything else can stay the same.`,
      solution: `// FIX: reset sum once, before the loop, not on every iteration
sum = 0;

for (int i = 1; i <= n; i++) {
    sum = sum + i;
}
System.out.println("sum = " + sum);`,
    },
    {
      id: "1b",
      title: "question 1b",
      topics: ["Debugging", "Loops"],
      prompt: `The following code is supposed to print each of the numbers from **1 to n**, each on a new line. Assume that n has been assigned a value.

There is **one** error in the code. Show how to fix it so that it works properly.
[[code]]for (int i = 1; i <= n; i++)
    System.out.println(n);[[/code]]`,
      explanation: `The loop itself is fine. It runs with i = 1, 2, 3, all the way up to n.

The problem is *what* gets printed. **n** never changes, so if n is 4 this prints 4 four times. The value that changes on each iteration is the loop variable **i**, so that is what we print.`,
      solution: `for (int i = 1; i <= n; i++)
    System.out.println(i); // FIX: print i, not n`,
    },
    {
      id: "1c",
      title: "question 1c",
      topics: ["Booleans", "Debugging", "Loops", "Scanner"],
      prompt: `The following code is supposed to call the method **doIt** repeatedly as long as the user wants to continue.

There is **one** error in the code. Show how to fix it so that it works properly.
[[code]]char answer;
Scanner kybd = new Scanner(System.in);
do {
    doIt();
    System.out.print("Do you want to continue? ");
    answer = kybd.next().charAt(0);
} while (answer == 'y' && answer == 'Y');[[/code]]`,
      explanation: `Look closely at the loop condition. It asks whether **answer** is lowercase y *and* uppercase Y at the same time.

A single char can only hold one value, so that condition is always false. The loop runs doIt() once and then quits, no matter what the user types.

We want to keep going if the user typed **either** one, so the **&&** becomes **||**.`,
      solution: `char answer;
Scanner kybd = new Scanner(System.in);
do {
    doIt();
    System.out.print("Do you want to continue? ");
    answer = kybd.next().charAt(0);
} while (answer == 'y' || answer == 'Y'); // FIX: || instead of &&`,
    },
    {
      id: "1d",
      title: "question 1d",
      topics: ["Arrays", "Booleans", "Debugging", "Methods"],
      prompt: `The following method is supposed to check whether any of the values in the array are negative.

There is **one** error in the code. Show how to fix it so that it works properly.
[[code]]public static boolean hasNegValue(int[] a, int n)
{
    for (int i = 0; i < n; i++)
        if (a[i] < 0)
            return true;
        else
            return false;
}[[/code]]`,
      explanation: `The **else** belongs to the if, and both branches return. That means the method never gets past index 0.

If **a[0]** is negative it returns true, which is right. But if **a[0]** is not negative it immediately returns false, without ever looking at a[1], a[2], and so on. An array like {4, -2, 7} would wrongly report that it has no negatives.

We can only say "no negatives" after we have checked *every* value. So delete the else and return false after the loop ends.`,
      solution: `public static boolean hasNegValue(int[] a, int n)
{
    for (int i = 0; i < n; i++)
        if (a[i] < 0)
            return true;

    // FIX: only return false after the whole array has been checked
    return false;
}`,
    },
    {
      id: "2a",
      title: "question 2a",
      topics: ["Conditional Operator", "Methods", "Tracing"],
      prompt: `Given the following method:
[[code]]int methodA(int x, int y) {
    if (x < y)
        return -1;
    else if (x == y)
        return 0;
    else
        return 1;
}[[/code]]

What would be returned for the following calls?

  i. methodA(3, 3)
  ii. methodA(5, 4)
  iii. methodA(20, 30)
  iv. In general, what does the method return?
  v. Are there any other cases to take into consideration that are not covered by the above three calls? Answer either "No", or provide such a case.
  vi. Rewrite the method eliminating the if statements; instead use conditional operators only.`,
      explanation: `Plug each call into the method and see which branch it lands in.

**methodA(3, 3)**: 3 is not less than 3, but 3 equals 3, so it returns **0**.

**methodA(5, 4)**: 5 is not less than 4 and not equal to 4, so it falls to the else and returns **1**.

**methodA(20, 30)**: 20 is less than 30, so it returns **-1**.

For the general case, the method compares x to y: negative one if x is smaller, zero if they match, one if x is bigger. This is the same idea as **compareTo()** for Strings.

For v, the answer is no. Any two ints are either less than, equal to, or greater than each other, and the three calls already hit all three branches.

For vi, the conditional operator **condition ? valueIfTrue : valueIfFalse** works like a tiny if/else that produces a value. We need two of them: the first handles x < y, and the second, nested inside the false side, handles equal versus greater.`,
      solutionType: "text",
      solution: `[[table]]
Call | Returns
methodA(3, 3) | 0
methodA(5, 4) | 1
methodA(20, 30) | -1
[[/table]]

**iv.** It compares x to y. It returns -1 if x is less than y, 0 if x equals y, and 1 if x is greater than y.

**v.** No. Every pair of ints is either less than, equal to, or greater than, and all three are covered.

**vi.**
[[code]]int methodA(int x, int y) {
    return x < y ? -1 : (x == y ? 0 : 1);
}[[/code]]`,
    },
    {
      id: "2b",
      title: "question 2b",
      topics: ["Methods", "Strings", "Tracing"],
      prompt: `Given the following method:
[[code]]String restOf(String s) {
    return s.substring(1);
}[[/code]]

What is returned by each of the following expressions?

  i. "J" + restOf("Hello")
  ii. restOf(restOf(restOf("cowboy")))`,
      explanation: `**substring(1)** returns everything from index 1 to the end. In other words, restOf chops off the first character.

For i, restOf("Hello") is "ello". Glue "J" onto the front and we get **"Jello"**.

For ii, work from the inside out, the same way you would with math functions. Each call removes one more letter from the front:
[[table]]
Call | Result
restOf("cowboy") | "owboy"
restOf("owboy") | "wboy"
restOf("wboy") | "boy"
[[/table]]`,
      solutionType: "text",
      solution: `**i.** "Jello"

**ii.** "boy"`,
    },
    {
      id: "3a",
      title: "question 3a",
      topics: ["Characters", "Loops", "Split", "Strings"],
      prompt: `A **String** variable sentence consists of words separated by single spaces.

Write the Java code needed to print the number of words that start with an upper case letter.

So for "The deed is done", your code would print **1**, but for "The name is Bond, JAMES Bond", your code would print **4**.`,
      explanation: `Since the words are separated by single spaces, **split(" ")** hands us an array of words.

For each word, grab its first character with **charAt(0)**. A char is really a number (its ASCII code), and the capital letters 'A' through 'Z' sit right next to each other. So a char is uppercase exactly when it is between 'A' and 'Z'.

Count the words that pass that check and print the count. In "The name is Bond, JAMES Bond", the words The, Bond, JAMES, and Bond all pass, giving 4. The comma stuck to "Bond," does not matter since we only look at the first character.`,
      solution: `// split the sentence into an array of words
String[] words = sentence.split(" ");
int count = 0;

for (int i = 0; i < words.length; i++) {
    // look at the first letter of the current word
    char first = words[i].charAt(0);

    // uppercase letters are the chars from 'A' to 'Z'
    if (first >= 'A' && first <= 'Z') {
        count++;
    }
}

System.out.println(count);`,
    },
    {
      id: "3b",
      title: "question 3b",
      topics: ["Strings"],
      prompt: `An **int** variable n contains a positive integer and a **String** variable s contains a String.

Write the Java code needed to print "YES" if the first n characters of s appear more than once in s, and print "NO" otherwise.`,
      explanation: `First, pull out the first n characters with **s.substring(0, n)**. Call that the prefix.

We already know the prefix shows up once, at index 0. The question is whether it shows up *again*.

**indexOf()** has a version that takes a starting position: **s.indexOf(prefix, 1)** starts searching at index 1, which skips the copy we already know about. If it finds another copy it returns that index. If not, it returns **-1**.

For example, if s is "abcab" and n is 2, the prefix is "ab". Searching from index 1 finds "ab" again at index 3, so we print YES.

This assumes n is no bigger than the length of s, otherwise substring would crash.`,
      solution: `// the first n characters of s
String prefix = s.substring(0, n);

// the prefix is already at index 0, so start searching at index 1
if (s.indexOf(prefix, 1) != -1) {
    System.out.println("YES");
} else {
    System.out.println("NO");
}`,
    },
    {
      id: "3c",
      title: "question 3c",
      topics: ["Methods", "Strings"],
      prompt: `Show how to invoke the method **grunf** so that it will return the String **HOPE**.
[[code]]public static String grunf(String s1, String s2, String s3) {
    String s = s1.substring(1, 2);
    if (s1.length() > s2.length() && s2.compareTo(s3) < 0
                                  && s3.indexOf(s) > 0)
        return s1.substring(0, 1) + s2.substring(1);
    else
        return s1.substring(0, 1) + s2.substring(0, 1) +
                                    s1.substring(0, 1);
}[[/code]]`,
      explanation: `Work backwards from the return statements.

The else branch returns exactly **3** characters (one letter from s1, one from s2, then the same letter from s1 again). "HOPE" has 4 letters, so the else branch can never produce it. We need the if branch.

The if branch returns the first letter of s1 followed by everything in s2 after its first letter. So s1 must start with **H**, and s2 must be any letter followed by **OPE**. Let's pick **s2 = "ROPE"**.

Now satisfy the three conditions, one at a time:

  1. **s1.length() > s2.length()**: s2 has 4 letters, so s1 needs at least 5. **s1 = "HELLO"** works.
  2. **s2.compareTo(s3) < 0**: s2 must come before s3 alphabetically. Anything starting with a letter after R works.
  3. **s3.indexOf(s) > 0**: s is the second letter of s1, which is "E". s3 has to contain "E", but not at index 0.

**s3 = "ZEBRA"** handles both: Z comes after R, and "E" is at index 1.`,
      solutionType: "text",
      solution: `[[code]]grunf("HELLO", "ROPE", "ZEBRA")[[/code]]

[[table]]
Check | Value | Result
s | "HELLO".substring(1, 2) | "E"
s1.length() > s2.length() | 5 > 4 | true
s2.compareTo(s3) < 0 | "ROPE" comes before "ZEBRA" | true
s3.indexOf(s) > 0 | "ZEBRA".indexOf("E") is 1 | true
[[/table]]

All three are true, so it returns "H" + "OPE", which is **HOPE**.

Many other answers work, as long as they pass all three checks.`,
    },
    {
      id: "4a",
      title: "question 4a",
      topics: ["Booleans"],
      prompt: `Suppose an exam grade called **grade** (integer) is considered **invalid** if it is either negative or above 100.

Write code in Java that will set the variable **invalid** to true if the value of **grade** is invalid and false otherwise.`,
      explanation: `A grade is invalid if it is below 0 **or** above 100. Either one is enough, so we use **||**.

A comparison already produces a true or false value, so we can store it straight into the boolean. There is no need for an if statement. The longer version below does the same thing and is also correct.
[[code]]if (grade < 0 || grade > 100)
    invalid = true;
else
    invalid = false;[[/code]]`,
      solution: `invalid = grade < 0 || grade > 100;`,
    },
    {
      id: "4b",
      title: "question 4b",
      topics: ["Loops", "Random Numbers"],
      prompt: `Write a section of code in Java that will do the following:

Generate **10** random numbers (integers) each between **1 and 10**. Print the number of random numbers that are greater than 5.`,
      explanation: `Recall the formula for a random integer from min to max, inclusive:
[[code]]int randInt = (int) (Math.random() * (max - min + 1) + min);[[/code]]

Here min is 1 and max is 10. Loop 10 times, generate a number each time, and bump a counter whenever the number is bigger than 5. Print the counter after the loop.`,
      solution: `int count = 0;

for (int i = 0; i < 10; i++) {
    // random int from 1 to 10
    int num = (int) (Math.random() * (10 - 1 + 1) + 1);

    if (num > 5) {
        count++;
    }
}

System.out.println(count + " of the numbers were greater than 5");`,
    },
    {
      id: "4c",
      title: "question 4c",
      topics: ["Arrays", "Binary Search", "Linear Search"],
      prompt: `Consider an array of 10 integers that contains the following values in increasing sequence:
[[code]]int[] nums = {3, 15, 25, 43, 50, 76, 88, 102, 110, 120};[[/code]]

Assume you wish to find the location of the element with value **43**.

  i. Show the sequence of numbers that you would encounter in this search if you used a **sequential** search.
  ii. Show the sequence of numbers that you would encounter in this search if you used a **binary** search.`,
      explanation: `A sequential (linear) search starts at index 0 and checks every value in order until it finds the target. 43 is at index 3, so we see 3, 15, 25, and then 43.

A binary search jumps to the middle instead. The array has 10 values, so the indices go from **0 to 9**.

(0 + 9) / 2 is 4, since integer division drops the decimal. nums[4] is **50**, which is too big, so we move left by setting high to mid - 1. High becomes 3.

(0 + 3) / 2 is 1. nums[1] is **15**, which is too small, so we move right by setting low to mid + 1. Low becomes 2.

(2 + 3) / 2 is 2. nums[2] is **25**, still too small. Low becomes 3.

(3 + 3) / 2 is 3. nums[3] is **43**. Found it.`,
      solutionType: "text",
      solution: `**i. Sequential search:** 3, 15, 25, 43

**ii. Binary search:** 50, 15, 25, 43

[[table]]
Low | Mid | High | nums[mid]
0 | 4 | 9 | 50
0 | 1 | 3 | 15
2 | 2 | 3 | 25
3 | 3 | 3 | 43 (found)
[[/table]]`,
    },
    {
      id: "4d",
      title: "question 4d",
      topics: ["Equations", "Math Methods"],
      prompt: `Suppose you wish to compute the value of **a² + b³** for some integers a and b.

Write a statement in Java that would place the value of this expression in an integer variable **x**.`,
      explanation: `Java has no exponent operator (**^** means something else entirely), so the powers become **Math.pow(a, 2)** and **Math.pow(b, 3)**.

The catch is that **Math.pow()** always returns a **double**, and you cannot store a double in an int without a cast. Wrap the whole sum in parentheses and cast it with **(int)**.

Since the powers are small, plain multiplication also works and needs no cast:
[[code]]int x = a * a + b * b * b;[[/code]]`,
      solution: `int x = (int) (Math.pow(a, 2) + Math.pow(b, 3));`,
    },
    {
      id: "5",
      title: "question 5",
      topics: ["File", "PrintWriter", "Scanner"],
      prompt: `Write a complete Java program to do the following:

  a. Read from a file **input5.txt** a list of pairs of integers. For each pair, if the sum of the two numbers is positive, calculate as a decimal number the first divided by the second. If the sum is negative, calculate as a decimal number the second divided by the first. You may assume neither value is zero.

  b. Write the two numbers and the calculated quotient to a file **output5.txt**, one pair per line. Do this until there is no more data to read.

  c. At the end, print 2 things with an appropriate message: the number of pairs processed, and the value of the quotient closest to zero. Remember that the quotient may be positive or negative.`,
      explanation: `Read two ints at a time with a **while** loop that keeps going as long as **hasNextInt()** is true.

Both numbers are ints, so dividing them directly would be integer division and chop off the decimal. Cast one of them to **double** first, for example **(double) first / second**.

The prompt never says what to do when the sum is exactly zero (for example 4 and -4). This solution sends that case to the else branch along with the negative sums.

"Closest to zero" means the smallest **absolute value**, since -0.25 is closer to zero than 0.5. **Math.abs()** strips the sign. Compare absolute values, but remember the real quotient so the sign is printed correctly. The very first quotient becomes the starting "closest" value, so the comparison only kicks in from the second pair on.`,
      solution: `import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class Fall2017Question5 {
    public static void main(String[] args) throws IOException {

        // input and output files
        Scanner sc = new Scanner(new File("input5.txt"));
        PrintWriter writer = new PrintWriter("output5.txt");

        int numPairs = 0;
        double closestToZero = 0;

        // keep reading pairs until the file runs out
        while (sc.hasNextInt()) {
            int first = sc.nextInt();
            int second = sc.nextInt();

            // cast to double so we get decimal division
            double quotient;
            if (first + second > 0) {
                quotient = (double) first / second;
            } else {
                quotient = (double) second / first;
            }

            writer.printf("%d %d %.2f\\n", first, second, quotient);

            // the first quotient is automatically the closest so far
            if (numPairs == 0 || Math.abs(quotient) < Math.abs(closestToZero)) {
                closestToZero = quotient;
            }

            numPairs++;
        }

        System.out.println("Number of pairs processed: " + numPairs);
        System.out.printf("Quotient closest to zero: %.2f\\n", closestToZero);

        sc.close();
        writer.close();
    }
}`,
    },
    {
      id: "6",
      title: "question 6",
      topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
      prompt: `Perform the following conversions:

a. 111001 (base 2) to base 10

b. C4 (base 16) to base 10

c. 1101001 (base 2) to base 16

d. 34 (base 10) to base 2

e. E8 (base 16) to base 2

f. Perform the following addition of two binary (base 2) numbers. Your answer should be a number in binary.
[[text]]101 + 111 = ?[[/text]]`,
      explanation: `Every place in a number is worth a power of its base. In base 10, 512 is 5×10² + 1×10¹ + 2×10⁰. Base 2 and base 16 work the same way, just with powers of 2 and 16.

For **a**, label the places 2⁵ down to 2⁰ and add up the places that hold a 1.

For **b**, C is 12 in hexadecimal. Multiply each digit by its power of 16.

For **c**, one hex digit is exactly four binary digits. Split the binary number into groups of four *starting from the right*, pad the leftmost group with zeros, and convert each group on its own.

For **d**, write out the powers of two (32, 16, 8, 4, 2, 1) and pick the ones that add up to 34. Write a 1 for each power you use and a 0 for each one you skip.

For **e**, go the other way: turn each hex digit into its four-bit group and line them up.

For **f**, add column by column from the right, just like base 10 addition, except that 1 + 1 is 10 in binary: write the 0 and carry the 1.`,
      solutionType: "text",
      solution: `**a. 57**
[[table]]
Place | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 32 | 16 | 8 | 4 | 2 | 1
Digit | 1 | 1 | 1 | 0 | 0 | 1
[[/table]]
32 + 16 + 8 + 1 = **57**

**b. 196**

C×16¹ + 4×16⁰ = 12×16 + 4 = 192 + 4 = **196**

**c. 69**
[[table]]
Binary group | 0110 | 1001
Hex digit | 6 | 9
[[/table]]
1101001 is padded on the left to 0110 1001, which is **69**.

**d. 100010**
[[table]]
Power of 2 | 32 | 16 | 8 | 4 | 2 | 1
Used? | 1 | 0 | 0 | 0 | 1 | 0
[[/table]]
32 + 2 = 34, so the answer is **100010**.

**e. 11101000**
[[table]]
Hex digit | E | 8
Binary group | 1110 | 1000
[[/table]]
E is 14 = 1110, and 8 = 1000. Together: **11101000**.

**f. 1100**
[[text]]   111    carries
    101
  + 111
  -----
   1100[[/text]]
Check in base 10: 5 + 7 = 12, and 12 is 1100 in binary.`,
    },
    {
      id: "7",
      title: "question 7",
      topics: ["Arrays", "Methods", "Scanner", "Sorting"],
      prompt: `For this question, assume all input comes from the keyboard, and all output goes to the screen. The array should have room for **100** integers.

Write a complete Java program, __including at least one comment in the main program and one in each method__, to do the following.

**Main:**

  (a) First, main will read an integer, which it will call **k**. Then main will call the method **readdata()** (method 1 below) to read a set of data containing k values into an integer array which main will call **x**.

  (b) main will call the method **count5s()** (method 2 below), sending the x array and k.

  (c) main will call the method **sortarray()** (method 3 below) to sort the first k elements of the x array into *descending* order. The new values in the x array will be printed in main.

**Methods:**

  1. **readdata()** receives two parameters, an integer **n** and an integer array **arr**. The method will read a set of n data items into the arr array. The method will print the set of data values as they are being read in.

  2. **count5s()** receives two parameters, an integer **n** and an integer array **v**. The method will count how many of the first n elements of the v array are greater than 5, how many are less than 5, and how many are equal to 5. The method will print these values, with messages for each.
      For example, if the array holds the values 5 66 -4 5 1 -3, with n = 6: there is 1 value greater than 5, there are 3 values less than 5, and there are 2 values equal to 5.

  3. **sortarray()** receives two parameters, an integer array **w** and an integer **n** giving the size of the array. The method will sort the first n elements of the w array into *descending* order.
      For example, if the method starts with 5 66 -4 5 1 -3 in the w array, with n = 6, the array will hold 66 5 5 1 -3 -4 afterwards.`,
      explanation: `Each method does one job, so tackle them one at a time.

Both main and **readdata()** need to read from the keyboard. Making two separate Scanners on System.in can cause input to go missing, so this solution makes one Scanner as a **static** variable at the top of the class. Every method in the class can use it.

**readdata()** loops n times. Each time it reads an int, stores it in the array, and prints it right away.

**count5s()** keeps three counters. Every value is either greater than, less than, or equal to 5, so an if / else if / else chain bumps exactly one counter per value.

**sortarray()** is a bubble sort. For descending order, we swap whenever the left value is *smaller* than the right value. That pushes the small values toward the end. Notice the method only sorts the first n elements, not all 100 slots.

Back in main, print the first k elements of x after the sort.`,
      solution: `import java.util.Scanner;

public class Fall2017Question7 {

    // one shared Scanner for the whole program, so input is never split between two Scanners
    static Scanner kybd = new Scanner(System.in);

    public static void main(String[] args) {

        // the array has room for 100 integers
        int[] x = new int[100];

        // read the header value: how many numbers follow
        System.out.print("How many values? ");
        int k = kybd.nextInt();

        readdata(k, x);
        count5s(k, x);
        sortarray(x, k);

        // print the sorted values
        System.out.print("Sorted in descending order: ");
        for (int i = 0; i < k; i++) {
            System.out.print(x[i] + " ");
        }
        System.out.println();
    }

    public static void readdata(int n, int[] arr) {
        // read n values into arr, printing each one as it is read
        System.out.print("Values read in: ");
        for (int i = 0; i < n; i++) {
            arr[i] = kybd.nextInt();
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void count5s(int n, int[] v) {
        // count how many of the first n values are above, below, and equal to 5
        int greater = 0;
        int less = 0;
        int equal = 0;

        for (int i = 0; i < n; i++) {
            if (v[i] > 5) {
                greater++;
            } else if (v[i] < 5) {
                less++;
            } else {
                equal++;
            }
        }

        System.out.println("Values greater than 5: " + greater);
        System.out.println("Values less than 5: " + less);
        System.out.println("Values equal to 5: " + equal);
    }

    public static void sortarray(int[] w, int n) {
        // bubble sort the first n elements into descending order
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                // swap when the left value is smaller, so big values move to the front
                if (w[j] < w[j + 1]) {
                    int temp = w[j];
                    w[j] = w[j + 1];
                    w[j + 1] = temp;
                }
            }
        }
    }
}`,
    },
  ],
};
