import { Poppins } from "next/font/google";
import classnames from "classnames";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  title: string
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div
      className={classnames(
        "w-full flex flex-col gap-y-4 items-center",
        poppins.className
      )}
    >
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p>{label}</p>
    </div>
  );
};
