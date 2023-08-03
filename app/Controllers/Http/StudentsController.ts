import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    //validar dados
    const newStudent = schema.create({
      name: schema.string({}, [rules.required()]),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'students', column: 'email' }),
      ]),
      registration: schema.string({}, [
        rules.unique({ table: 'students', column: 'registration' }),
      ]),
      birthDate: schema.string(),
    })

    const playload = await request.validate({
      schema: newStudent,
      messages: {
        required: 'Campo {{ field }} é obrigatorio',
        unique: 'Verificar dados',
      },
    })

    const body = request.body()

    const student = await Student.create(body)

    response.status(201)
    return {
      message: 'Aluno criado com sucesso',
      data: student,
    }
  }
  //mostrar aluno por id
  public async show({ params }: HttpContextContract) {
    const student = await Student.findOrFail(params.id)

    return {
      data: student,
    }
  }

  //deletar usuario
  public async destroy({ params }: HttpContextContract) {
    const student = await Student.findOrFail(params.id)

    await student.delete()

    return {
      data: 'Deletado com sucesso',
    }
  }
  //alterar dados aluno
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const student = await Student.findByOrFail('registration', params.registration)

      //verificar um meio de saber se é o proprio usuario

      student.name = body.name
      student.email = body.email
      student.birthDate = body.birthDate

      student.save()

      return {
        data: 'Dados atualizados',
      }
    } catch (error) {
      return response.status(401)
    }
  }
}
