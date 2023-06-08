import { Router, Request, Response } from 'express';
import { ContactSchema } from '../models/todos'
import * as mongoose from 'mongoose'

const router = Router();

const Todo = mongoose.model('Todo', ContactSchema);

router.get("/", (req: Request, res: Response) => {
  res.json({msg:"Express + TypeScript Server"});
});

router.get('/api/todo', async (req: Request, res: Response) => {
  const todo = await Todo.find({})
  return res.status(200).send(todo)
})

router.post('/api/todo', async (req: Request, res: Response) => {
  const todo = new Todo(req.body)
  await todo.save()
  return res.status(201).send(todo)
})

router.get('/api/todo/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id)
  return res.status(200).send(todo)
})

router.put('/api/todo/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  return res.status(200).send(todo)
})

router.delete('/api/todo/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findOneAndRemove({ _id: req.params.id })
  return res.status(200).send(todo)
})

export default router;
