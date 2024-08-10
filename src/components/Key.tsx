interface IProps {
  name: string;
  secondary?: boolean;
}

const Key = ({ name, secondary }: IProps) => {
  return (
    <kbd
      className={`px-1 py-[1px] border-2 text-xs rounded-md ${
        secondary ? "text-white border-white/10" : "text-black border-black/10"
      }`}
    >
      {name}
    </kbd>
  );
};
export default Key;
