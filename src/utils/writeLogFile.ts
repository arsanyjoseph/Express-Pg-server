import fs from "fs"

function getLogFileName(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

function createLogFile(filePath: string): void {
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                } else {
                    console.log('New file created.');
                }
            });
        } else {
            console.log('File already exists.');
        }
    });
}

function writeLogsToFile(filePath: string, entry: string): void {
    fs.appendFile(filePath, entry, (err) => {
        if (err) console.warn("Error while writing log")
        else console.log("Successful Logging process")
    })
}

export function logToFile(logEntry: string, path: string): void {
    const fileName = `${getLogFileName()}.log`
    const logFilePath = `${path}${fileName}`
    createLogFile(logFilePath)
    writeLogsToFile(logFilePath, logEntry)
}