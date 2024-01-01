DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
        AND tablename = 'question'
) THEN CREATE TABLE IF NOT EXISTS question (
    "id" SERIAL PRIMARY KEY,
    "body" VARCHAR(255) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    "deletedAt" TIMESTAMP,
    "type" question_type,
    FOREIGN KEY ("categoryId") REFERENCES "category"(id),
    FOREIGN KEY ("userId") REFERENCES "user"(id)
);
END IF;
END $$;