import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Classroom from './Classroom'
export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({})
  public email: string

  @column()
  public registration: string

  @column()
  public birthDate: string

  @manyToMany(() => Classroom, { pivotTable: 'class_student' })
  public classrooms: ManyToMany<typeof Classroom>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
