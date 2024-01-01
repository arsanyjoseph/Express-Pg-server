import { type QuestionTypes } from "../../types/questionType";

export interface QuestionDto {
    id: number;
    categoryId: number;
    body: string;
    userId: number;
    type: QuestionTypes;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
