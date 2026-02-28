// src/data/notes/sorting.ts
import type { NoteTopic } from "../../types";

export const sorting: NoteTopic = {
  id:    "sorting",
  label: "sorting",
  entries: [
    {
      id:    "bubble-sort",
      title: "bubble sort",
      tags:  ["Algorithm", "O(N²)"],
      sections: [
        {
          type:    "code",
          label:   "Implementation",
          content: `public static void bubbleSort(int[] nums) {

        for (int i = 0; i < nums.length; i++) {
            boolean swapped = false;
            for (int j = 0; j < nums.length - i - 1; j++) {
                if (nums[j] > nums[j+1]) {
                    int temp = nums[j+1];
                    nums[j+1] = nums[j];
                    nums[j] = temp;
                    swapped = true;
                }
            }
            if (swapped == false)
                break;
        }
    }`,
        },
        {
          type:    "text",
          label:   "Overview",
          content: `Bubble sort is an algorithim that sorts an array. It takes elements from the beginning of the array and bubbles them into their proper place. For example,
          
Given int[] A = {10,9,8,7,6,50}

This array is not sorted. So, Bubble Sort starts with the 10. It does a series of comparison to put 10 into its proper place. 10 is bigger than 9, so we swap 10 and 9.

{9,10,8,7,6,50}

10 is bigger than 8. Swap.

{9,8,10,7,6,50}

10 is bigger than 7. Swap.

{9,8,7,10,6,50}

10 is bigger than 6. Swap.

{9,8,7,6,10,50}

As you see, 10 is now in its proper place. We repeat this process for all other numbers on subsequent iteration. Eventually, we arrive at a sorted array, {6,7,8,9,10,50}.`,
        },
      ],
    },
    {
      id:    "selection-sort",
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

            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] < min) {
                    min = nums[j];
                    minIndex = j;
                }
            }

            nums[minIndex] = nums[i];
            nums[i] = min;
        }
    }`,
        },
        {
          type:    "text",
          label:   "Overview",
          content: `Selection Sort is a sorting algorithims that first looks at index 0. It searches through the rest of the array looking for the smallest number smaller than the value at index 0. If such a value is found, a swap happens. We repeat the process for index 1, 2, 3, etc.`,
        },
      ],
    },
  ],
};