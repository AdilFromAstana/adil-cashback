// src/pages/SettingsPage.tsx

import React from "react";
import Button from "../component/Button";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  settingItem: {
    padding: "15px 0",
    borderBottom: "1px solid #eee",
    fontSize: "18px",
  },
};

type SettingsPageProps = {
  onBack: () => void;
};

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Настройки</h1>

      <div style={styles.settingItem}>Сменить пароль</div>
      <div style={styles.settingItem}>Уведомления</div>
      <div style={styles.settingItem}>Язык</div>

      <div style={{ marginTop: "40px" }}>
        <Button onClick={onBack} type="secondary">
          Назад
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
