import { type Block } from 'notion-types'
import { defaultMapImageUrl } from 'notion-utils'

import { defaultPageCover, defaultPageIcon } from './config'
import { getCustomEmojiUrl, getCustomEmojiUrlDomain } from './get-icon-parameter-decording-url'

export const mapImageUrl = (url: string | undefined, block: Block) => {
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  /*
  가져올 수 없는 이미지 변환 로직 추가가
  */
  if (url) {
    const customEmojiUrlDomain = getCustomEmojiUrlDomain(url);
    if (customEmojiUrlDomain) {
      const customEmojiUrl = getCustomEmojiUrl(customEmojiUrlDomain);
      if (customEmojiUrl) {
        return customEmojiUrl
      }
    }
  }


  const mapedUrl = defaultMapImageUrl(url, block)

  return mapedUrl
}
