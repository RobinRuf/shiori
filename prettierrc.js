import prettierPluginSortImport from "@ianvs/prettier-plugin-sort-imports";
import prettierPluginPkg from "prettier-plugin-pkg";
import * as prettierPluginTailwindCss from "prettier-plugin-tailwindcss";

export default {
  semi: false,
  singleQuote: true,
  trailingComma: "none",
  arrowParens: "avoid",
  tabWidth: 2,
  useTabs: false,
  plugins: [
    // Sort fields in package.json
    prettierPluginPkg,
    // Sort imports
    prettierPluginSortImport,
    prettierPluginTailwindCss,
  ],
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
  proseWrap: "always",
};
