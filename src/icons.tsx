import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Twitch,
  Globe,
  Mail,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  github:    Github,
  x:         Twitter,
  twitter:   Twitter,
  instagram: Instagram,
  linkedin:  Linkedin,
  youtube:   Youtube,
  twitch:    Twitch,
  globe:     Globe,
  mail:      Mail,
}

export function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const Comp = iconMap[name] ?? Globe
  return <Comp size={size} aria-hidden="true" />
}
