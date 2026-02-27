// src/data/notes/searching.ts
import type { NoteTopic } from "../../types";

export const searching: NoteTopic = {
  id:    "searching",
  label: "searching",
  entries: [
    {
      id:    "binary-search",
      title: "binary search",
      tags:  ["Algorithm", "O(LOG N)", "Sorted Array Required"],
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `Binary search works on a sorted array by repeatedly halving the search range. It compares the target to the middle element — if equal, it returns; if the target is smaller, it searches the left half; if larger, the right half.\n\nThe array must be sorted before binary search can be used. This is the critical prerequisite.\n\nBest case is O(1). Average and worst case are O(log N) — the search space is halved each iteration. Space complexity is O(1) iteratively, O(log N) recursively due to the call stack.`,
        },
        {
          type:    "code",
          label:   "Implementation",
          content: `public static int binarySearch(int[] arr, int target) {
    int low  = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;          // found
        } else if (arr[mid] < target) {
            low = mid + 1;       // search right half
        } else {
            high = mid - 1;      // search left half
        }
    }

    return -1; // not found
}`,
        },
      ],
    },
    {
      id:    "linear-search",
      title: "linear search",
      tags:  ["Algorithm", "O(N)", "Sequential"],
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `Linear search checks each element in the array one by one from left to right until it finds the target or reaches the end.\n\nIt works on both sorted and unsorted arrays. No preprocessing is required.\n\nBest case is O(1) — the target is the first element. Worst and average case are O(N) — the target is at the end or not present. Space complexity is O(1).`,
        },
        {
          type:    "code",
          label:   "Implementation",
          content: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // return index of match
        }
    }
    return -1; // not found
}`,
        },
      ],
    },
  ],
};