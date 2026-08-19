const smallNumbers = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
] as const

const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"] as const

function belowOneThousand(value: number) {
  const words: string[] = []
  let remainder = value

  if (remainder >= 100) {
    words.push(`${smallNumbers[Math.floor(remainder / 100)]} Hundred`)
    remainder %= 100
  }

  if (remainder >= 20) {
    words.push(tens[Math.floor(remainder / 10)])
    remainder %= 10
  }

  if (remainder > 0) {
    words.push(smallNumbers[remainder])
  }

  return words.join(" ")
}

export function amountToIndianWords(amount: number) {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0
  let rupees = Math.floor(safeAmount)
  const paise = Math.round((safeAmount - rupees) * 100)
  const words: string[] = []

  const scales = [
    { value: 10_000_000, label: "Crore" },
    { value: 100_000, label: "Lakh" },
    { value: 1_000, label: "Thousand" },
  ] as const

  for (const scale of scales) {
    if (rupees >= scale.value) {
      const count = Math.floor(rupees / scale.value)
      words.push(`${belowOneThousand(count)} ${scale.label}`)
      rupees %= scale.value
    }
  }

  if (rupees > 0) {
    words.push(belowOneThousand(rupees))
  }

  const rupeeWords = words.length ? words.join(" ") : "Zero"
  const paiseWords = paise > 0 ? ` and ${belowOneThousand(paise)} Paise` : ""

  return `Rupees ${rupeeWords}${paiseWords} Only`
}

export function formatReceiptAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

export function formatReceiptDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`))
}

export function fallbackReceiptNumber(paymentId: string) {
  return `PDPG-${paymentId.slice(0, 8).toUpperCase()}`
}
