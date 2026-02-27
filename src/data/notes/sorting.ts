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
          type:    "text",
          label:   "Overview",
          content: `Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. The pass is repeated until no swaps are needed, meaning the array is sorted.\n\nEach full pass \"bubbles\" the largest unsorted element to its correct position at the end of the array. Because of this, you need at most n-1 passes for an array of size n.\n\nTime complexity is O(N²) in the average and worst case. It is O(N) in the best case (already sorted) if you add an early-exit flag. Space complexity is O(1) — it sorts in place.`,
        },
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
      ],
    },
    {
      id:    "quick-sort",
      title: "quick sort",
      tags:  ["Algorithm", "O(N LOG N)"],
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `Quick sort is a divide-and-conquer algorithm. It picks a pivot element, partitions the array so that all elements less than the pivot come before it and all elements greater come after it, then recursively sorts the two sub-arrays.\n\nThe choice of pivot matters. A bad pivot (always the smallest or largest element) degrades to O(N²). Picking the middle element or a random element avoids this in practice.\n\nAverage and best-case time complexity is O(N log N). Worst case is O(N²). Space complexity is O(log N) due to the recursive call stack.`,
        },
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
      ],
    },
  ],
};