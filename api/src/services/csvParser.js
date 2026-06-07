'use strict'

const HEX_RE = /^[0-9a-fA-F]{32}$/

function parseCsv(rawText) {
  if (!rawText) return []

  const rows = rawText.split(/\r?\n/)
  const lines = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || !row.trim()) continue

    const columns = row.split(',')
    if (columns.length !== 4) continue

    const [, text, number, hex] = columns
    if (!text || !number || !hex) continue
    if (Number.isNaN(Number(number))) continue
    if (!HEX_RE.test(hex.trim())) continue

    lines.push({
      text,
      number: Number(number),
      hex: hex.trim()
    })
  }

  return lines
}

module.exports = { parseCsv }
