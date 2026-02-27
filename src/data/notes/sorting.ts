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
      id:    "quick-sort",
      title: "quick sort",
      tags:  ["Algorithm", "O(N LOG N)"],
      sections: [
        {
          type:    "code",
          label:   "Implementation",
          content: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low,    pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i     = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i]   = arr[j];
            arr[j]   = temp;
        }
    }

    int temp     = arr[i + 1];
    arr[i + 1]   = arr[high];
    arr[high]    = temp;

    return i + 1;
}`,
        },
        {
          type:    "text",
          label:   "Overview",
          content: `Quick sort is a divide-and-conquer algorithm. It picks a pivot element, partitions the array so that all elements less than the pivot come before it and all elements greater come after it, then recursively sorts the two sub-arrays.\n\nThe choice of pivot matters. A bad pivot (always the smallest or largest element) degrades to O(N²). Picking the middle element or a random element avoids this in practice.\n\nAverage and best-case time complexity is O(N log N). Worst case is O(N²). Space complexity is O(log N) due to the recursive call stack.`,
        },
      ],
    },
  ],
};