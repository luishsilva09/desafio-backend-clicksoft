import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classrooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('room_number').notNullable().unique()
      table.decimal('student_capacity', 8, 0).notNullable()
      table.boolean('is_available').notNullable()

      table.integer('student_id').unsigned().references('students.id').onDelete('CASCADE')
      table.integer('professor_id').unsigned().references('professors.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
