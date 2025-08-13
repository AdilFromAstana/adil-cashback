import React from "react";

const styles = {
  messageBase: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },
  inviteMessage: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#f0f7ff",
    border: "1px solid #b3d4ff",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  successMessage: { backgroundColor: "#e8f5e9", color: "#2e7d32" },
  errorMessage: { backgroundColor: "#ffebee", color: "#c62828" },
} as const;

export const InviteBanner: React.FC<{
  shopInfo: { name: string; loading: boolean };
}> = ({ shopInfo }) => {
  if (shopInfo.loading) {
    return (
      <div style={styles.inviteMessage}>Загрузка информации о магазине...</div>
    );
  }
  if (!shopInfo.name) {
    return null;
  }
  return (
    <div style={styles.inviteMessage}>
      Вы приглашены магазином <br /> <strong>"{shopInfo.name}"</strong>
    </div>
  );
};

export const FormMessages: React.FC<{
  formState: { error: string };
  apiState: { success: string; error: string };
}> = ({ formState, apiState }) => (
  <>
    {formState.error && (
      <p style={{ ...styles.messageBase, ...styles.errorMessage }}>
        {formState.error}
      </p>
    )}
    {apiState.success && (
      <p style={{ ...styles.messageBase, ...styles.successMessage }}>
        {apiState.success}
      </p>
    )}
    {apiState.error && (
      <p style={{ ...styles.messageBase, ...styles.errorMessage }}>
        {apiState.error}
      </p>
    )}
  </>
);
