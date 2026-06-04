import { useEffect } from 'react'
import rawData from './data.json'
import { siteDataSchema, type SiteData } from './schema.ts'
import { Tile } from './components/Tile.tsx'
import './App.css'

const parseResult = siteDataSchema.safeParse(rawData)
if (!parseResult.success) {
  console.error('data.json validation errors:', parseResult.error.issues)
  throw new Error('data.json の形式が正しくありません。コンソールを確認してください。')
}
const siteData: SiteData = parseResult.data

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
