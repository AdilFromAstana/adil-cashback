import React, { useEffect, useRef } from "react";
import Button from "../../component/Button";
import "react-phone-input-2/lib/style.css";
import QrScanner from "qr-scanner";

type FindClientViewProps = {
  phone: string;
  onPhoneChange: (value: string) => void;
  onFindByPhone: () => void;
  showScanner: boolean;
  setShowScanner: (value: boolean) => void;
  onWalletDetected: (walletId: number) => void;
};

const styles = {
  scannerRegion: {
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: 8,
  },
};

export const FindClientView: React.FC<FindClientViewProps> = ({
  // phone,
  // onPhoneChange,
  onFindByPhone,
  showScanner,
  setShowScanner,
  onWalletDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (!showScanner) return;

    const initScanner = async () => {
      if (!videoRef.current) return;

      scannerRef.current = new QrScanner(
        videoRef.current,
        async (result) => {
          try {
            const parsed = JSON.parse(result.data);
            if (parsed.walletId) {
              onWalletDetected(parsed.walletId);
              setShowScanner(false);
              scannerRef.current?.stop();
            }
          } catch (err) {
            console.log("QR не содержит walletId", err);
          }
        },
        { highlightScanRegion: true, highlightCodeOutline: true }
      );

      try {
        await scannerRef.current.start();
      } catch (err) {
        console.error("Ошибка доступа к камере", err);
      }
    };

    initScanner();

    return () => {
      scannerRef.current?.stop();
    };
  }, [showScanner, onWalletDetected, setShowScanner]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Поиск клиента</h2>

      {showScanner ? (
        <>
          <video ref={videoRef} style={styles.scannerRegion} />
          <Button onClick={() => setShowScanner(false)} type="secondary">
            Отмена
          </Button>
        </>
      ) : (
        <>
          {/* Пример PhoneInput закомментирован */}
          {/* <PhoneInput ... /> */}
          <Button onClick={onFindByPhone} type="secondary">
            Найти по номеру
          </Button>
          <div style={{ margin: "10px 0" }}>или</div>
          <Button onClick={() => setShowScanner(true)}>
            Сканировать QR-код
          </Button>
        </>
      )}
    </div>
  );
};
