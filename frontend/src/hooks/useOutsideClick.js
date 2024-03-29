import { useEffect, useCallback, useRef } from 'react'

const useOutsideClick = onClick => {
  const ref = useRef(null)

  const handleClick = useCallback(
    event => {
      const inside = ref.current.contains(event.target)
      if (inside) return

      onClick()
    },
    [onClick, ref]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return ref
}

export default useOutsideClick
