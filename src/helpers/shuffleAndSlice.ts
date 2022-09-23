export function shuffleAndSlice<T = any>(array: T[], maxItems?: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());

  if (maxItems) {
    return shuffled.slice(0, maxItems);
  }

  return shuffled;
}
