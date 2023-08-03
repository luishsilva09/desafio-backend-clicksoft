import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Classroom from './Classroom'
export default class Student extends BaseModel {
  @hasMany(() => Classroom)
  public classroom: HasMany<typeof Classroom>

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
