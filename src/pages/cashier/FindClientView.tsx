import React from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";

type FindClientViewProps = {
  phone: string;
  onPhoneChange: (value: string) => void;
  onFindByPhone: () => void;
  onShowScanner: () => void;
  showScanner: boolean;
};

const styles = {
  scannerRegion: {
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto",
    border: "1px solid #ccc",
  },
};

export const FindClientView: React.FC<FindClientViewProps> = ({
  phone,
  onPhoneChange,
  onFindByPhone,
  onShowScanner,
  showScanner,
}) => {
  return (
    <div>
      <h2>Поиск клиента</h2>
      {showScanner ? (
        <>
          <div id="qr-scanner-region" style={styles.scannerRegion}></div>
          <Button onClick={onShowScanner} type="secondary">
            Отмена
          </Button>
        </>
      ) : (
        <>
          <Input
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
          <Button onClick={onFindByPhone} type="secondary">
            Найти по номеру
          </Button>
          <p style={{ margin: "20px 0" }}>или</p>
          <Button onClick={onShowScanner}>Сканировать QR-код</Button>
        </>
      )}
    </div>
  );
};
