'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function NewTodoPage() {
  const [title, setTitle] = useState('')
  const [importance, setImportance] = useState('')
  const router = useRouter()

  async function createTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || importance === '') {
      return
    }

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          importance
        })
      })

      if (!res.ok) {
        throw new Error('Failed to create todo')
      }

      // Todo creation was successful, redirect
      router.replace('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl text-center p-3'>Create New Todo</h3>
      <form
        onSubmit={createTodo}
        className='flex gap-2 flex-col sm:w-2/3 md:w-1/3'
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='border border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <select
          name='important'
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className='form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black py-2'
        >
          <option value='' disabled>
            Select Importance
          </option>
          <option value='important'>Important</option>
          <option value='not-important'>Not Important</option>
        </select>
        <div className='flex gap-1 justify-end'>
          <Link
            href='..'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
