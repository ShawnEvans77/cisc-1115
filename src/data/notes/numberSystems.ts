import type { NoteTopic } from "../../types";

export const numberSystems: NoteTopic = {
  id:    "numbersystems",
  label: "number systems",
  entries: [
    {
      id:    "bases",
      title: "how number bases work",
      tags:  ["Binary", "Decimal", "Hexadecimal"],
      converter: { from: 10, to: 2, value: "45" },
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `A number base says how many digits a number system has, and what each place in a number is worth.

We count in **decimal**, base 10. It has ten digits, 0 to 9, and every place is worth a power of 10. Reading 512 from the right, that is a ones place, a tens place, and a hundreds place:
[[table]]
Place | 10² | 10¹ | 10⁰
Value | 100 | 10 | 1
Digit | 5 | 1 | 2
[[/table]]
5×100 + 1×10 + 2×1 = 512.

Every other base works exactly the same way. Only the number of digits and the place values change.

**Binary** is base 2. It has two digits, 0 and 1, and the places are powers of 2: 1, 2, 4, 8, 16, 32, 64, 128, and so on, doubling each time. Computers store everything in binary, and one binary digit is called a **bit**.

**Hexadecimal**, or hex, is base 16. It needs sixteen digits, so after 0 to 9 it borrows the letters A to F. The places are powers of 16: 1, 16, 256, 4096.

On the exam, the base is written after the number, as in 101 (base 2). The same digits mean different numbers in different bases: 101 (base 2) is 5, 101 (base 10) is one hundred and one, and 101 (base 16) is 257.`,
        },
        {
          type:    "text",
          label:   "The sixteen hex digits",
          content: `Memorize this table. Each hex digit stands for exactly four bits, which is why converting between binary and hex is so quick.
[[table]]
Decimal | Binary | Hex
0 | 0000 | 0
1 | 0001 | 1
2 | 0010 | 2
3 | 0011 | 3
4 | 0100 | 4
5 | 0101 | 5
6 | 0110 | 6
7 | 0111 | 7
8 | 1000 | 8
9 | 1001 | 9
10 | 1010 | A
11 | 1011 | B
12 | 1100 | C
13 | 1101 | D
14 | 1110 | E
15 | 1111 | F
[[/table]]
A quick way to remember the letters: A is 10, and each letter after it is one more, up to F = 15.`,
        },
        {
          type:    "text",
          label:   "Common traps",
          content: `**Check the digits first.** A binary number can only contain 0 and 1, and a decimal number can never contain a letter. Exams sometimes ask you to convert something like 156 (base 2). That is not a valid binary number, since it contains a 5 and a 6, so the right answer is to say it is invalid.

**Places count from 0, starting on the right.** The rightmost place is always worth 1, because any base to the power 0 is 1.

**16¹ is 16, not 10.** In hex, the second place from the right is the sixteens place.

**A hex letter is one digit.** In C4, the C is a single digit worth 12. Do not split it into a 1 and a 2.

**Leading zeros do not change the value.** 0101 and 101 are the same binary number. You add zeros on the left when grouping bits into fours, and you can drop them from an answer.`,
        },
      ],
    },
    {
      id:    "binarytodecimal",
      title: "binary to decimal",
      tags:  ["Binary", "Decimal"],
      converter: { from: 2, to: 10, value: "101101" },
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `To turn a binary number into decimal, label each place with its power of 2, then add up the places that hold a 1.

Let's convert **101101** (base 2).

The number has six digits, so the places go from 2⁵ on the left down to 2⁰ on the right. Write the value of each place above its digit:
[[table]]
Place | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 32 | 16 | 8 | 4 | 2 | 1
Digit | 1 | 0 | 1 | 1 | 0 | 1
[[/table]]
A 1 means the place counts, and a 0 means it is skipped. The places holding a 1 are 32, 8, 4, and 1:

32 + 8 + 4 + 1 = **45**

So 101101 (base 2) is 45 in decimal.

The quickest way to set up the table is to start at the *right* with 1 and double as you move left. Count the digits first, so you know how many places you need.`,
        },
      ],
    },
    {
      id:    "hextodecimal",
      title: "hexadecimal to decimal",
      tags:  ["Hexadecimal", "Decimal"],
      converter: { from: 16, to: 10, value: "2F" },
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `Hex to decimal works like binary to decimal, but the places are powers of 16, and a digit can be worth more than 1. Multiply each digit by its place value, then add.

Let's convert **2F** (base 16).

F is the hex digit for 15. The 2 is in the 16¹ place, and the F is in the 16⁰ place:
[[table]]
Place | 16¹ | 16⁰
Value | 16 | 1
Digit | 2 | F
Digit value | 2 | 15
[[/table]]
2×16¹ + F×16⁰ = 2×16 + 15×1 = 32 + 15 = **47**

With three digits, the next place is 16² = 256. For **1A3** (base 16), where A is 10:

1×16² + A×16¹ + 3×16⁰ = 1×256 + 10×16 + 3×1 = 256 + 160 + 3 = **419**

Write the letters as their values *before* you multiply. Writing A×16 as 1×16 or 0×16 is the most common mistake here.`,
        },
      ],
    },
    {
      id:    "decimaltobinary",
      title: "decimal to binary",
      tags:  ["Decimal", "Binary"],
      converter: { from: 10, to: 2, value: "75" },
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `To turn a decimal number into binary, find the powers of 2 that add up to it. Write a 1 for every power you use and a 0 for every power you skip.

Let's convert **75**.

First, write out the powers of 2, doubling from 1 and stopping before you pass 75. The next one, 128, is too big, so the biggest is 64:
[[table]]
Place | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰
Value | 64 | 32 | 16 | 8 | 4 | 2 | 1
[[/table]]
Now go from the biggest power to the smallest. If the power fits into what is left, take it and subtract it. If not, skip it:
[[table]]
Power of 2 | Left | Fits? | Digit
64 | 75 | yes: 75 - 64 = 11 | 1
32 | 11 | no: 32 > 11 | 0
16 | 11 | no: 16 > 11 | 0
8 | 11 | yes: 11 - 8 = 3 | 1
4 | 3 | no: 4 > 3 | 0
2 | 3 | yes: 3 - 2 = 1 | 1
1 | 1 | yes: 1 - 1 = 0 | 1
[[/table]]
Reading the digits from top to bottom:
[[table]]
Power of 2 | 64 | 32 | 16 | 8 | 4 | 2 | 1
Used? | 1 | 0 | 0 | 1 | 0 | 1 | 1
[[/table]]
64 + 8 + 2 + 1 = 75, so the answer is **1001011**.

Always check your answer by converting it back. That is just the binary to decimal method, and it catches most mistakes.`,
        },
        {
          type:    "text",
          label:   "Another way: divide by 2",
          content: `You can also divide by 2 over and over and keep the remainders. Each remainder n % 2 is the next bit, starting from the right, and you keep dividing the quotient n / 2 until it reaches 0:
[[table]]
n | n / 2 | n % 2
75 | 37 | 1
37 | 18 | 1
18 | 9 | 0
9 | 4 | 1
4 | 2 | 0
2 | 1 | 0
1 | 0 | 1
[[/table]]
The first remainder is the *rightmost* bit, so read the n % 2 column from the bottom up: **1001011**, the same answer.

Both methods are fine. Subtracting powers of 2 is usually faster for the small numbers on exams, and it is the one the converter below shows.`,
        },
      ],
    },
    {
      id:    "decimaltohex",
      title: "decimal to hexadecimal",
      tags:  ["Decimal", "Hexadecimal"],
      converter: { from: 10, to: 16, value: "300" },
      sections: [
        {
          type:    "text",
          label:   "Overview",
          content: `To turn a decimal number into hex, divide by 16 and keep the remainder. The remainder is a hex digit, and a remainder from 10 to 15 becomes a letter.

For a number under 256, the answer has at most two digits, and one division is enough. Let's convert **200**:

200 / 16 = 12, with 200 % 16 = 8 left over. 12 is C, so the answer is **C8**.

Check: 12×16 + 8 = 192 + 8 = 200.

For bigger numbers, keep dividing the quotient by 16 until it reaches 0. Let's convert **300**:
[[table]]
n | n / 16 | n % 16 | Hex digit
300 | 18 | 12 | C
18 | 1 | 2 | 2
1 | 0 | 1 | 1
[[/table]]
The first remainder is the *rightmost* digit, so read the Hex digit column from the bottom up: **12C**.

Check: 1×16² + 2×16¹ + C×16⁰ = 1×256 + 2×16 + 12×1 = 256 + 32 + 12 = 300.

The / and % here are Java's integer division and remainder, so you can check each row the same way Java would compute it.`,
        },
      ],
    },
    {
      id:    "binaryhex",
      title: "binary and hexadecimal",
      tags:  ["Binary", "Hexadecimal"],
      converter: { from: 2, to: 16, value: "1011110" },
      sections: [
        {
          type:    "text",
          label:   "Binary to hex",
          content: `Since 16 is 2⁴, every hex digit is exactly four binary digits. You never have to go through decimal: convert four bits at a time.

Let's convert **1011110** (base 2).

Split the number into groups of four, **starting from the right**. It has seven digits, so the leftmost group is short. Fill it with a zero on the left, where zeros do not change the value:

1011110 → 0101 1110

Now convert each group on its own. Inside a group, the places are worth 8, 4, 2, and 1:
[[table]]
Binary group | 0101 | 1110
Add up | 4 + 1 | 8 + 4 + 2
Decimal | 5 | 14
Hex digit | 5 | E
[[/table]]
Put the hex digits side by side: **5E**.

Grouping from the left is the classic mistake. It would give 1011 111, a different number.`,
        },
        {
          type:    "text",
          label:   "Hex to binary",
          content: `Going the other way, turn each hex digit into its four-bit group and line the groups up.

Let's convert **3B** (base 16). B is 11:
[[table]]
Hex digit | 3 | B
Decimal | 3 | 11
Add up | 2 + 1 | 8 + 2 + 1
Binary group | 0011 | 1011
[[/table]]
Side by side, the groups read 0011 1011. Dropping the leading zeros gives **111011**.

Every group must have four digits. If you write 3 as 11 instead of 0011, the bits after it move into the wrong places.`,
        },
      ],
    },
    {
      id:    "converter",
      title: "number converter",
      tags:  ["Binary", "Decimal", "Hexadecimal", "Practice"],
      converter: { from: 10, to: 2, value: "246" },
      sections: [
        {
          type:    "text",
          label:   "How to use it",
          content: `Type a number, pick the base it is in and the base to convert it to, and the converter works it out step by step, the same way an exam solution would show it.

Press **Next step** to see one step at a time, or **Show all** to see the full answer at once. Try each step yourself before you reveal it.

**⇄** swaps the two bases and carries the answer over, so you can convert it straight back as a check. **Random** picks a number in the range the exams use.

The converter accepts whole numbers from 0 to 65535. Spaces are ignored, so you can type binary in groups like 1010 1011. If you type a digit that does not belong to the base, such as a 2 in binary, it tells you the number is invalid, just like an exam answer should.`,
        },
      ],
    },
  ],
};
