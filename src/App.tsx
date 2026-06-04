import { useEffect } from 'react'
import rawData from './data.json'
import { siteDataSchema, type SiteData, type ProfileTile, type LinkTile, type NoteTile } from './schema.ts'
import { Icon } from './icons.tsx'
import './App.css'

// data.json をZodでバリデーション。不正なデータの場合は起動時にエラーを投げる。
const parseResult = siteDataSchema.safeParse(rawData)
if (!parseResult.success) {
  console.error('data.json validation errors:', parseResult.error.issues)
  throw new Error('data.json の形式が正しくありません。コンソールを確認してください。')
}
const siteData: SiteData = parseResult.data

// "2x1" → { cols: 2, rows: 1 }
function parseSize(size: string) {
  const [cols, rows] = size.split('x').map(Number)
  return { cols: cols ?? 1, rows: rows ?? 1 }
}

function sizeClasses(size: string) {
  const { cols, rows } = parseSize(size)
  return `col-${cols} row-${rows}`
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
      className={`tile tile-profile ${sizeClasses(tile.size)}`}
      style={tile.bg ? { backgroundColor: tile.bg } : undefined}
    >
      <div className="profile-avatar">
        {tile.avatar ? (
          <img src={tile.avatar} alt={tile.name} />
        ) : (
          <span className="profile-avatar-initials">{initials}</span>
        )}
      </div>
      <p className="profile-name">{tile.name}</p>
      {tile.handle && <p className="profile-handle">{tile.handle}</p>}
      {tile.bio && <p className="profile-bio">{tile.bio}</p>}
    </div>
  )
}

// ─── Link ────────────────────────────────────────────────────────────────────
function LinkCard({ tile }: { tile: LinkTile }) {
  const isExternal = !tile.url.startsWith('mailto:') && !tile.url.startsWith('tel:')
  const { cols } = parseSize(tile.size)

  return (
    <a
      href={tile.url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`tile tile-link ${sizeClasses(tile.size)}`}
      style={{
        backgroundColor: tile.bg ?? '#18181b',
        color: tile.fg ?? '#ffffff',
      }}
      aria-label={tile.name}
    >
      {tile.icon && (
        <div className="link-icon">
          <Icon name={tile.icon} size={cols >= 2 ? 36 : 30} />
        </div>
      )}
      <div className="link-body">
        {tile.icon && <span className="link-label">{tile.icon}</span>}
        <span className="link-name">{tile.name}</span>
      </div>
    </a>
  )
}

// ─── Note ────────────────────────────────────────────────────────────────────
function NoteCard({ tile }: { tile: NoteTile }) {
  return (
    <div
      className={`tile tile-note ${sizeClasses(tile.size)}`}
      style={{
        backgroundColor: tile.bg ?? '#fef9c3',
        color: tile.fg ?? '#713f12',
      }}
    >
      {tile.emoji && <span className="note-emoji">{tile.emoji}</span>}
      <p className="note-text">{tile.name}</p>
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
    <main className="page">
      <div className="bento-grid">
        {siteData.tiles.map((tile, i) => (
          <Tile key={i} tile={tile} />
        ))}
      </div>
    </main>
  )
}
