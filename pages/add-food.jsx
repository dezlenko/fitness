import { useState } from 'react'

import { server } from '../config'

export default function AddFood() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('oz')
  const [calories, setCalories] = useState('')
  const [fat, setFat] = useState('')
  const [carbs, setCarbs] = useState('')
  const [protein, setProtein] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const body = JSON.stringify({
      name,
      amount,
      unit,
      calories,
      fat,
      carbs,
      protein
    })

    fetch(`${server}/api/addFood`, {
      method: 'POST',
      body
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const restrictNumber = value => {
    return value

    const chars = value.split('')

    const newStr = chars
      .map((char, index) => {
        const number = parseInt(char)

        if (char === '.') {
          if (index === 0) return '0.'
          if (chars.indexOf('.') !== index) return ''
          return '.'
        } else if (isNaN(number)) return ''

        return number
      })
      .join('')

    return newStr
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Chicken"
        />
        <input
          value={amount}
          onChange={e => setAmount(restrictNumber(e.target.value))}
          placeholder="8"
        />
        <input
          value={unit}
          onChange={e => setUnit(e.target.value)}
          placeholder="oz"
        />
        <input
          value={calories}
          onChange={e => setCalories(restrictNumber(e.target.value))}
          placeholder="230"
        />
        <input
          value={fat}
          onChange={e => setFat(restrictNumber(e.target.value))}
          placeholder="4"
        />
        <input
          value={carbs}
          onChange={e => setCarbs(restrictNumber(e.target.value))}
          placeholder="0.5"
        />
        <input
          value={protein}
          onChange={e => setProtein(restrictNumber(e.target.value))}
          placeholder="6.5"
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
