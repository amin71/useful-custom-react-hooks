import { useState, useEffect } from "react"
import useEventListener from "../13-useEventListener/useEventListener"
import useWindowSize from "../15-useWindowSize/useWindowSize"

const mediaList=[320,560,760,992,1200,1600]
const defaultMedia={isXs:false,isS:false,isM:false,isL:false,isXl:false}
export default function useMedidaSize() {
  const {width}=useWindowSize();
  const [media, setMedia] = useState(defaultMedia)
  useEffect(() => {
      if(width<mediaList[0]) setMedia({...defaultMedia,isXs:true})
      else if(width<mediaList[1]) setMedia({...defaultMedia,isS:true})
      else if(width<mediaList[2]) setMedia({...defaultMedia,isM:true})
      else if(width<mediaList[3])
    setMedia({...defaultMedia,isL:true})
      else if(width<mediaList[4]) setMedia({...defaultMedia,isXl:true})
  }, [width])


  return media
}
