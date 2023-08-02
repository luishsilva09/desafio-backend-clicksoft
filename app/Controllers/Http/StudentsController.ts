import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const student = await Student.create(body)

    response.status(201)
    return {
      message: 'Aluno criado com sucesso',
      data: student,
    }
  }