import type { Column } from "../../types/queries";
import { type QuestionTypes } from "../../types/questionType";

export interface QuestionDto extends Column {
    id: number;
    categoryId: number;
    userId: number;
    type: QuestionTypes;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
