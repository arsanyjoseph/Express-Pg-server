import fs from "fs";

export const readSqlFile = (pathToFile: string): string => fs.readFileSync(pathToFile).toString();