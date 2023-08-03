import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Classroom from 'App/Models/Classroom'
import Professor from 'App/Models/Professor'

export default class ClassroomsController {
  public async store({ request, response }: HttpContextContract) {
    //validar dados do body
    const newClass = schema.create({
      professorRegistration: schema.string({}, [
        rules.exists({ table: 'professors', column: 'registration' }),
        rules.alphaNum(),
      ]),
      roomNumber: schema.string({}, [rules.unique({ table: 'classrooms', column: 'room_number' })]),
      studentCapacity: schema.number(),
      isAvailable: schema.boolean(),
    })
    const playload = await request.validate({
      schema: newClass,
    })

    const body = request.body()

    //buscar pelo id do professor
    const professorData = await Professor.findByOrFail('registration', body.professorRegistration)

    const student = await Classroom.create({
      professorId: professorData.id,
      roomNumber: body.roomNumber,
      studentCapacity: body.studentCapacity,
      isAvailable: body.isAvailable,
    })

    response.status(201)
    return {
      message: 'Sala criado com sucesso',
      data: student,
    }
  }

  public async index() {
    const students = await Classroom.query()

    return {
      data: students,
    }
  }
}
