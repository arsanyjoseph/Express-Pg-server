DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
        AND tablename = 'category'
) THEN CREATE TABLE IF NOT EXISTS category (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    "deletedAt" TIMESTAMP,
    "isActive" BOOLEAN NOT NULL,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "user"(id)
);
END IF;
END $$;