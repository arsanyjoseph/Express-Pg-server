import { QuestionEntity } from './question.entity';
import { type OmitId } from "../../types/utils";
import { Repository } from "../common/repository";
import { type QuestionDto } from "./question.dto";

export class QuestionRepository extends Repository {

    async getQuestionById(id: number): Promise<QuestionDto> {
        const question = await this.poolWrapper.findOne<QuestionDto>("*", { id })
        return question
    }

    async createQuestion(questionDto: OmitId<QuestionDto>): Promise<any> {
        const newQuestion: OmitId<QuestionDto> = {
            ...questionDto,
            [QuestionEntity.CREATED_AT]: new Date().toISOString(),
            [QuestionEntity.UPDATED_AT]: new Date().toISOString(),
        }
        const question = await this.poolWrapper.create<QuestionDto>(newQuestion as QuestionDto)
        return question
    }

}