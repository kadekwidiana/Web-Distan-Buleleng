import React from 'react'

export default function InputError({ message }) {
    return (
        <p className="text-sm text-red-600 dark:text-red-500">{message ?? ''}</p>
    )
}
