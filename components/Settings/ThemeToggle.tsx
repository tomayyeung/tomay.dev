import { Toggle } from "./Toggle";

export function ThemeToggle() {
  const toggleTheme = () => {

  }

  return (
    <Toggle name="Theme" left="Light" leftColor="#ccc" right="Dark" rightColor="#333" func={toggleTheme}/>
  );
}