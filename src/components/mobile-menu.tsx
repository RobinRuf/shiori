import Search from "./search";
import Sidebar from "./sidebar";
import { IconX } from "@tabler/icons-react";

interface MobileMenuProps {
  meta: { title?: string; [key: string]: any };
  onClose: () => void;
}

const docsPath = "/docs";

export function MobileMenu({ meta, onClose }: MobileMenuProps) {
  return (
    <div className="sh:fixed sh:inset-0 sh:p-6 sh:z-40 sh:bg-accent">
      <div className="sh:flex sh:items-center sh:w-full sh:gap-6">
        <div className="sh:flex-1 sh:w-full">
          <Search onClose={onClose} />
        </div>
        <IconX
          width={20}
          height={20}
          strokeWidth={1}
          onClick={onClose}
          className="sh:cursor-pointer"
        />
      </div>
      <Sidebar meta={meta} docsBase={docsPath} onClose={onClose} />
    </div>
  );
}
