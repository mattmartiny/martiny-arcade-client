type Props = {
    status: "idle" | "saving" | "saved" | "error";
};

export function SavingOverlay({ status }: Props) {
    if (status === "idle") return null;

    let text = "";

    if (status === "saving") text = "Saving...";
    if (status === "saved") text = "Saved ✓";
    if (status === "error") text = "Save failed ❌";

    return (
        <div style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "10px 16px",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            borderRadius: 8,
            fontSize: 14,
            zIndex: 9999,
            transition: "opacity 0.3s ease"
        }}>
            {text}
        </div>
    );
}