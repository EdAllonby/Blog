export const Chip = ({ text }: { text: string }) => {
  return (
    <span className="align-center flex rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-500">
      {text}
    </span>
  );
};
