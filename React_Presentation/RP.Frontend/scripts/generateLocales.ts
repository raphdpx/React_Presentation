import { existsSync, readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
import { ETLCodes } from "../src/locales/ETLCodes";
import { ELanguages } from "../src/locales/ELanguages";
import * as path from "path";

const localeResourcesFolder = path.join(__dirname, "..", "src", "locales", "resources");

try {
  const tlCodes = Object.keys(ETLCodes)
    .filter(k => typeof ETLCodes[k as any] === "number")
    .sort();
  const languages = Object.keys(ELanguages)
    .filter(k => typeof ELanguages[k as any] === "number")
    .sort();
  languages.forEach(l => {
    console.log(`Processing language ${chalk.red(l)}`);
    // Try to read json file
    const fileName = path.join(localeResourcesFolder, `${l}.json`);

    let originalContent = {
      translation: {}
    };
    if (existsSync(fileName)) {
      const fileJson = readFileSync(fileName, { encoding: "utf8" });
      originalContent = JSON.parse(fileJson);
      if (originalContent.translation) {
        console.log(`  Language file exists and contains ${Object.keys(originalContent.translation).length} key(s) `);
      }
    }

    const content = {
      ...originalContent,
      translation: {}
    };
    tlCodes.forEach(code => {
      // Search if file contains tlcode
      if (!originalContent.translation[code]) {
        content.translation[code] = `${code}__${l}`;
        console.log(`  Generating tl code ${content.translation[code]}`);
      } else {
        content.translation[code] = originalContent.translation[code];
      }
    });

    const originalKeys = Object.keys(originalContent.translation);
    const contentKeys = Object.keys(content.translation);

    const addedKeys = contentKeys.filter(k => !originalKeys.includes(k));
    const removedKeys = originalKeys.filter(k => !contentKeys.includes(k));

    const finalJson = JSON.stringify(content, null, 2);
    writeFileSync(fileName, finalJson, { encoding: "utf8" });
    console.log(`  ${chalk.green("SUCCESS")} : File ${chalk.blue(fileName)} created !`);
    addedKeys.forEach(k => console.log(chalk.green(` - Added => ${k}`)));
    removedKeys.forEach(k => console.log(chalk.gray(` - Removed => ${k}`)));
    console.log("");
  });
} catch (error) {
  console.error(chalk.red("Error while generating the locale files"), error);
}
