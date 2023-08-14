import { _media } from "app/apis";
import { Media } from "app/models";
import { ChangeEvent, useState } from "react";

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  resetOriginalResult?: boolean
}

export function useMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, resetOriginalResult }: PostType) => {
    if (e.target.files) {
      setIsLoading(true)
      let tempImages: Media[] = []
      for (var j = 0; j < e.target.files?.length; j++) {
        const item: Media = {
          id: -j,
          original_url: URL.createObjectURL(e.target.files[j]),
          mime_type: e.target.files[j].type
        }
        tempImages.push(item)
      }
      if (callBack) { callBack(tempImages) }
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia: Media = {
            id: i,
            original_url: URL.createObjectURL(fileItem),
            mime_type: e.target.files[i].type
          }
          formData.append('file', fileItem)
          const res = await _media.create(formData)
          if (res.context) {
            resMedia = {
              ...resMedia,
              id: res.context.id,
              original_url: resetOriginalResult ? res.context.original_url : resMedia.original_url
            }
          }
          mediaList.push(resMedia)
        }
        setMedias(mediaList)
        setIsLoading(false)
        if (callBack) {
          callBack(mediaList)
        }
      } catch (error) {

      }
    }
  }
  return {
    medias,
    handlePostMedia,
    isLoading
  }
}