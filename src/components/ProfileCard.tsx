import type { ProfileTile } from '../schema.ts'
import { sizeClasses } from '../grid.ts'

export function ProfileCard({ tile }: { tile: ProfileTile }) {
  const initials = tile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`rounded-[20px] p-[22px] overflow-hidden relative flex flex-col justify-end gap-2 ${sizeClasses(tile.size)}`}
      style={{ backgroundColor: tile.bg ?? '#dbeafe' }}
    >
      <div className="absolute top-[22px] left-[22px] size-[60px] rounded-full overflow-hidden bg-black/[0.12] flex items-center justify-center">
        {tile.avatar ? (
          <img src={tile.avatar} alt={tile.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[22px] font-bold leading-none text-black/45">{initials}</span>
        )}
      </div>
      <p className="text-[26px] font-extrabold leading-tight">{tile.name}</p>
      {tile.handle && <p className="text-[13px] font-medium opacity-50 -mt-0.5">{tile.handle}</p>}
      {tile.bio && <p className="text-sm opacity-70 leading-snug">{tile.bio}</p>}
    </div>
  )
}
