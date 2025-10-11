import fs from 'node:fs'
import path from 'node:path'

import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filename, prefix } = req.query

  const decoredPrefix = typeof prefix === 'string' ? decodeURIComponent(prefix as string)+'/' : '';

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'Invalid filename' })
  }

  // 지원하는 이미지 확장자 목록
  const supportedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg']

  // public 폴더 경로
  const publicDir = path.join(process.cwd(), 'public')

  // 각 확장자를 시도
  for (const ext of supportedExtensions) {
    const filePath = path.join(publicDir, `${decoredPrefix}${filename}.${ext}`)

    // 파일이 존재하는지 확인
    if (fs.existsSync(filePath)) {
      // MIME 타입 설정
      const mimeTypes: Record<string, string> = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        webp: 'image/webp',
        gif: 'image/gif',
        svg: 'image/svg+xml'
      }

      const mimeType = mimeTypes[ext] || 'application/octet-stream'

      // 파일 읽기
      const fileBuffer = fs.readFileSync(filePath)

      // 응답 헤더 설정
      res.setHeader('Content-Type', mimeType)
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

      // 이미지 반환
      return res.status(200).send(fileBuffer)
    }
  }

  // 파일을 찾지 못한 경우
  return res.status(404).json({ error: 'Image not found' })
}

