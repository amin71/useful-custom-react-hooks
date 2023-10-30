import { useEffect, useRef } from "react"

export default function useShallowCompareEffect(callback, dependency) {
  const currentDependenciesRef = useRef()
  
  if (currentDependenciesRef.current!=dependency) {
    currentDependenciesRef.current = dependency
  }

  useEffect(callback, [currentDependenciesRef.current])
}
