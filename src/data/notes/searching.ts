// src/data/notes/searching.ts
import type { NoteTopic } from "../../types";

export const searching: NoteTopic = {
  id:    "searching",
  label: "searching",
  entries: [
    {
      id:    "binary-search",
      title: "binary search",
      tags:  ["Algorithm", "O(LOG N)"],
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `Binary search works on sorted arrays only. Binary search returns the index of a specified target in a sorted array. It returns -1 if it fails to find the target.
    
I have an array of {1,2,3,4,5,6,7,8,9,10}. Let's say I'm looking for the number 9. Why would I search through the array one by one for 9? If I wanted to find 9, I would first jump to the middle of the array. The middle of the array is 6. 6 is too small. So, I move right. I ignore the left-half of the array and only look at {7,8,9,10}. I jump to the middle of this array. The middle is 8. 8 is too small, so I move right again. Then, when I get to {9,10}, I find 9 at the middle and the number is found. See how much quicker this is as opposed to going one by one?

If I am searching for a number in a sorted array, I use binary search. To do binary search, jump to the middle of the array. If the middle is too big, ignore the entire right half of the array and focus on the left half. If the middle is too small, ignore the left half of the array and focus on the right half. This takes less steps compared to going one by one through the array.`,
        },
        {
          type:    "code",
          label:   "Implementation",
          content: `public static int binarySearch(int[] nums, int target) {

        // start and end pointers
        int start = 0;
        int end = nums.length - 1;

        // while start pointer is less than the end pointer.
        while (start <= end) { 
            // calculate the middle index
            int mid = (start + end) / 2;

            // if the middle is the target
            if (target == nums[mid])
                // simply return the middle index
                return mid;

            // if the middle is too big
            else if (target < nums[mid])
                // move left, ignore entire right half of the array
                end = mid - 1;
              
            // if the middle is too small
            else if (target > nums[mid])
                // move right, ignore entire left half of the array
                start = mid + 1;
        }

        // return -1 if the target cannot be found.
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