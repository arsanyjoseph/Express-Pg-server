import type { Column } from "../../types/queries";

export interface CategoryDto extends Column {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    isActive: boolean;
    userId: number;

}
