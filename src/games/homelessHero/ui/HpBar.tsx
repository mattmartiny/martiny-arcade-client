type Props = {
    current: number
    max: number
    color?: string
}

export function HpBar({ current, max, }: Props) {

    const percent = Math.max(0, Math.min(100, (current / max) * 100))
    let color = "#4caf50"

    if (percent < 50) color = "#fbc02d"
    if (percent < 25) color = "#e53935"
    return (
        <div style={{
            width: "100%",
            height: "14px",
            backgroundColor: "#222",
            border: "1px solid #555",
            borderRadius: "4px",
            overflow: "hidden"
        }}>
            <div
                style={{
                    width: `${percent}%`,
                    height: "100%",
                    backgroundColor: color,
                    transition: "width 0.25s ease"
                }}
            />
        </div>
    )
}