import React from "react";
import Button from "../../component/Button";
import Divider from "../../component/Divider";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
          <PhoneInput
            country={"kz"} // Устанавливаем Казахстан по умолчанию
            countryCodeEditable={false}
            alwaysDefaultMask={true}
            disableDropdown
            value={phone}
            onChange={onPhoneChange} // Библиотека сама передает отформатированную строку
            inputStyle={{
              height: "50px",
              width: "100%",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
            onlyCountries={["kz"]}
            buttonStyle={{
              border: "1px solid #ccc",
              borderRadius: "8px 0 0 8px",
            }}
            containerStyle={{
              marginBottom: "15px",
            }}
            placeholder="Номер телефона"
          />
          <Button onClick={onFindByPhone} type="secondary">
            Найти по номеру
          </Button>
          <Divider>или</Divider>
          <Button onClick={onShowScanner}>Сканировать QR-код</Button>
        </>
      )}
    </div>
  );
};
