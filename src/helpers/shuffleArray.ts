export function shuffleArray<T = any>(array: T[]) {
  return [...array].sort(() => 0.5 - Math.random());
}
