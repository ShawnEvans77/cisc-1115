import type { NoteTopic } from "../../types";

export const sorting: NoteTopic = {
  id:    "sorting",
  label: "sorting",
  entries: [
    {
      id:    "bubblesort",
      title: "bubble sort",
      tags:  ["Algorithm", "O(N²)"],
      sections: [
        {
          type:    "code",
          label:   "Implementation",
          content: `public static void bubbleSort(int[] nums) {

    for (int i = 0; i < nums.length; i++) {
        boolean swapped = false;

        // compare each pair of neighbors, skipping the end that is already sorted
        for (int j = 0; j < nums.length - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                int temp = nums[j + 1];
                nums[j + 1] = nums[j];
                nums[j] = temp;
                swapped = true;
            }
        }

        // no swaps in a whole pass means the array is already sorted
        if (swapped == false)
            break;
    }
}`,
        },
        {
          type:    "text",
          label:   "Overview",
          content: `Bubble sort is an algorithm that sorts an array by repeatedly comparing **neighbors** and swapping them when they are out of order. On each pass, the biggest remaining value "bubbles" to the end of the array.

For example, given:
[[code]]int[] A = {10, 9, 8, 7, 6, 50};[[/code]]

On the first pass, the 10 gets carried to the right one swap at a time:
[[table]]
Compare | Swap? | Array afterwards
10 and 9 | yes | {9, 10, 8, 7, 6, 50}
10 and 8 | yes | {9, 8, 10, 7, 6, 50}
10 and 7 | yes | {9, 8, 7, 10, 6, 50}
10 and 6 | yes | {9, 8, 7, 6, 10, 50}
10 and 50 | no | {9, 8, 7, 6, 10, 50}
[[/table]]

After one pass, the largest value, 50, is guaranteed to be in its final spot. That is why the inner loop stops at **nums.length - i - 1**: there is no point re-checking the end that is already sorted.

We repeat the process, and each pass locks in one more value. Eventually we arrive at a sorted array, {6, 7, 8, 9, 10, 50}.

To sort in **descending** order instead, flip the comparison to **nums[j] < nums[j + 1]**. To sort two arrays in parallel, swap the matching elements of the second array whenever you swap the first.`,
        },
      ],
    },
    {
      id:    "selectionsort",
      title: "selection sort",
      tags:  ["Algorithm", "O(N²)"],
      sections: [
        {
          type:    "code",
          label:   "Implementation",
          content: `public static void selectionSort(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        int min = nums[i];
        int minIndex = i;

        // find the smallest value in the rest of the array
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] < min) {
                min = nums[j];
                minIndex = j;
            }
        }

        // swap it into position i
        nums[minIndex] = nums[i];
        nums[i] = min;
    }
}`,
        },
        {
          type:    "text",
          label:   "Overview",
          content: `Selection sort builds the sorted array one position at a time, from the front.

For index 0, it searches the *whole* array for the smallest value and swaps it into index 0. For index 1, it searches everything from index 1 onward for the smallest remaining value and swaps it into index 1. And so on, until every position is filled.

For example, given {29, 10, 14, 37, 13}:
[[table]]
Position | Smallest from here | Array afterwards
0 | 10 | {10, 29, 14, 37, 13}
1 | 13 | {10, 13, 14, 37, 29}
2 | 14 | {10, 13, 14, 37, 29}
3 | 29 | {10, 13, 14, 29, 37}
4 | 37 | {10, 13, 14, 29, 37}
[[/table]]

Unlike bubble sort, selection sort does at most **one** swap per position, which makes it easy to trace by hand.`,
        },
      ],
    },
  ],
};
