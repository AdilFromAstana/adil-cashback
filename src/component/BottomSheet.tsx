// src/components/BottomSheet.tsx

import React from "react";

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1000,
    transition: "opacity 0.3s ease-in-out",
  },
  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    padding: "20px",
    paddingBottom: "40px",
    zIndex: 1001,
    transition: "transform 0.3s ease-in-out",
    transform: "translateY(100%)",
  },
  sheetOpen: {
    transform: "translateY(0)",
  },
  closeBar: {
    width: "40px",
    height: "5px",
    backgroundColor: "#ccc",
    borderRadius: "3px",
    margin: "0 auto 20px auto",
  },
};

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <div
        style={{
          ...styles.overlay,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={onClose}
      ></div>
      <div style={{ ...styles.sheet, ...(isOpen && styles.sheetOpen) }}>
        <div style={styles.closeBar} onClick={onClose}></div>
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
