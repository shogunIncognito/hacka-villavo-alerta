"use client"

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

export default function FileUpload({ setFile, url, setUrl }) {
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
      const file = e.dataTransfer.files[0]
      const url = URL.createObjectURL(file)
      setFile({ file, url })
      setUrl(url)
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setFile({ file, url })
      setUrl(url)
    }
  }

  return (
    <div
      className={`w-full max-w-md mx-auto border-2 border-dashed rounded-lg text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {!url && (
        <>
          <Upload className="w-12 h-12 mx-auto my-2 text-primary" />
          <p className="text-sm text-muted-foreground mb-2">
            Haga clic o arrastre la imagen a esta área para cargarlo
          </p>
        </>
      )}
      <input
        type="file"
        className="sr-only"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
      />
      {url && (
        <div className="relative inline-block">
          <img
            src={url}
            alt="Vista previa"
            className="mt-4 mx-auto h-32 w-32 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  )
}
