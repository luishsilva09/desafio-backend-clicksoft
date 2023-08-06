import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import Database from '@ioc:Adonis/Lucid/Database'

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StudentsController {
  //Criar novo aluno
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

    await request.validate({
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

  //mostrar aluno por matricula
  public async show({ params }: HttpContextContract) {
    const student = await Student.query().where('registration', params.registration)
    return {
      data: student,
    }
  }

  //deletar usuario
  public async destroy({ params, request, response }: HttpContextContract) {
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
  }
  //alterar dados aluno
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()

    const student = await Student.findByOrFail('registration', params.registration)

    student.name = body.name
    student.email = body.email
    student.birthDate = body.birthDate

    student.save()
    response.status(200)
    return {
      data: 'Dados atualizados',
    }
  }

  //listar salas do aluno
  public async listClass({ params }: HttpContextContract) {
    //buscar por aluno
    const student = await Student.findByOrFail('registration', params.registration)

    //Buscar e listar as salas que sao necessaria comparecer
    const classList = await Database.from('students')
      .join('class_students', 'students.id', 'class_students.student_id')
      .join('classrooms', 'class_students.classroom_id', 'classrooms.id')
      .join('professors', 'classrooms.professor_id', 'professors.id')
      .select({
        Profesor: 'professors.name',
        Sala: 'classrooms.room_number',
      })
      .where('students.id', student.id)
    return {
      nomeAluno: student.name,
      classList,
    }
  }
}
