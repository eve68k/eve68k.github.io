import type { LinkTile } from '../schema.ts'
import { parseSize, sizeClasses } from '../grid.ts'
import { Icon } from '../icons.tsx'

export function LinkCard({ tile }: { tile: LinkTile }) {
  const isExternal = !tile.url.startsWith('mailto:') && !tile.url.startsWith('tel:')
  const { cols } = parseSize(tile.size)
  const isWide = cols >= 2

  return (
    <a
      href={tile.url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={[
        'rounded-[20px] p-[22px] overflow-hidden no-underline',
        'flex flex-col justify-between',
        isWide ? 'sm:flex-row sm:items-center sm:gap-5 sm:justify-start' : '',
        'will-change-transform transition-[transform,box-shadow] duration-150 ease-out',
        'hover:scale-[1.025] hover:-translate-y-0.5 hover:shadow-xl',
        'active:scale-[0.98]',
        sizeClasses(tile.size),
      ].join(' ')}
      style={{ backgroundColor: tile.bg ?? '#18181b', color: tile.fg ?? '#ffffff' }}
      aria-label={tile.name}
    >
      {tile.icon && (
        <div className="opacity-90 shrink-0">
          <Icon name={tile.icon} size={isWide ? 36 : 30} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        {tile.icon && (
          <span className="text-[11px] font-semibold opacity-50 uppercase tracking-widest">
            {tile.icon}
          </span>
        )}
        <span className="text-base font-bold leading-tight">{tile.name}</span>
      </div>
    </a>
  )
}
