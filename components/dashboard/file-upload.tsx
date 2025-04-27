"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Upload, X, File, FileText, ImageIcon, Check, Loader2 } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type FileWithPreview = File & {
  preview?: string
  id: string
  progress: number
  status: "uploading" | "complete" | "error"
}

export function FileUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Add preview, id, progress and status to each file
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(2, 11),
        progress: 0,
        status: "uploading" as const,
      }),
    )

    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
    },
    maxSize: 10485760, // 10MB
  })

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((file) => file.id !== id)
      return filtered
    })
  }

  const uploadFiles = async () => {
    if (files.length === 0 || files.every((file) => file.status === "complete")) return

    setIsUploading(true)

    // Update progress for each file
    const uploadPromises = files.map(async (file) => {
      if (file.status === "complete") return

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress: i } : f)))
      }

      // Mark as complete
      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "complete", progress: 100 } : f)))

      // In a real implementation, you would upload the file to your server or cloud storage
      // const formData = new FormData()
      // formData.append('file', file)
      // const response = await fetch('/api/upload', { method: 'POST', body: formData })
      // const data = await response.json()
      // return data
    })

    try {
      await Promise.all(uploadPromises)
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file${files.length > 1 ? "s" : ""} uploaded.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (file: FileWithPreview) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />
    } else if (file.type === "application/pdf") {
      return <FileText className="h-6 w-6 text-red-500" />
    } else if (file.type === "text/csv") {
      return <FileText className="h-6 w-6 text-green-500" />
    } else {
      return <File className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Upload Files</CardTitle>
        <CardDescription className="text-white/70">
          Upload roof images, documents, or CSV data for analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-neon-gold/70 bg-neon-gold/10"
              : "border-white/20 hover:border-neon-gold/50 hover:bg-white/5"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className={`h-10 w-10 ${isDragActive ? "text-neon-gold" : "text-white/50"}`} />
            <p className="text-sm font-medium text-white">
              {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select files"}
            </p>
            <p className="text-xs text-white/50">Supports images, PDFs, and CSV files up to 10MB</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">Files ({files.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-2 rounded-md bg-black/30 border border-white/10"
                  >
                    {file.type.startsWith("image/") ? (
                      <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={file.preview || ""}
                          alt={file.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview || "")
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-black/50 flex items-center justify-center flex-shrink-0">
                        {getFileIcon(file)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-white/50">{(file.size / 1024).toFixed(1)} KB</p>
                      {file.status === "uploading" && file.progress < 100 && (
                        <Progress value={file.progress} className="h-1 mt-1" />
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {file.status === "complete" ? (
                        <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-500" />
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-white/10"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={uploadFiles}
          disabled={files.length === 0 || isUploading || files.every((file) => file.status === "complete")}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-neon-blue"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : files.every((file) => file.status === "complete") ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              All Files Uploaded
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload {files.filter((f) => f.status !== "complete").length} File
              {files.filter((f) => f.status !== "complete").length !== 1 && "s"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
