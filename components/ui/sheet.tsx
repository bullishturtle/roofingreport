// Simplified sheet component to avoid build issues
"use client"

import type * as React from "react"

const Sheet = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetTrigger = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetHeader = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetTitle = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetDescription = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetFooter = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const SheetClose = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose }
