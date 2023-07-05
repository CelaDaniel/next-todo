export async function getTodosFn() {
  const res = await fetch(`/api/todos`)
  if (!res.ok) {
    console.log(res)
  } else {
    return await res.json()
  }
}

export async function deleteTodoFn(id: number) {
  try {
    const res = await fetch(`api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Failed to delete todo')
    }

    // Deletion was successful, redirect the home page
  } catch (err) {
    console.error(err)
  }
}

type UpdateTodoTypes = {
  id: string | number
  title: string
  importance: string
  complete: boolean
}

export async function updateTodoFn({
  id,
  title,
  importance,
  complete
}: UpdateTodoTypes) {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        importance,
        complete
      })
    })

    if (!res.ok) {
      throw new Error('Failed to update todo')
    }
  } catch (err) {
    console.error(err)
  }
}

export async function getSingleTodoFn(id: string) {
  const res = await fetch(`/api/todos/${id}`)

  if (!res.ok) {
    console.log(res)
  }

  return await res.json()
}
