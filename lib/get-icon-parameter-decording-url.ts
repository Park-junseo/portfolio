import { apiHost } from "./config";

export function getIconParameterDecordingUrlMap(url: string): string | null {
  const decodedUrl = decodeURIComponent(url)
  
  // custom_emoji 뒤의 마지막 UUID 추출
  const match = decodedUrl.match(/custom_emoji\/[^/]+\/([^?]+)/)
  const lastUuid = match ? match[1] : null
  
  return lastUuid || null;
}

export function getCustomEmojiUrlDomain(url: string): string | null {
  const match = url.match(/notion:\/\/custom_emoji\/[^/]+\/([^?]+)/)
  return match ? match[1] ?? null : null
}

export function getCustomEmojiUrl(domain: string): string | null {
  return `${apiHost}/api/webimage/${domain}?prefix=custom_emoji`;
}