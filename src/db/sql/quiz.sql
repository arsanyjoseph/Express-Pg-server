DO $$ BEGIN IF NOT EXISTS (
  SELECT 1
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename = 'quiz'
) THEN CREATE TABLE IF NOT EXISTS quiz (
  "id" SERIAL PRIMARY KEY,
  "description" VARCHAR(255) NOT NULL,
  "estimatedTimeInSecs" INTEGER NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  "deletedAt" TIMESTAMP,
  "isActive" BOOLEAN NOT NULL,
  "userId" INTEGER,
  FOREIGN KEY ("userId") REFERENCES "user"(id)
);
END IF;
END $$;