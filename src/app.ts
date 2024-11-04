import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import moment from 'moment'
import { userRoutes } from './app/modules/User/user.route'
import { AdminRoutes } from './app/modules/Admin/admin.route'

const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
      body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a; /* bg-gray-900 */
        color: #e5e7eb; /* text-gray-200 */
        font-family: 'Nunito', sans-serif;
      }
      .container {
        text-align: center;
      }
      .container h1 {
        font-weight: bold;
      }
    </style>
    <div class="container">
      <h1>Server is Running Smoothly</h1>
      <p>Time: ${moment(new Date()).format(' Do MMMM YYYY, h:mm:ss a')}</p>
    </div>
  `)
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', AdminRoutes)

export default app
