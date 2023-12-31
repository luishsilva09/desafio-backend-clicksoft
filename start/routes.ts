/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource('student', 'StudentsController').apiOnly().paramFor('student', 'registration')
Route.resource('professor', 'ProfessorsController').apiOnly().paramFor('professor', 'registration')
Route.resource('classroom', 'ClassroomsController').apiOnly().paramFor('classroom', 'roomNumber')

Route.post('/classroom/addStudent/:roomNumber', 'ClassroomsController.addStudent')
Route.post('/classroom/removeStudent/:roomNumber', 'ClassroomsController.removeStudent')
Route.post('/classroom/allStudent/:roomNumber', 'ClassroomsController.allStudentClass')

Route.get('/student/listClass/:registration', 'StudentsController.listClass')
