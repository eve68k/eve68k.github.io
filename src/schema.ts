import { z } from 'zod'

// ─── グリッドサイズ ─────────────────────────────────────────────────────────
// "列x行" の形式: "1x1" | "2x1" | "1x2" | "2x2"
export const tileSizeSchema = z.enum(['1x1', '2x1', '1x2', '2x2'])
export type TileSize = z.infer<typeof tileSizeSchema>

// ─── タイル種別 ─────────────────────────────────────────────────────────────

// プロフィールカード
const profileTileSchema = z.object({
  type: z.literal('profile'),
  size: tileSizeSchema,
  name: z.string().min(1),       // 表示名
  handle: z.string().optional(), // @username など
  bio: z.string().optional(),
  avatar: z.string().nullable().optional(), // 画像URL or null で頭文字表示
  bg: z.string().optional(),     // 背景色 (CSS color)
})

// リンクカード
const linkTileSchema = z.object({
  type: z.literal('link'),
  size: tileSizeSchema,
  name: z.string().min(1),  // 表示名
  url: z.string().min(1),   // リンク (https:// / mailto: / tel: など)
  icon: z.string().optional(),
  bg: z.string().optional(),
  fg: z.string().optional(), // 文字・アイコン色
})

// テキストメモカード
const noteTileSchema = z.object({
  type: z.literal('note'),
  size: tileSizeSchema,
  name: z.string().min(1),      // 表示するテキスト
  emoji: z.string().optional(),
  bg: z.string().optional(),
  fg: z.string().optional(),
})

// ─── ユニオン ───────────────────────────────────────────────────────────────
export const tileSchema = z.discriminatedUnion('type', [
  profileTileSchema,
  linkTileSchema,
  noteTileSchema,
])

export type Tile = z.infer<typeof tileSchema>
export type ProfileTile = z.infer<typeof profileTileSchema>
export type LinkTile = z.infer<typeof linkTileSchema>
export type NoteTile = z.infer<typeof noteTileSchema>

// ─── サイト全体 ─────────────────────────────────────────────────────────────
export const siteDataSchema = z.object({
  siteTitle: z.string().min(1),
  tiles: z.array(tileSchema).min(1),
})

export type SiteData = z.infer<typeof siteDataSchema>
