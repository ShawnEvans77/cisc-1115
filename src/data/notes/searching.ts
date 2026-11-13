import type { NoteTopic } from "../../types";

export const searching: NoteTopic = {
  id:    "searching",
  label: "searching",
  entries: [
    {
      id:    "binarysearch",
      title: "binary search",
      tags:  ["Algorithm", "O(LOG N)"],
      sections: [
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
        {
          type:    "text",
          label:   "Overview",
          content: `Binary search is a searching algorithm that only works on **sorted** arrays. It returns the index of a target in the array, or **-1** if the target is not there.

To do binary search, jump to the middle of the array. If the middle is too big, ignore the entire right half and focus on the left half. If the middle is too small, ignore the left half and focus on the right half. Repeat until the number is found, or until there is nothing left to search.

Each step throws away half of what is left, which is why binary search is so fast. An array of a million values needs at most about 20 checks.

Suppose we have:
[[code]]int[] A = {2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 30, 36, 40, 45, 47, 49, 100};[[/code]]

Let's trace the binary search algorithm. We are looking for the number **36**.

We create two variables, **start** and **end**. On the first iteration, start = 0 and end = 18, since the last index of this array is 18.

(0 + 18) / 2 is 9. A[9] is 20, which is smaller than 36. So we move right and ignore the left portion of the array by changing start to mid + 1. The new start becomes 10.

We are now only looking at {24, 28, 30, 36, 40, 45, 47, 49, 100}. start = 10 and end = 18, so the middle is (10 + 18) / 2 = 14. A[14] is 40, which is too big. So we move left by changing end to mid - 1. The new end becomes 13.

We are now looking at {24, 28, 30, 36}. start = 10 and end = 13. (10 + 13) / 2 is 11.5, but integer division truncates the decimal, so mid is 11. A[11] is 28, which is too small. Move right: start becomes 12.

We are now looking at {30, 36}. (12 + 13) / 2 is 12.5, truncated to 12. A[12] is 30, which is still too small. Move right again: start becomes 13.

Now both start and end are 13. (13 + 13) / 2 is 13. A[13] is 36. The target is found at index 13 and the search is complete.

Binary search questions will typically ask you to fill in a chart of start, mid, and end at each step. In this case, our chart is:
[[table]]
Start | Mid | End | A[mid]
0 | 9 | 18 | 20
10 | 14 | 18 | 40
10 | 11 | 13 | 28
12 | 12 | 13 | 30
13 | 13 | 13 | 36 (found)
[[/table]]

When the target is *not* in the array, start eventually passes end. Show that last row with a dash for mid, since the loop stops before computing it.`,
        },
      ],
    },
    {
      id:    "linearsearch",
      title: "linear search",
      tags:  ["Algorithm", "O(N)"],
      sections: [
        {
          type:    "code",
          label:   "Implementation",
          content: `public static int linearSearch(int[] nums, int target) {

    // for every element in the array
    for (int i = 0; i < nums.length; i++) {

        // if the current number is the same as the target
        if (nums[i] == target) {
            // return the index of the target
            return i; 
        }
    }
    // return -1 if the target cannot be found.
    return -1; 
}`,
        },
        {
          type:    "text",
          label:   "Overview",
          content: `Linear search, also called sequential search, is the most basic way of finding an element in an array. Starting from the beginning of the array, you check every single element to see if it matches your target.

Unlike binary search, linear search works on arrays that are **not** sorted. The tradeoff is speed: in the worst case it has to look at every element.

Notice that **return -1** comes *after* the loop. We can only say the target is missing once every element has been checked. Putting it in an else inside the loop is a classic bug, since the method would give up after looking at index 0.`,
        },
      ],
    },
  ],
};
