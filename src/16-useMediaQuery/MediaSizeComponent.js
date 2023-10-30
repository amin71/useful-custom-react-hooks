import useMedidaSize from "./useMediaSize"

export default function MediaQueryComponent() {
  const media = useMedidaSize()
    let data=[]
    for(const [key, value] of Object.entries(media)) 
      data.push(`${key}: ${value}`)
console.log(data)
  return  <>
  {data?.map(item=>(<p>{item}</p>))}
  </>
}
