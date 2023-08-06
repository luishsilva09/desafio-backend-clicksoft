import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProfessorsController {
  //criar novo professor
  public async store({ request, response }: HttpContextContract) {
    //validar dados
    const newProfessor = schema.create({
      name: schema.string({}, [rules.required()]),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'professors', column: 'email' }),
        rules.required(),
      ]),
      registration: schema.string({}, [
        rules.unique({ table: 'professors', column: 'registration' }),
        rules.required(),
      ]),
      birthDate: schema.string({}, [rules.required()]),
    })

    await request.validate({
      schema: newProfessor,
      messages: {
        required: 'Campo {{ field }} é obrigatorio',
        unique: 'Verificar dados',
      },
    })

    const body = request.body()

    const professor = await Professor.create(body)

    response.status(201)
    return {
      message: 'Professor criado com sucesso',
      data: professor,
    }
  }
  //mostrar professor por matricula
  public async show({ params }: HttpContextContract) {
    const professor = await Professor.query().where('registration', params.registration)

    return {
      data: professor,
    }
  }
  //deletar professor
  public async destroy({ params, request, response }: HttpContextContract) {
    const professor = await Professor.findByOrFail('registration', params.registration)
    const professorData = request.body()

    // verifica se os dados sao os mesmos que foi passado pelo professor para permitir deletar
    if (
      professor.email === professorData.email &&
      professor.birthDate === professorData.birthDate
    ) {
      await professor.delete()
      return {
        data: 'Deletado com sucesso',
      }
    }
    return response.status(401).send('Verifique os dados')
  }
  //alterar dados professor
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const professor = await Professor.findByOrFail('registration', params.registration)

    professor.name = body.name
    professor.email = body.email
    professor.birthDate = body.birthDate

    professor.save()

    return {
      data: 'Dados atualizados',
    }
  }
}
