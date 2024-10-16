"use client"

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

export default function FileUpload({setFile}) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Aquí puedes manejar el archivo
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Aquí puedes manejar el archivo
    //   setFile((prev)=> [...prev, e.target.files[0]])
    setFile(e.target.files[0])
    }
  }

  return (
    <div
      className={`w-full max-w-md mx-auto border-2 border-dashed rounded-lg text-center cursor-pointer ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Upload className="w-4 h-4 mx-auto my-2 text-blue-500 mb-4" />
      <p className="text-sm text-gray-500 mb-2">
        Haga clic o arrastre el archivo a esta área para cargarlo
      </p>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInput}
        multiple
      />
    </div>
  )
}