import { Pool, type PoolConfig } from "pg";
import { readSqlFile } from "../utils/readSqlFiles";
import path from "path"

export class DBConnection {
  readonly pool: Pool;
  private readonly sqlDirName = "/sql/"
  constructor(config: PoolConfig, queries?: Record<string, string>) {
    this.pool = new Pool(config);
    if (queries) this.runInitialQueries(queries)
  }

  private runInitialQueries(tables: Record<string, string>): void {
    for (const [table, sqlFilePath] of Object.entries(tables)) {
      const query = this.readSqlQueryFiles(sqlFilePath)
      this.runSqlQueryFiles(query).then(() => { console.log(`${table.toUpperCase()} is Ready`) }).catch((error) => { throw new Error(error as string) })

    }
  }

  private readSqlQueryFiles(fileName: string): string {
    const fullPath = path.resolve(path.join(__dirname, this.sqlDirName, fileName))
    return readSqlFile(fullPath)
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
