type InputProps = React.ComponentPropsWithoutRef<"input">;

const FloatingInput = ({ label, ...props }: { label: string } & InputProps) => {
  return (
    <div style={{ marginTop: props.value ? 20 : 0, position: "relative" }}>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "12px 15px",
          border: "1px solid #d4af37",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: props.value ? "4px" : "15px",
          top: props.value ? "-20px" : "10px",
          fontSize: props.value ? "12px" : "16px",
          color: "#d4af37",
          backgroundColor: "transparent", // фон формы
          padding: props.value ? "0 4px" : "0",
          transition: "all 0.2s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default FloatingInput;
