import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProfessorsController {
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

    const playload = await request.validate({
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
      message: 'Aluno criado com sucesso',
      data: professor,
    }
  }
  //mostrar professor por matricula
  public async show({ params }: HttpContextContract) {
    const student = await Professor.query().preload('classroom')

    return {
      data: student,
    }
  }
  //deletar usuario
  public async destroy({ params, request, response }: HttpContextContract) {
    try {
      const professor = await Professor.findByOrFail('registration', params.registration)
      const professorData = request.body()

      // verifica se os dados sao os mesmos que foi passado pelo aluno para permitir deletar
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
    } catch (error) {
      return response.status(401).send('Verifique os dados')
    }
  }
  //alterar dados professor
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const professor = await Professor.findByOrFail('registration', params.registration)

      //verificar um meio de saber se é o proprio usuario

      professor.name = body.name
      professor.email = body.email
      professor.birthDate = body.birthDate

      professor.save()

      return {
        data: 'Dados atualizados',
      }
    } catch (error) {
      return response.status(401)
    }
  }
}
