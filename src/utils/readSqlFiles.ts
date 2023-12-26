import fs from "fs";

export const readSqlFile = async (pathToFile: string): Promise<string> => {
    try {
        const file: string = await new Promise((resolve, reject) => {
            fs.readFile(pathToFile, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return file;
    } catch (err) {
        throw new Error(err as string);
    }
};