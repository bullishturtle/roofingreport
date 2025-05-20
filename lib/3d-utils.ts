"use client"

export class ThreeJsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ThreeJsError"
  }
}

export function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") {
    return false
  }

  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) {
      throw new ThreeJsError("WebGL not supported")
    }

    return true
  } catch (e) {
    console.error("WebGL support check failed:", e)
    return false
  }
}

export function safelyLoadTexture(
  textureLoader: any,
  url: string,
  onLoad?: (texture: any) => void,
  onError?: (error: Error) => void,
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      textureLoader.load(
        url,
        (texture: any) => {
          if (onLoad) onLoad(texture)
          resolve(texture)
        },
        undefined,
        (error: ErrorEvent) => {
          const wrappedError = new ThreeJsError(`Failed to load texture: ${url}. ${error.message}`)
          if (onError) onError(wrappedError)
          reject(wrappedError)
        },
      )
    } catch (error) {
      const wrappedError =
        error instanceof Error
          ? new ThreeJsError(`Error loading texture: ${error.message}`)
          : new ThreeJsError("Unknown error loading texture")

      if (onError) onError(wrappedError)
      reject(wrappedError)
    }
  })
}

export function safelyLoadModel(
  loader: any,
  url: string,
  onLoad?: (model: any) => void,
  onError?: (error: Error) => void,
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      loader.load(
        url,
        (model: any) => {
          if (onLoad) onLoad(model)
          resolve(model)
        },
        undefined,
        (error: ErrorEvent) => {
          const wrappedError = new ThreeJsError(`Failed to load model: ${url}. ${error.message}`)
          if (onError) onError(wrappedError)
          reject(wrappedError)
        },
      )
    } catch (error) {
      const wrappedError =
        error instanceof Error
          ? new ThreeJsError(`Error loading model: ${error.message}`)
          : new ThreeJsError("Unknown error loading model")

      if (onError) onError(wrappedError)
      reject(wrappedError)
    }
  })
}
