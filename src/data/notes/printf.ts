import type { NoteTopic } from "../../types";

export const printf: NoteTopic = {
  id:    "printf",
  label: "printf",
  entries: [
    {
      id:    "printfguide",
      title: "printf guide",
      tags:  ["printf", "Formatting"],
      sections: [
        {
          type:    "text",
          label:   "Format specifiers",
          content: `**System.out.printf** prints text with values dropped into it. The first argument is the **format string**. Every **format specifier** in it, which starts with %, is replaced by the next argument, in order:
[[code]]System.out.printf("Name: %s, Age: %d, GPA: %.2f%n", "Ana", 19, 3.456);[[/code]]
[[text]]Name: Ana, Age: 19, GPA: 3.46[[/text]]
The specifier must match the type of its argument:
[[table]]
Specifier | Prints | Example | Output
%d | an int | printf("%d", 42) | 42
%f | a double | printf("%f", 3.14159) | 3.141590
%s | a String, or anything as text | printf("%s", "Java") | Java
%c | a char | printf("%c", 'A') | A
%n | a line break | printf("Hi%n") | Hi, then a new line
%% | a percent sign | printf("100%%") | 100%
[[/table]]
Unlike println, printf does not end the line by itself. Put **%n** at the end of the format string, or the next output continues on the same line.`,
        },
        {
          type:    "text",
          label:   "Width",
          content: `A number right after the % is the **width**: the least number of characters the value takes up. Shorter values are padded with spaces on the left, which lines numbers up on the right. A **-** before the width pads on the right instead, which lines text up on the left.

In these examples, the brackets are part of the format string, and each space in the output is drawn as · so you can count them:
[[table]]
Format | Value | Output
[%5d] | 42 | [···42]
[%-5d] | 42 | [42···]
[%10s] | "Java" | [······Java]
[%-10s] | "Java" | [Java······]
[%3c] | 'A' | [··A]
[[/table]]
A width never cuts anything off. If the value is longer than the width, it is printed in full:
[[table]]
Format | Value | Output
[%3d] | 123456 | [123456]
[[/table]]`,
        },
        {
          type:    "text",
          label:   "Precision",
          content: `For %f, a dot and a number set the **precision**: how many digits to show after the decimal point. Without one, %f always shows 6 digits. Spaces are drawn as · again.
[[table]]
Format | Value | Output
[%f] | 3.14159 | [3.141590]
[%.2f] | 3.14159 | [3.14]
[%.0f] | 3.14159 | [3]
[%8.2f] | 3.14159 | [····3.14]
[%-8.2f] | 3.14159 | [3.14····]
[[/table]]
%8.2f combines both: 2 digits after the point, padded to 8 characters in total. The decimal point counts as one of the 8.

Java rounds **half up**: a 5 in the first dropped digit always rounds up.
[[table]]
Format | Value | Output
%.2f | 2.675 | 2.68
%.2f | 0.125 | 0.13
%.2f | 1.005 | 1.01
%.1f | 0.25 | 0.3
[[/table]]
For %s, the precision keeps only the first few characters: printf("%.3s", "Java") prints Jav.`,
        },
        {
          type:    "text",
          label:   "Flags",
          content: `Flags go right after the %, before the width:
[[table]]
Flag | Meaning | Example | Output
- | pad on the right | [%-5d] with 42 | [42···]
0 | pad numbers with zeros | [%05d] with 42 | [00042]
, | put commas in big numbers | %,d with 1234567 | 1,234,567
[[/table]]
Flags can be combined with a width and a precision. %,.2f is a common way to print money:
[[code]]System.out.printf("Total: $%,.2f%n", 1234567.891);[[/code]]
[[text]]Total: $1,234,567.89[[/text]]
The - and 0 flags need a width, and they cannot be used together. The 0 and , flags only work with numbers.`,
        },
        {
          type:    "text",
          label:   "Printing a table",
          content: `Widths are how you line up columns. Use a left-aligned width for the text column and a right-aligned width for the numbers, so the decimal points line up:
[[code]]System.out.printf("%-10s%8.2f%n", "Coffee", 3.5);
System.out.printf("%-10s%8.2f%n", "Bagel", 12.25);
System.out.printf("%-10s%8.2f%n", "Juice", 4.0);[[/code]]
[[text]]Coffee        3.50
Bagel        12.25
Juice         4.00[[/text]]
Each name is padded to 10 characters, and each price takes up 8, with 2 digits after the point.`,
        },
        {
          type:    "text",
          label:   "Common mistakes",
          content: `**The wrong type.** %d only prints an int and %f only prints a double. Mixing them up compiles, but crashes when it runs:
[[code]]System.out.printf("%d%n", 3.5);   // IllegalFormatConversionException
System.out.printf("%f%n", 7);     // IllegalFormatConversionException[[/code]]
To print 7 with %f, write 7.0, or cast it with (double) 7.

**Too few arguments.** Every specifier except %n and %% needs its own argument. If there are not enough, Java prints everything before the specifier that has no argument, then throws a MissingFormatArgumentException:
[[code]]System.out.printf("%s is %d%n", "Ana");   // prints "Ana is ", then crashes[[/code]]
**Too many arguments.** Extra arguments are ignored, with no error, so a missing specifier can go unnoticed.

**Forgetting %n.** Without it, the next thing printed starts on the same line.`,
        },
      ],
    },
    {
      id:    "printfplayground",
      title: "printf playground",
      tags:  ["printf", "Practice"],
      printf: { format: "", args: "" },
      sections: [
        {
          type:    "text",
          label:   "How to use it",
          content: `Type a format string and its arguments, separated by commas, and the playground shows exactly what System.out.printf prints. Or press one of the examples to load it.

Write each argument the way you would in Java: whole numbers such as 42 are ints, numbers with a decimal point such as 3.5 are doubles, text goes in double quotes, a single character goes in single quotes, and true and false are booleans. The type matters, because %d and %f each accept only one type.

In the output, every space is drawn as a dot, so you can count the padding a width adds. Each specifier's part of the output has its own color, matching its row in the table underneath, which explains where every character came from.

If Java would throw an exception, the playground names it, explains why, and shows anything printed before the crash. Every result matches what Java does.

The playground covers %d, %f, %s, %c, %n, and %%, with a width, a precision, and the - 0 , flags. That is everything the exams use. Doubles can have up to 15 significant digits. Outputs assume a US locale, where the decimal point is a dot and big numbers use commas.`,
        },
      ],
    },
  ],
};
