import type { NoteTile } from '../schema.ts'
import { sizeClasses } from '../grid.ts'

export function NoteCard({ tile }: { tile: NoteTile }) {
  return (
    <div
      className={`rounded-[20px] p-[22px] overflow-hidden flex flex-col justify-center gap-2.5 ${sizeClasses(tile.size)}`}
      style={{ backgroundColor: tile.bg ?? '#fef9c3', color: tile.fg ?? '#713f12' }}
    >
      {tile.emoji && <span className="text-3xl leading-none">{tile.emoji}</span>}
      <p className="text-base font-semibold leading-relaxed">{tile.name}</p>
    </div>
  )
}
