// 文字列として書くことで Tailwind がクラスを検出できる
export const COL_SPAN: Record<number, string> = { 1: 'col-span-1', 2: 'col-span-2' }
export const ROW_SPAN: Record<number, string> = { 1: 'row-span-1', 2: 'row-span-2' }

export function parseSize(size: string): { cols: number; rows: number } {
  const [cols, rows] = size.split('x').map(Number)
  return { cols: cols ?? 1, rows: rows ?? 1 }
}

export function sizeClasses(size: string): string {
  const { cols, rows } = parseSize(size)
  return `${COL_SPAN[cols] ?? 'col-span-1'} ${ROW_SPAN[rows] ?? 'row-span-1'}`
}
