import React, { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    errorMessage?: string
    placeholder?: string
    id?: string
}

const Input = ({ id, label, placeholder, errorMessage, ...others }: InputProps) => {
  return (
    <div className='flex flex-col mb-5'>
        <label htmlFor={id} className='text-sm font-medium text-gray-700'>{label}</label>
        <input type="text" placeholder={placeholder} id={id} {...others} className='border border-gray-300 rounded-md p-2'/>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default Input