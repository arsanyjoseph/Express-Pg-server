import { type OmitId } from "../../types/utils";
import { type QuestionDto } from "./question.dto";
import { type QuestionRepository } from "./question.repository";

export class QuestionService {
    constructor(private readonly questionRepository: QuestionRepository) { }

    async getQuestionById(id: number): Promise<QuestionDto> {
        return await this.questionRepository.getQuestionById(id)
    }

    async createQuestion(questionDto: OmitId<QuestionDto>): Promise<QuestionDto> {
        return await this.questionRepository.createQuestion(questionDto)
    }
}