import {
  green as pcgreen,
  yellow as pcyellow,
  red as pcred,
  gray as pcgray,
  magenta as pcmagenta,
  cyan as pccyan,
} from 'picocolors'

export function formatGreen(input: string): string {
  return pcgreen(input)
}

export function formatYellow(input: string): string {
  return pcyellow(input)
}

export function formatRed(input: string): string {
  return pcred(input)
}

export function formatGray(input: string): string {
  return pcgray(input)
}

export function formatMagenta(input: string): string {
  return pcmagenta(input)
}

export function formatCyan(input: string): string {
  return pccyan(input)
}
