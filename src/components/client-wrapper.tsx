import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    document.documentElement.setAttribute("data-theme", theme || "system");

    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [theme]);

  if (!mounted) return null;

  return <>{children}</>;
};

export default ClientWrapper;
