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
        rules.required(),
      ]),
      registration: schema.string({}, [
        rules.unique({ table: 'students', column: 'registration' }),
        rules.required(),
      ]),
      birthDate: schema.string({}, [rules.required()]),
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
  //mostrar todos alunos
  public async index() {
    const students = await Student.all()

    return {
      data: students,
    }
  }
  //mostrar aluno por matricula
  public async show({ params }: HttpContextContract) {
    const student = await Student.findBy('registration', params.registration)

    return {
      data: student,
    }
  }

  //deletar usuario
  public async destroy({ params, request, response }: HttpContextContract) {
    try {
      const student = await Student.findByOrFail('registration', params.registration)
      const studentData = request.body()

      // verifica se os dados sao os mesmos que foi passado pelo aluno para permitir deletar
      if (student.email === studentData.email && student.birthDate === studentData.birthDate) {
        await student.delete()
        return {
          data: 'Deletado com sucesso',
        }
      }
      return response.status(401).send('Verifique os dados')
    } catch (error) {
      return response.status(401).send('Verifique os dados')
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
