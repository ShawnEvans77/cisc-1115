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
          content: `public static int binarySearch(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;

        while (start <= end) {
            int mid = (start + end) / 2;
       
            if (target == nums[mid])
                return mid;
            else if (target < nums[mid])
                end = mid - 1;
            else if (target > nums[mid])
                start = mid + 1;
        }

        return -1;
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
          content: `Linear search is the most basic way of finding an element in an array. Starting from the beginning of the array, you check every single element to see if it matches your target.`,
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