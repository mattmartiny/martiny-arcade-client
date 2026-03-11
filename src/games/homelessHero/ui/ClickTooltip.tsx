import { useRef, useEffect } from "react"

type Props = {
  id: string
  label: React.ReactNode
  children: React.ReactNode
  openTooltip: string | null
  setOpenTooltip: (id: string | null) => void
}

export function ClickTooltip({
  id,
  label,
  children,
  openTooltip,
  setOpenTooltip
}: Props) {

  const ref = useRef<HTMLDivElement>(null)

  const open = openTooltip === id

  function toggle(e: React.MouseEvent) {
    e.stopPropagation()
    setOpenTooltip(open ? null : id)
  }

  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) {
        setOpenTooltip(null)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => document.removeEventListener("click", handleClickOutside)

  }, [setOpenTooltip])

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span onClick={toggle} style={{ cursor: "pointer" }}>
        {label}
      </span>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "-120%",
            left: "150%",
            zIndex: 999,
            background: "#111",
            color: "white",
            border: "1px solid #555",
            padding: "10px",
            borderRadius: "6px",
            width: "220px",
            fontSize: ".8rem",
            boxShadow: "0 0 6px rgba(0,0,0,.6)"
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}