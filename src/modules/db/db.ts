import { Pool, type PoolConfig } from "pg";

export class DBConnection {
  readonly pool: Pool;
  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  connect(): void {
    this.pool.connect(() => {
      console.log("Database connected");
    });
  }
}
