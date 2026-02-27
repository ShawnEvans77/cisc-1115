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
          content: `Binary search is a searching algorithim that only works on sorted arrays. Binary search returns the index of a specified target in a sorted array. It returns -1 if it fails to find the target.
    
To do binary search, jump to the middle of the array. If the middle is too big, ignore the entire right half of the array and focus on the left half. If the middle is too small, ignore the left half of the array and focus on the right half. Repeat this until the number is found. 

Suppose we have:

int[] A = {2,4,6,8,10,12,14,16,18,20,24,28,30,36,40,45,47,49,100}

Let's trace the binary search algorithm. We are looking for the number 36.

We create start & end pointers. On the first iteration of binary search, start = 0 & end = 18, since the last index of this array is 18.

(0 + 18)/2 is 9. We have found the middle index. A[9] is 20 which is smaller than 36. So, we must move right and ignore the left portion of the array.

To move left, we change start to mid+1. The new start becomes 10.

We are now only looking at {24,28,30,36,40,45,47,49,100}, completely discarding the left portion. We do the process again. start = 10 & end = 18. (10+18)/2 is 14.

A[14], the middle number, is 40, which is now too big. So, let's move left. To move left, we change end to mid-1. The new end becomes 13.

We are now looking at {24, 28, 30, 36}. The process happens again. start = 10 & end = 13. (10+13)/2 is 11.5, but we truncate the decimal, so the current mid is 11. A[11] = 28, which is too small. Move right. start = mid+1.

The new start becomes 12. We are now looking at {30, 36} where start = 12 and end = 13. We calculate the mid as (12+13)/2 which is 12.5, truncated to 12. A[12] is 30, which is still smaller than 36. We move right again by setting start to mid+1, making the new start 13.

Now both start and end are 13. We calculate the mid as (13+13)/2 which is 13. We check A[13] and find it is 36. The target is found at index 13 and the search is complete.

Binary Search questions will typically ask you to create a chart of the values of start & mid & end. In this case, our chart is: 

Start | Mid | End
0     | 9   | 18
10    | 14  | 18
10    | 11  | 13
12    | 12  | 13
13    | 13  | 13`,
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