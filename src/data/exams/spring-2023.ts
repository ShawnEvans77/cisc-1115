import type { Exam } from "../../types";

export const spring2023: Exam = {
  id: "spring2023",
  label: "spring 2023",
  year: "2023",
  questions: [
    {
      id: "1",
      title: "question 1",
      topics: ["Arrays", "Characters"],
      prompt: `Write the Java code for a method named maxChar that receives two equally-sized **char** arrays as arguments. The methods returns a newly created array of type **char**.

Each element of the new array that is returned is the larger (based on the ASCII code) of the corresponding elements of the two arrays received.

For example if ['x', '3', '?'] and ['7', '4', 'e'] were passed to maxChar, it would return the array: ['x', '4', 'e'].

Or, if ['6', 'f', 'n'] and ['S', 'u', ','] were passed to maxChar, then ['S', 'u', 'n'] would be returned.`,
      explanation: `This is mostly a "follow the prompt exactly" problem. We are making a third array that lines up with the two arrays we were given.

Create a new **char[]** with the same length as one of the input arrays. Then loop through every index.

At each index, compare **A[i]** and **B[i]**. If **A[i]** has the larger ASCII value, put **A[i]** in the new array. Otherwise, put **B[i]** there.

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
      id: "3",
      title: "question 3",
      topics: ["Arrays", "Binary Search"],
      prompt: `Given the array of numbers below, show all the steps as you perform a binary search, looking for the key of 11:
[[code]]int[] nums = {9, 15, 23, 67, 78, 85, 111, 117, 135, 225, 829, 1000};[[/code]]

Enter into the table the low, mid and high values as the binary search progresses. DO NOT write any code. You may use either the subscript (index) values or the actual number stored at the subscript. Not all rows of the table may be needed.`,
      solutionType: "text",
      explanation: `The array has 12 values, so the first index is **0** and the last index is **11**. Binary search always checks the middle of the current range.

Start with **low = 0** and **high = 11**. The middle is **(0 + 11) / 2 = 5**. Since **nums[5] = 85**, and 85 is bigger than 11, move left by setting **high = mid - 1**.

Now the range is **0 to 4**. The middle is **2**. Since **nums[2] = 23**, and 23 is still bigger than 11, move left again.

Now the range is **0 to 1**. The middle is **0**. Since **nums[0] = 9**, and 9 is smaller than 11, move right by setting **low = mid + 1**.

Now the range is **1 to 1**. The middle is **1**. Since **nums[1] = 15**, and 15 is bigger than 11, move left one more time.

At this point, **low = 1** and **high = 0**. The condition **low <= high** is false, so the search stops. The value 11 is not in the array.`,
      solution: `  Low | Mid  | High
 ----------------------
    0 |   5  |   11
    0 |   2  |    4
    0 |   0  |    1
    1 |   1  |    1
    1 |   -  |    0`,
    },
    {
      id: "6",
      title: "question 6",
      topics: ["Equations", "Math Methods"],
      prompt: `Write a Java expression that would compute the following:`,
      mathLatex: `w = \\sqrt{\\dfrac{\\sqrt{\\dfrac{x+y}{z}} - 1}{(1+x)^2}}`,
      explanation: `This is another direct equation translation. Work from the inside out so the parentheses stay under control.

The inner fraction is **(x + y) / z**, and that whole fraction is inside a square root, so it becomes **Math.sqrt((x + y) / z)**.

After that, subtract **1**, divide by **(1 + x)^2**, and take the square root of the entire result. The squared part becomes **Math.pow(1 + x, 2)**.`,
      solution: `double result = Math.sqrt((Math.sqrt((x + y) / z) - 1) / Math.pow(1 + x, 2));`,
    },
    {
      id: "8",
      title: "question 8",
      topics: ["Arrays", "Files", "Methods", "Sorting", "Averages"],
      prompt: `Write a complete Java program. You must comment the main program and all methods, explaining what action(s) each performs.

Design a Java class with a main method that reads the number of baskets scored by each player in a basketball game. The number of baskets consists of the number of two-point baskets and three-point baskets each player scored. At most there will be 25 players read in, though there could be less.

Sample Data
[[text]]8 3
6 5
4 2
9 1
12 0[[/text]]

A sample record consists of two numbers, the first representing the number of two-point baskets and the second representing the number of three-point baskets. A record 8 3 represents 8 2-point baskets and 3 3-point baskets, for a total of 8 x 2 + 3 x 3, or 25 points.

main will invoke methods, that you write, to perform the following tasks:

(a) main will pass a filename for input and two integer arrays to a method readData. It will read from the file the number of 2-point and 3-point baskets per player and store them in two separate arrays. The method will return the total number of players read in.

(b) main will invoke a method totalPoints that accepts an object of a class that will enable writing to a file, two integer arrays for the number of 2-point and 3-point baskets, and the number of players read in. It will return an integer array that contains, for each player, the total number of points that player scored.

(c) main will invoke a method averages that accepts an object of a class for output, 3 integer arrays for 2-point baskets, 3-point baskets, and total points, and the number of records read in. It will compute and print to the output file a header and the overall average number of points for 2-point baskets, the overall average number of points for 3-point baskets, and the overall average number of total points, right adjusted. The output from the sample data would be:
[[text]] avg2pt avg3pt avgpts
  15.60   6.60  22.20[[/text]]

(d) main will then invoke a method sort that is passed the array of total points and prints the number of points of the three lowest scorers, printing the lowest scorer first, then the second lowest scorer followed by the third lowest scorer. Using the sample data, the output will be:
[[text]]3 lowest scorers
14
21
24[[/text]]`,
      explanation: `This is a long problem, but the structure is very manageable because the prompt already tells us what methods to write.

**readData** reads pairs of numbers from the input file. The first number goes into the two-point basket array, and the second number goes into the three-point basket array. The method returns the number of players read so the rest of the program knows how much of each array is actually filled.

**totalPoints** creates a new array. Each player's score is computed with **twoPointBaskets[i] * 2 + threePointBaskets[i] * 3**. We return this new array because total points are used again later by the average method and the sort method.

**averages** prints the average points from two-point baskets, three-point baskets, and total points. Be careful here: the two-point and three-point arrays store basket counts, so they must be converted into points before printing the averages.

**sort** puts the total scores in ascending order. Once the array is sorted, the three lowest scores are simply the first three values in the array.`,
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
