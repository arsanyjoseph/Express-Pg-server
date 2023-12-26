import { Pool, type PoolConfig } from "pg";
import { readSqlFile } from "../utils/readSqlFiles";
import path from "path"

export class DBConnection {
  readonly pool: Pool;
  private readonly sqlDirName = "/sql/"
  constructor(config: PoolConfig, queries?: Record<string, string>) {
    this.pool = new Pool(config);
    if (queries) this.runInitialQueries(queries).catch((err) => { console.log(err) });
  }

  private async runInitialQueries(tables: Record<string, string>): Promise<void> {
    for (const [, sqlFilePath] of Object.entries(tables)) {
      const query = await this.readSqlQueryFiles(sqlFilePath)
      await this.runSqlQueryFiles(query)

    }
  }

  private async readSqlQueryFiles(fileName: string): Promise<string> {
    const fullPath = path.resolve(path.join(__dirname, this.sqlDirName, fileName))
    return await readSqlFile(fullPath)
  }

  private async runSqlQueryFiles(query: string): Promise<void> {
    await this.pool.query(query)
  }

  connect(): void {
    this.pool.connect(() => {
      console.log("Database connected");
    });
  }
}
