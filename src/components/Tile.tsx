import type { SiteData } from '../schema.ts'
import { ProfileCard } from './ProfileCard.tsx'
import { LinkCard } from './LinkCard.tsx'
import { NoteCard } from './NoteCard.tsx'

type TileProps = { tile: SiteData['tiles'][number] }

export function Tile({ tile }: TileProps) {
  switch (tile.type) {
    case 'profile': return <ProfileCard tile={tile} />
    case 'link':    return <LinkCard tile={tile} />
    case 'note':    return <NoteCard tile={tile} />
  }
}
