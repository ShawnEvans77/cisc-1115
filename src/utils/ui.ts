export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function displayIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}
