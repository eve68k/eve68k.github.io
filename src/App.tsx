import { useEffect } from 'react'
import rawData from './data.json'
import { siteDataSchema, type SiteData, type ProfileTile, type LinkTile, type NoteTile } from './schema.ts'
import { Icon } from './icons.tsx'
import './App.css'

const parseResult = siteDataSchema.safeParse(rawData)
if (!parseResult.success) {
  console.error('data.json validation errors:', parseResult.error.issues)
  throw new Error('data.json の形式が正しくありません。コンソールを確認してください。')
}
const siteData: SiteData = parseResult.data

function parseSize(size: string) {
  const [cols, rows] = size.split('x').map(Number)
  return { cols: cols ?? 1, rows: rows ?? 1 }
}

// 文字列として書くことで Tailwind がクラスを検出できる
const COL_SPAN: Record<number, string> = { 1: 'col-span-1', 2: 'col-span-2' }
const ROW_SPAN: Record<number, string> = { 1: 'row-span-1', 2: 'row-span-2' }

function sizeClasses(size: string) {
  const { cols, rows } = parseSize(size)
  return `${COL_SPAN[cols] ?? 'col-span-1'} ${ROW_SPAN[rows] ?? 'row-span-1'}`
}

// ─── Profile ────────────────────────────────────────────────────────────────
function ProfileCard({ tile }: { tile: ProfileTile }) {
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

// ─── Link ────────────────────────────────────────────────────────────────────
function LinkCard({ tile }: { tile: LinkTile }) {
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

// ─── Note ────────────────────────────────────────────────────────────────────
function NoteCard({ tile }: { tile: NoteTile }) {
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

// ─── Tile dispatcher ─────────────────────────────────────────────────────────
function Tile({ tile }: { tile: SiteData['tiles'][number] }) {
  switch (tile.type) {
    case 'profile': return <ProfileCard tile={tile} />
    case 'link':    return <LinkCard tile={tile} />
    case 'note':    return <NoteCard tile={tile} />
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    document.title = siteData.siteTitle
  }, [])

  return (
    <main className="min-h-dvh flex justify-center px-5 py-10 pb-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 [grid-auto-rows:clamp(110px,38vw,160px)] sm:[grid-auto-rows:clamp(130px,17vw,175px)] [grid-auto-flow:dense] gap-3 sm:gap-3.5 w-full max-w-[900px] content-start">
        {siteData.tiles.map((tile, i) => (
          <Tile key={i} tile={tile} />
        ))}
      </div>
    </main>
  )
}
