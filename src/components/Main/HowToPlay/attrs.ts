export interface CardProps {
  delay: number;
}
export const card = ({ delay }: CardProps) => {
  return {
    style: {
      animationDelay: `${delay}s`,
    },
  };
};
