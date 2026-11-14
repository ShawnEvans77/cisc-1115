import type { NoteTopic } from "../../types";

export const strings: NoteTopic = {
  id:    "strings",
  label: "strings",
  entries: [
    {
      id:    "stringguide",
      title: "string guide",
      tags:  ["Strings", "Methods"],
      sections: [
        {
          type:    "text",
          label:   "Strings and indexes",
          content: `A String is a sequence of characters. Each character has an **index**, its position in the string, and the first index is **0**, not 1.

Here are the indexes of "Hello, World":
[[table]]
Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
Character | H | e | l | l | o | , | space | W | o | r | l | d
[[/table]]
The space and the comma are characters too. The string has 12 characters, so its length is 12, but the last index is **11**. The last index is always one less than the length:
[[code]]String s = "Hello, World";
int len = s.length();                 // 12
char last = s.charAt(s.length() - 1); // 'd'[[/code]]
Asking for an index that does not exist, such as s.charAt(12), throws a **StringIndexOutOfBoundsException**.`,
        },
        {
          type:    "text",
          label:   "Looking at characters",
          content: `**length()** returns the number of characters, as an int.

**charAt(i)** returns the single character at index i. The result is a **char**, written in single quotes:
[[code]]s.charAt(0)   // 'H'
s.charAt(7)   // 'W'[[/code]]
**substring(begin, end)** returns the characters from index begin up to, but **not including**, index end. The number of characters you get is end - begin:
[[code]]s.substring(0, 5)    // "Hello"   indexes 0 to 4
s.substring(7, 12)   // "World"   indexes 7 to 11
s.substring(3, 3)    // ""        nothing[[/code]]
**substring(begin)** with one argument takes everything from begin to the end:
[[code]]s.substring(7)       // "World"[[/code]]
The classic mistake is expecting the character at index end to be included. It never is. Both indexes must be between 0 and the length, and begin cannot be bigger than end, or substring throws a StringIndexOutOfBoundsException.`,
        },
        {
          type:    "text",
          label:   "Searching",
          content: `**indexOf(str)** returns the index where str first appears, or **-1** if it does not appear at all. For a string of several characters, it returns the index of its first character:
[[code]]s.indexOf("o")       // 4
s.indexOf("World")   // 7
s.indexOf("z")       // -1[[/code]]
**indexOf(str, from)** starts looking at index from and skips everything before it. **lastIndexOf(str)** searches from the end instead:
[[code]]s.indexOf("o", 5)    // 8, the o in "World"
s.lastIndexOf("o")   // 8[[/code]]
indexOf and substring are often used together to cut a string at a character. This takes everything before the comma, and everything after the comma and the space:
[[code]]String first = s.substring(0, s.indexOf(","));      // "Hello"
String second = s.substring(s.indexOf(",") + 2);   // "World"[[/code]]
Always check for -1 before using the result as an index. Passing -1 to substring throws an exception.`,
        },
        {
          type:    "text",
          label:   "Comparing",
          content: `Compare strings with **equals**, never with ==. equals checks that the characters match. == only checks whether the two variables point to the same object, which can be false even when the text is the same.
[[code]]"Java".equals("Java")   // true
"Java".equals("java")   // false, case matters[[/code]]
**compareTo** tells you which string comes first in dictionary order. It returns a negative number if the string comes first, 0 if they are equal, and a positive number if it comes after.

To get the exact number, find the first index where the strings differ and subtract the character codes there. If one string runs out first, subtract the lengths instead:
[[code]]"apple".compareTo("banana")   // -1   'a' (97) - 'b' (98)
"car".compareTo("cart")       // -1   lengths 3 - 4
"dog".compareTo("dog")        // 0[[/code]]
Every uppercase letter comes before every lowercase letter, so "Zebra".compareTo("apple") is -7, because 'Z' is 90 and 'a' is 97.`,
        },
        {
          type:    "text",
          label:   "Changing and splitting",
          content: `Strings in Java cannot be changed. Methods like **toUpperCase** and **toLowerCase** return a new string and leave the original alone, so save the result:
[[code]]String word = "hello";
word.toUpperCase();          // the result is thrown away
word = word.toUpperCase();   // word is now "HELLO"[[/code]]
**split** cuts a string at every delimiter and returns the pieces in a String array. The delimiters themselves are not included:
[[code]]String[] colors = "red,green,blue".split(",");
// colors is {"red", "green", "blue"}, and colors.length is 3[[/code]]
Two delimiters in a row leave an empty string between them, but empty strings at the very end are dropped:
[[code]]"one  two".split(" ")   // {"one", "", "two"}
"a,b,,".split(",")      // {"a", "b"}, length 2[[/code]]
split takes a **regular expression**, where some characters have special meanings. A dot means "any character", so "1.2.3".split(".") returns an empty array. To split on a real dot, write it as "\\\\.":
[[code]]"1.2.3".split("\\\\.")     // {"1", "2", "3"}[[/code]]`,
        },
      ],
    },
    {
      id:    "stringexplorer",
      title: "string explorer",
      tags:  ["Strings", "Practice"],
      stringExplorer: { text: "Hello, World", method: "substring2", args: ["0", "5"] },
      sections: [
        {
          type:    "text",
          label:   "How to use it",
          content: `Type a string, pick a method, and fill in its arguments. The explorer shows the call, what Java returns, and which characters the method used. Every result matches what Java does, including the exceptions it throws.

Each character sits in its own box with its index underneath. The dashed box at the end marks the index equal to the length, which is where substring's end can point. Spaces are drawn as ␣ so you can count them.

For substring, the characters it takes are highlighted, and arrows mark begin and end. For indexOf, the match is highlighted. For equals and compareTo, the other string is drawn underneath, and the first character that differs is marked. For split, each piece gets its own color, and the delimiters are crossed out.

The explorer accepts strings of up to 40 characters, using the letters, digits, spaces, and symbols on a US keyboard. split only takes plain delimiters, such as a space or a comma, because characters like . and | mean something special in a regular expression.`,
        },
      ],
    },
  ],
};
