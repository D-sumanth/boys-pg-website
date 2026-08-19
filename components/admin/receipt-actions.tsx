"use client"

import { useState } from "react"
import { Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ReceiptDownloadData = {
  receiptNumber: string
  receiptTitle: string
  paymentDate: string
  residentLabel: string
  residentName: string
  residentPhone: string
  roomNumber: string
  amount: number
  amountWords: string
  purpose: string
  paymentMode: string
  transactionReference: string
  notes: string
  hostelName: string
  addressLines: readonly string[]
  hostelPhone: string
  hostelEmail: string
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(/\s+/)
  let line = ""
  let currentY = y

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word

    if (line && context.measureText(candidate).width > maxWidth) {
      context.fillText(line, x, currentY)
      line = word
      currentY += lineHeight
    } else {
      line = candidate
    }
  }

  if (line) {
    context.fillText(line, x, currentY)
  }

  return currentY + lineHeight
}

function createReceiptImage(receipt: ReceiptDownloadData) {
  const canvas = document.createElement("canvas")
  canvas.width = 1080
  canvas.height = 1500
  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Receipt image could not be prepared.")
  }

  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = "#173b72"
  context.fillRect(0, 0, canvas.width, 300)
  context.fillStyle = "#f4aa3b"
  context.fillRect(0, 300, canvas.width, 12)

  context.textAlign = "center"
  context.fillStyle = "#ffffff"
  context.font = "700 54px Arial, sans-serif"
  context.fillText(receipt.hostelName, canvas.width / 2, 92)
  context.font = "500 27px Arial, sans-serif"
  context.fillText(receipt.addressLines.join(", "), canvas.width / 2, 142, 940)
  context.fillText(`${receipt.hostelPhone}  |  ${receipt.hostelEmail}`, canvas.width / 2, 188)

  context.fillStyle = "#f4aa3b"
  context.font = "700 42px Arial, sans-serif"
  context.fillText(receipt.receiptTitle.toUpperCase(), canvas.width / 2, 260)

  context.textAlign = "left"
  context.fillStyle = "#172033"
  context.font = "700 28px Arial, sans-serif"
  context.fillText("Receipt number", 80, 385)
  context.textAlign = "right"
  context.fillText(receipt.receiptNumber, 1000, 385)

  context.strokeStyle = "#dfe5ee"
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(80, 420)
  context.lineTo(1000, 420)
  context.stroke()

  const rows = [
    ["Date", receipt.paymentDate],
    [receipt.residentLabel, receipt.residentName],
    ["Phone", receipt.residentPhone || "Not recorded"],
    ["Room", receipt.roomNumber || "Not assigned"],
    ["Payment for", receipt.purpose],
    ["Payment mode", receipt.paymentMode],
    ["Reference", receipt.transactionReference || "Not applicable"],
  ] as const

  let y = 490
  for (const [label, value] of rows) {
    context.textAlign = "left"
    context.fillStyle = "#64748b"
    context.font = "600 25px Arial, sans-serif"
    context.fillText(label, 80, y)
    context.fillStyle = "#172033"
    context.font = "600 29px Arial, sans-serif"
    context.fillText(value, 375, y, 625)
    y += 76
  }

  context.fillStyle = "#eef4fb"
  context.fillRect(80, y - 18, 920, 190)
  context.fillStyle = "#173b72"
  context.font = "700 30px Arial, sans-serif"
  context.fillText("Amount received", 120, y + 38)
  context.textAlign = "right"
  context.font = "700 54px Arial, sans-serif"
  context.fillText(`INR ${receipt.amount.toLocaleString("en-IN")}`, 950, y + 45)
  context.textAlign = "left"
  context.fillStyle = "#475569"
  context.font = "500 24px Arial, sans-serif"
  wrapText(context, receipt.amountWords, 120, y + 105, 820, 32)
  y += 235

  if (receipt.notes) {
    const imageNotes = receipt.notes.length > 240 ? `${receipt.notes.slice(0, 237)}...` : receipt.notes
    context.fillStyle = "#64748b"
    context.font = "600 24px Arial, sans-serif"
    context.fillText("Notes", 80, y)
    context.fillStyle = "#172033"
    context.font = "500 25px Arial, sans-serif"
    y = wrapText(context, imageNotes, 80, y + 42, 920, 34) + 22
  }

  context.strokeStyle = "#dfe5ee"
  context.beginPath()
  context.moveTo(80, 1305)
  context.lineTo(1000, 1305)
  context.stroke()
  context.textAlign = "center"
  context.fillStyle = "#475569"
  context.font = "500 24px Arial, sans-serif"
  context.fillText("This is a computer-generated receipt and does not require a signature.", 540, 1365)
  context.fillStyle = "#173b72"
  context.font = "700 25px Arial, sans-serif"
  context.fillText("Thank you", 540, 1415)

  return canvas
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error("Receipt image could not be prepared."))
      }
    }, "image/png")
  })
}

export function ReceiptActions({ receipt }: { receipt: ReceiptDownloadData }) {
  const [message, setMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function saveOrShareImage() {
    setIsSaving(true)
    setMessage("")

    try {
      const blob = await canvasToBlob(createReceiptImage(receipt))
      const fileName = `${receipt.receiptNumber.toLowerCase()}.png`
      const file = new File([blob], fileName, { type: "image/png" })

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${receipt.hostelName} receipt`,
        })
        setMessage("Receipt shared. Choose Save Image on your phone to keep it in the gallery.")
        return
      }

      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = fileName
      link.click()
      URL.revokeObjectURL(downloadUrl)
      setMessage("Receipt image downloaded.")
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setMessage("Sharing cancelled.")
      } else {
        setMessage("The receipt image could not be saved. Please try Print / Save PDF instead.")
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid gap-2 print:hidden sm:flex sm:flex-wrap sm:justify-end">
      <Button type="button" size="lg" className="h-12 gap-2" onClick={saveOrShareImage} disabled={isSaving}>
        <Download className="size-5" />
        {isSaving ? "Preparing..." : "Save / Share Image"}
      </Button>
      <Button type="button" size="lg" variant="outline" className="h-12 gap-2 bg-card" onClick={() => window.print()}>
        <Printer className="size-5" />
        Print / Save PDF
      </Button>
      {message ? <p className="text-sm text-muted-foreground sm:basis-full sm:text-right" role="status">{message}</p> : null}
    </div>
  )
}
