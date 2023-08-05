import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Classroom from 'App/Models/Classroom'
import Professor from 'App/Models/Professor'
import Student from 'App/Models/Student'
import ClassStudent from 'App/Models/ClassStudent'

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
    await request.validate({
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

  //deletar sala
  public async destroy({ params, request }: HttpContextContract) {
    const roomNumber = params.roomNumber
    const body = request.body()

    //busca dado professor
    const profData = await Professor.findByOrFail('registration', body.profRegistration)
    //buscar dados sala
    const roomData = await Classroom.findByOrFail('roomNumber', roomNumber)

    //verificar se o professor foi quem criou a sala
    if (profData.id === roomData.professorId) {
      await roomData.delete()
      return {
        data: 'Deletado com sucesso',
      }
    }
    return {
      data: 'Verificar dados',
    }
  }
  //atualizar dados
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    //busca dados da sala
    const classroom = await Classroom.findByOrFail('roomNumber', params.roomNumber)

    //busca dado professor
    const profData = await Professor.findByOrFail('registration', body.profRegistration)

    //verificar se o professor foi quem criou a sala
    if (profData.id !== classroom.professorId) {
      return {
        data: 'verifique os dados',
      }
    }

    //faz a atualização dos dados
    classroom.studentCapacity = body.studentCapacity
    classroom.isAvailable = body.isAvailable

    classroom.save()

    return {
      data: 'Dados atualizados',
    }
  }
  public async show({ params, request }: HttpContextContract) {
    const roomNumber = params.roomNumber
    // const body = request.body()
    // console.log(body)

    // await Professor.findByOrFail('registration', body.profResgistration)

    const classroom = await Database.from('classrooms').where('room_number', roomNumber)

    return {
      data: classroom,
    }
  }

  public async addStudent({ params, request, response }: HttpContextContract) {
    const roomNumber = params.roomNumber
    const body = request.body()
    const validRequest = schema.create({
      professorRegistration: schema.string({}, [
        rules.exists({ table: 'professors', column: 'registration' }),
        rules.alphaNum(),
      ]),
      studentRegistration: schema.string({}, [
        rules.exists({ table: 'students', column: 'registration' }),
      ]),
    })
    await request.validate({
      schema: validRequest,
    })

    const roomData = await Classroom.findByOrFail('roomNumber', roomNumber)
    const profData = await Professor.findByOrFail('registration', body.professorRegistration)
    const studentData = await Student.findByOrFail('registration', body.studentRegistration)

    //validar apenas para professor que criou a sala
    if (roomData.professorId !== profData.id) {
      return response.status(401).send('Verifique os dados')
    }
    //verificar se  aluno já está na sala
    const existOnClass = await ClassStudent.query()
      .where('student_id', studentData.id)
      .andWhere('classroom_id', roomData.id)

    if (existOnClass.length !== 0) {
      return response.status(401).send({
        data: 'ja esta na sala',
        existOnClass,
      })
    }
    // verifica a capacidade da sala
    if (roomData.studentCapacity === 0 || !roomData.isAvailable) {
      return {
        data: 'Sala está cheia',
      }
    }
    //adiciona o dado na tabela intermediaria
    await ClassStudent.create({
      studentId: studentData.id,
      classroomId: roomData.id,
    })
    // decrementa a capacidade da sala quando um aluno é adicionado
    await Classroom.query().where('id', roomData.id).decrement('studentCapacity', 1)

    return {
      data: 'Aluno adicionado',
    }
  }
}
