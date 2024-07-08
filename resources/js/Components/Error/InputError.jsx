import React from 'react'

export default function InputError({ message = 'Error' }) {
    return (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{message}</p>
    )
}
