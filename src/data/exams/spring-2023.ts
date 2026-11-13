import type { Exam } from "../../types";

export const spring2023: Exam = {
  id: "spring2023",
  label: "spring 2023",
  year: "2023",
  questions: [
    {
      id: "1",
      title: "question 1",
      topics: ["Arrays", "Characters", "Methods"],
      prompt: `Write the Java code for a method named **maxChar** that receives two equally-sized **char** arrays as arguments. The method returns a newly created array of type **char**.

Each element of the new array that is returned is the larger (based on the ASCII code) of the corresponding elements of the two arrays received.

For example, if ['x', '3', '?'] and ['7', '4', 'e'] were passed to maxChar, it would return the array ['x', '4', 'e'].

Or, if ['6', 'f', 'n'] and ['S', 'u', ','] were passed to maxChar, then ['S', 'u', 'n'] would be returned.`,
      explanation: `This is mostly a "follow the prompt exactly" problem. We build a **third array** that lines up with the two we were given.

Create a new **char[]** with the same length as one of the input arrays. Then loop through every index.

Chars are compared by their **ASCII codes**, so **>** works on them directly. At each index, keep whichever of **A[i]** and **B[i]** is larger:
[[table]]
i | A[i] (ASCII) | B[i] (ASCII) | C[i]
0 | 'x' (120) | '7' (55) | 'x'
1 | '3' (51) | '4' (52) | '4'
2 | '?' (63) | 'e' (101) | 'e'
[[/table]]

The solution uses the conditional operator, **condition ? valueIfTrue : valueIfFalse**, to do that in one line. An if/else does the same job:
[[code]]if (A[i] > B[i])
    C[i] = A[i];
else
    C[i] = B[i];[[/code]]

At the end, return the new array. The original arrays do not need to be changed.`,
      solution: `public static char[] maxChar(char[] A, char[] B) {

    // storing the size of one of the arrays in a variable
    int n = A.length;

    // creating a new array same size as input arrays
    char[] C = new char[n];

    for (int i = 0; i < n; i++) {
        // if A[i] is bigger put it in, else B[i]
        C[i] = A[i] > B[i] ? A[i] : B[i];
    }

    // return the new array
    return C;
}`,
    },
    {
      id: "2",
      title: "question 2",
      topics: ["Strings", "Tracing"],
      prompt: `Write a list of all the values that **s** is assigned in the course of the following computation:
[[code]]String s = "Java Programming";
int j = s.indexOf("av");
int k = s.indexOf('m', j+1);
s = s.substring(j, k);
s = s + s.charAt(2) + s.charAt(s.length()-2);[[/code]]`,
      explanation: `Write the indices under the characters first. It makes every step mechanical.
[[table]]
Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
Char | J | a | v | a | ␣ | P | r | o | g | r | a | m | m | i | n | g
[[/table]]

**indexOf("av")** finds where "av" starts, which is index **1**. So j = 1.

**indexOf('m', 2)** searches for 'm' starting at index 2. The first one is at index **11**. So k = 11.

**substring(1, 11)** takes indices 1 through 10, since the end index is not included. That is **"ava Progra"**, which is 10 characters long.

For the last line, look up the characters in the *new* s:
[[table]]
Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
Char | a | v | a | ␣ | P | r | o | g | r | a
[[/table]]
**charAt(2)** is 'a'. **s.length() - 2** is 8, and **charAt(8)** is 'r'.

Java evaluates the + signs from left to right. s is a String, so "ava Progra" + 'a' is the String "ava Prograa", and adding 'r' gives **"ava Prograar"**. Because a String came first, the chars are glued on as letters instead of being added as numbers.`,
      solutionType: "text",
      solution: `s takes three values, in this order:

  1. "Java Programming"
  2. "ava Progra"
  3. "ava Prograar"`,
    },
    {
      id: "3",
      title: "question 3",
      topics: ["Arrays", "Binary Search"],
      prompt: `Given the array of numbers below, show all the steps as you perform a binary search, looking for the key of **11**:
[[code]]int[] nums = {9, 15, 23, 67, 78, 85, 111, 117, 135, 225, 829, 1000};[[/code]]

Enter into the table the low, mid and high values as the binary search progresses. Do NOT write any code. You may use either the subscript (index) values or the actual number stored at the subscript. Not all rows of the table may be needed.`,
      explanation: `The array has 12 values, so the indices go from **0 to 11**. Binary search always checks the **middle** of the current range.

Start with **low = 0** and **high = 11**. (0 + 11) / 2 is 5. nums[5] is 85, bigger than 11, so move left: **high = mid - 1 = 4**.

(0 + 4) / 2 is 2. nums[2] is 23, still bigger than 11: **high = 1**.

(0 + 1) / 2 is 0, since integer division drops the decimal. nums[0] is 9, *smaller* than 11, so move right: **low = mid + 1 = 1**.

(1 + 1) / 2 is 1. nums[1] is 15, bigger than 11: **high = 0**.

Now **low = 1** and **high = 0**. The condition **low <= high** is false, so the search stops. 11 is *not* in the array.`,
      solutionType: "text",
      solution: `[[table]]
Low | Mid | High | nums[mid]
0 | 5 | 11 | 85
0 | 2 | 4 | 23
0 | 0 | 1 | 9
1 | 1 | 1 | 15
1 | - | 0 | -
[[/table]]

The search stops because low (1) is greater than high (0). 11 is not in the array.`,
    },
    {
      id: "4a",
      title: "question 4a",
      topics: ["Conditionals", "Methods"],
      prompt: `Question 4 offered a choice between two methods. This is the first option.

The table below represents the number of credits required to be at a specific level in college. For example, if you have 32 credits, you're a Lower Sophomore.
[[table]]
Number of credits | Level
0 - 14.9 | Lower Freshman
15 - 29.9 | Upper Freshman
30 - 44.9 | Lower Sophomore
45 - 59.9 | Upper Sophomore
60 - 74.9 | Lower Junior
75 - 89.9 | Upper Junior
90 - 104.9 | Lower Senior
105 or more | Upper Senior
[[/table]]

Write a method **myLevel** in Java that accepts a **double** representing the number of credits and returns a **String** containing the level.`,
      explanation: `This is an **if / else if** ladder. Each level starts where the last one ends, so only check the *upper* edge of each range, going from lowest to highest.

If credits is less than 15, it is Lower Freshman. Otherwise, if it is less than 30, it must be from 15 up to 30, so it is Upper Freshman. And so on. Once a branch matches, the method **returns** and the rest are skipped.

Compare against the start of the **next** level (**< 15**), not the end of the current one (**<= 14.9**). Credits are a double, so a value like 14.95 is possible:
[[table]]
credits | <= 14.9 check | < 15 check | Correct level
14.9 | Lower Freshman | Lower Freshman | Lower Freshman
14.95 | Upper Freshman (wrong) | Lower Freshman | Lower Freshman
15 | Upper Freshman | Upper Freshman | Upper Freshman
[[/table]]

The last level has no upper limit, so it goes in the final **else**.`,
      solution: `public static String myLevel(double credits) {
    // check each range from lowest to highest; the first match wins
    if (credits < 15) {
        return "Lower Freshman";
    } else if (credits < 30) {
        return "Upper Freshman";
    } else if (credits < 45) {
        return "Lower Sophomore";
    } else if (credits < 60) {
        return "Upper Sophomore";
    } else if (credits < 75) {
        return "Lower Junior";
    } else if (credits < 90) {
        return "Upper Junior";
    } else if (credits < 105) {
        return "Lower Senior";
    } else {
        return "Upper Senior";
    }
}`,
    },
    {
      id: "4b",
      title: "question 4b",
      topics: ["Booleans", "Conditionals", "Methods"],
      prompt: `Question 4 offered a choice between two methods. This is the second option.

The table below shows the maximum number of days in a month.
[[table]]
Month | Leap year | Maximum number of days
1 | true or false | 31
2 | true | 29
2 | false | 28
3 | true or false | 31
4 | true or false | 30
5 | true or false | 31
6 | true or false | 30
7 | true or false | 31
8 | true or false | 31
9 | true or false | 30
10 | true or false | 31
11 | true or false | 30
12 | true or false | 31
[[/table]]

Write, in Java, a method **numberOfDays** which accepts an integer (month) and a boolean (isLeapYear) and returns an integer representing the maximum number of days in the month.

For example, if 3 and true are passed to numberOfDays, it will return 31. If 3 and false are passed, the method will return 31. If 2 and true are passed, it will return 29. If 2 and false are passed, it will return 28.`,
      explanation: `Instead of writing twelve branches, look for **groups** in the table:
[[table]]
Months | Days | Condition in the code
2 (February) | 29 in a leap year, 28 otherwise | month == 2
4, 6, 9, 11 | 30 | month == 4 or 6 or 9 or 11
1, 3, 5, 7, 8, 10, 12 | 31 | the final else
[[/table]]

**February** is the only month where the leap year matters.

**April, June, September, and November** are checked all at once, joined with **||**.

**Every other month** has 31 days, so it falls to the final else.

The February line uses the conditional operator. The if/else version works just as well:
[[code]]if (isLeapYear)
    return 29;
else
    return 28;[[/code]]`,
      solution: `public static int numberOfDays(int month, boolean isLeapYear) {
    if (month == 2) {
        // February is the only month that depends on the leap year
        return isLeapYear ? 29 : 28;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        // April, June, September, and November
        return 30;
    } else {
        // every other month
        return 31;
    }
}`,
    },
    {
      id: "5",
      title: "question 5",
      topics: ["Equations", "Math Methods"],
      prompt: `Convert the following mathematical expression into Java code (not a complete program).`,
      mathLatex: `w = \\sqrt{\\dfrac{\\sqrt{\\dfrac{x+y}{z}} - 1}{(1+x)^2}}`,
      explanation: `This is another direct equation translation. Work **from the inside out** so the parentheses stay under control.
[[table]]
Step | Math | Java
1 | (x + y) / z | (x + y) / z
2 | √ of step 1 | Math.sqrt((x + y) / z)
3 | step 2 minus 1 | (Math.sqrt((x + y) / z) - 1)
4 | (1 + x)² | Math.pow(1 + x, 2)
5 | step 3 / step 4 | (…) / Math.pow(1 + x, 2)
6 | √ of step 5 | Math.sqrt(…)
[[/table]]

Step 3 needs its **own parentheses** before dividing. Otherwise Java would only divide the 1.

The *entire* fraction sits under the outer square root, so everything gets wrapped in one last **Math.sqrt()**.`,
      solution: `double result = Math.sqrt((Math.sqrt((x + y) / z) - 1) / Math.pow(1 + x, 2));`,
    },
    {
      id: "6",
      title: "question 6",
      topics: ["Binary Numbers", "Hexadecimal", "Number Systems"],
      prompt: `Perform the following conversions:

a. 10101001 (base 2) to base 10

b. 1E (base 16) to base 10

c. 10001101 (base 2) to base 16

d. 77 (base 10) to base 16

e. 156 (base 2) to base 10

f. Perform the following addition of two binary (base 2) numbers. Your answer should be a number in binary.
[[text]]101 + 001 = ?[[/text]]`,
      explanation: `Every place in a number is worth a power of its base. In base 10, 512 is 5×10² + 1×10¹ + 2×10⁰. Base 2 and base 16 work the same way, just with powers of 2 and 16.

For **a**, label the places 2⁷ down to 2⁰ and add up the places that hold a 1.

For **b**, E is 14 in hexadecimal. Multiply each digit by its power of 16.

For **c**, one hex digit is exactly four binary digits. Split the number into groups of four starting from the right and convert each group.

For **d**, see how many 16s fit into 77, then what is left over. This is the same divide and mod idea as converting inches to feet. Any leftover from 10 to 15 becomes a letter.

**e is a trick question.** Binary only uses the digits 0 and 1, so "156" is not a valid base 2 number. Do not try to convert it. Say that it is invalid.

For **f**, add column by column from the right, just like base 10 addition.`,
      solutionType: "text",
      solution: `**a. 169**
[[table]]
Place | 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
Digit | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 1
[[/table]]
128 + 32 + 8 + 1 = **169**

**b. 30**

1×16¹ + E×16⁰ = 16 + 14 = **30**

**c. 8D**
[[table]]
Binary group | 1000 | 1101
Hex digit | 8 | D
[[/table]]
1000 is 8, and 1101 is 13, which is D.

**d. 4D**

77 / 16 = 4, with 77 % 16 = 13 left over. 13 is D, so the answer is **4D**.

Check: 4×16 + 13 = 64 + 13 = 77.

**e. Not a valid binary number.** Base 2 only has the digits 0 and 1, and 156 contains a 5 and a 6.

**f. 110**
[[text]]    101
  + 001
  -----
    110[[/text]]
Check in base 10: 5 + 1 = 6, and 6 is 110 in binary.`,
    },
    {
      id: "7",
      title: "question 7",
      topics: ["Arrays", "Methods", "Pass by Value", "Tracing"],
      prompt: `What does the following program print when executed?
[[code]]public class Q7 {
    public static void main(String[] args) {
        int[] v = {1,1,2,3,5,8};
        int[] w = new int[v.length];
        int n = 3, k=5;
        dump("HERE: v", v);
        System.out.println("n="+n+" k="+k);
        w = mangle(v, n);
        dump("THERE w", w);
        dump("EVERYWHERE: v", v);
        System.out.println("n="+n+" k="+k);
    }

    private static void dump(String label, int[] a) {
        System.out.print(label+": ");
        for (int i=0; i<a.length; i++) {
            System.out.print(a[i]+" ");
        }
        System.out.println();
    }

    private static int[] mangle(int[] a, int k) {
        int[] b = new int[a.length];
        k++;
        for (int i=0; i<b.length-1; i++) {
            b[i] = a[i+1];
        }
        b[b.length-1] = a[b.length-2] * 2;
        return b;
    }
}[[/code]]`,
      explanation: `Start with **dump**. It prints the label, then a colon and a space, then every element followed by a space. So the first line is "HERE: v: " followed by the numbers. The extra ": " after "v" is easy to miss.

Now the tricky part, **mangle**. The parameter is *named* k, but it receives a copy of **n**, which is 3. The **k++** bumps that copy to 4 and then nothing ever uses it. Neither n nor the k in main changes, so both n=3 k=5 lines are identical.

mangle builds a brand new array b. The loop shifts everything one spot to the left: b[i] gets a[i+1], for i from 0 to 4.
[[table]]
i | 0 | 1 | 2 | 3 | 4 | 5
a[i] | 1 | 1 | 2 | 3 | 5 | 8
b[i] | 1 | 2 | 3 | 5 | 8 | 10
[[/table]]
The last slot is filled separately: b[5] gets a[4] times 2, and a[4] is 5, so b[5] is 10. The final 8 from a is dropped.

mangle only reads from a, so v is unchanged when it is dumped the second time.`,
      solutionType: "text",
      solution: `[[text]]HERE: v: 1 1 2 3 5 8
n=3 k=5
THERE w: 1 2 3 5 8 10
EVERYWHERE: v: 1 1 2 3 5 8
n=3 k=5[[/text]]

Each dump line also ends with a space after the last number, since every element is printed with a space after it.`,
    },
    {
      id: "8",
      title: "question 8",
      topics: ["Arrays", "File", "Methods", "PrintWriter", "Sorting"],
      prompt: `Write a complete Java program. You must comment the main program and all methods, explaining what action(s) each performs.

Design a Java class with a main method that reads the number of baskets scored by each player in a basketball game. The number of baskets consists of the number of two-point baskets and three-point baskets each player scored. At most there will be 25 players read in, though there could be less.

Sample data:
[[text]]8 3
6 5
4 2
9 1
12 0[[/text]]

A sample record consists of two numbers, the first representing the number of two-point baskets and the second representing the number of three-point baskets. A record 8 3 represents 8 2-point baskets and 3 3-point baskets, for a total of 8 × 2 + 3 × 3, or 25 points.

main will invoke methods, that you write, to perform the following tasks:

(a) main will pass a filename (for input) and two integer arrays to a method **readData**. It will read from the file the number of 2-point and 3-point baskets per player and store them in two separate arrays. The method will return the total number of players read in. For example, with the sample data above, after readData is finished the arrays will contain:
[[table]]
Player | 1 | 2 | 3 | 4 | 5
2-point baskets | 8 | 6 | 4 | 9 | 12
3-point baskets | 3 | 5 | 2 | 1 | 0
[[/table]]

(b) main will invoke a method **totalPoints** that accepts an object of a class that will enable writing to a file (such as PrintWriter), two integer arrays (number of 2-point and 3-point baskets) and the number of players read in. It will return an integer array that contains, for each player, the total number of points that player scored. Using the sample data above, the total points array will contain:
[[table]]
Player | 1 | 2 | 3 | 4 | 5
total points | 25 | 27 | 14 | 21 | 24
[[/table]]

(c) main will invoke a method **averages** that accepts an object of a class for output, 3 integer arrays (2-point baskets, 3-point baskets, total points) and the number of records read in. It will compute and print to the output file a header and the overall average number of __points__ for 2-point baskets, the overall average number of __points__ for 3-point baskets and the overall average number of total __points__, right adjusted. The output from the sample data would be:
[[text]] avg2pt avg3pt avgpts
  15.60   6.60  22.20[[/text]]

(d) main will then invoke a method **sort** that is passed the array of total points and prints the number of points of the three lowest scorers, printing the lowest scorer first, then the second lowest scorer followed by the third lowest scorer. Using the sample data, the output will be:
[[text]]3 lowest scorers
14
21
24[[/text]]`,
      explanation: `This is a long problem, but the structure is very manageable because the prompt already tells us what methods to write.

**readData** reads pairs of numbers from the input file. The first number goes into the two-point basket array, and the second number goes into the three-point basket array. The method returns the number of players read, so the rest of the program knows how much of each array is actually filled.

**totalPoints** creates a new array. Each player's score is two times their two-point baskets plus three times their three-point baskets. We return this new array because the total points are used again later by the averages method and the sort method.

**averages** prints the average points from two-point baskets, three-point baskets, and total points. **Be careful:** the two-point and three-point arrays store basket *counts*, so convert them into *points* before averaging:
[[table]]
Column | Baskets | Points | Average over 5 players
avg2pt | 8 + 6 + 4 + 9 + 12 = 39 | 39 × 2 = 78 | 15.60
avg3pt | 3 + 5 + 2 + 1 + 0 = 11 | 11 × 3 = 33 | 6.60
avgpts | - | 25 + 27 + 14 + 21 + 24 = 111 | 22.20
[[/table]]

**sort** puts the total scores in ascending order: {25, 27, 14, 21, 24} becomes {14, 21, 24, 25, 27}. The three lowest scores are simply the **first three** values. sort also receives **count**, so it only sorts the players that were actually read in.`,
      solution: `import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;

public class Spring2023Final {
    public static void main(String[] args) throws FileNotFoundException {
        // Create the arrays, read the input file, compute totals, print averages,
        // sort the total scores, and then print the three lowest scores.
        final int MAX_PLAYERS = 25;
        String fileName = "input.txt";
        PrintWriter output = new PrintWriter("output.txt");

        int[] twoPointBaskets = new int[MAX_PLAYERS];
        int[] threePointBaskets = new int[MAX_PLAYERS];

        int count = readData(fileName, twoPointBaskets, threePointBaskets);
        int[] totalScores = totalPoints(output, twoPointBaskets, threePointBaskets, count);

        averages(output, twoPointBaskets, threePointBaskets, totalScores, count);
        sort(totalScores, count);

        output.println();
        output.println("3 lowest scorers");

        for (int i = 0; i < 3 && i < count; i++) {
            output.println(totalScores[i]);
        }

        output.close();
    }

    public static int readData(String fileName, int[] twoPointBaskets, int[] threePointBaskets)
            throws FileNotFoundException {
        // Read each player's two-point and three-point basket counts from the file,
        // store them in parallel arrays, and return the number of players read.
        Scanner input = new Scanner(new File(fileName));
        int count = 0;

        while (input.hasNextInt()) {
            twoPointBaskets[count] = input.nextInt();
            threePointBaskets[count] = input.nextInt();
            count++;
        }

        input.close();
        return count;
    }

    public static int[] totalPoints(PrintWriter output, int[] twoPointBaskets,
            int[] threePointBaskets, int count) {
        // Build and return an array containing each player's total score.
        int[] totalScores = new int[count];

        for (int i = 0; i < count; i++) {
            totalScores[i] = twoPointBaskets[i] * 2 + threePointBaskets[i] * 3;
        }

        return totalScores;
    }

    public static void averages(PrintWriter output, int[] twoPointBaskets,
            int[] threePointBaskets, int[] totalScores, int count) {
        // Compute the average points from two-point baskets, three-point baskets,
        // and total scores, then print the values right adjusted.
        int sumTwoPointBaskets = 0;
        int sumThreePointBaskets = 0;
        int sumTotalScores = 0;

        for (int i = 0; i < count; i++) {
            sumTwoPointBaskets += twoPointBaskets[i];
            sumThreePointBaskets += threePointBaskets[i];
            sumTotalScores += totalScores[i];
        }

        double averageTwoPointPoints = sumTwoPointBaskets * 2.0 / count;
        double averageThreePointPoints = sumThreePointBaskets * 3.0 / count;
        double averageTotalPoints = (double) sumTotalScores / count;

        output.printf("%7s %6s %6s%n", "avg2pt", "avg3pt", "avgpts");
        output.printf("%7.2f %6.2f %6.2f%n",
                averageTwoPointPoints, averageThreePointPoints, averageTotalPoints);
    }

    public static void sort(int[] totalScores, int count) {
        // Sort the total scores in ascending order using selection sort.
        for (int i = 0; i < count - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < count; j++) {
                if (totalScores[j] < totalScores[minIndex]) {
                    minIndex = j;
                }
            }

            int temp = totalScores[i];
            totalScores[i] = totalScores[minIndex];
            totalScores[minIndex] = temp;
        }
    }
}`,
    },
  ],
};
