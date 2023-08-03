import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Professor from './Professor'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public professorId: number

  @column()
  public roomNumber: string

  @column()
  public studentCapacity: number

  @column()
  public isAvailable: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
