DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'question_type'
) THEN CREATE TYPE question_type AS ENUM ('mcq', 'essay');
END IF;
END $$;