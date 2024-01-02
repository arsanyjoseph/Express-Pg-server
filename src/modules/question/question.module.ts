import type { App } from "../../main";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { Module } from "../common/module";

export class QuestionModule extends Module {
    private readonly questionRepository: QuestionRepository
    private readonly questionService: QuestionService
    private readonly questionController: QuestionController
    constructor(app: App) {
        super("/question", "question", true, app)
        this.questionRepository = new QuestionRepository(this.poolWrapper)
        this.questionService = new QuestionService(this.questionRepository)
        this.questionController = new QuestionController(this.router, this.questionService, app.getValidator())
    }
}