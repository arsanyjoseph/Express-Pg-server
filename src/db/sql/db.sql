DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_database
    WHERE datname = 'smart_quiz'
) THEN CREATE DATABASE smart_quiz;
END IF;
END $$;