import { useTheme } from "next-themes";
import { Avatar } from "@heroui/avatar";
import { themesIcon, themesInversion } from "../libs/constants";
const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.value) throw new Error("Invalid theme!");

    setTheme(
      themesInversion[event.currentTarget.value as keyof typeof themesInversion]
    );
  };

  return (
    <button
      aria-label="Change theme"
      className="flex justify-center items-center p-2 bg-gradient-to-br from-[#FFB457] to-[#FF705B] rounded-full transition-transform duration-300 hover:scale-110"
      value={theme}
      onClick={handleChangeTheme}
    >
      <Avatar
        classNames={{
          base: "bg-transparent",
          icon: "text-black/80 transition-transform duration-200 ease-in-out transform hover:scale-125",
        }}
        icon={themesIcon[theme as keyof typeof themesIcon]}
      />
    </button>
  );
};

export default ThemeSwitcher;
