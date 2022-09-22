export const shuffleAndSlice = (array: any[], maxItems: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, maxItems);
};
