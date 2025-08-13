import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import axios from "axios";

const CashierPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        // 1. Проверяем доступ к камере
        await navigator.mediaDevices.getUserMedia({ video: true });

        if (!videoRef.current) return;

        // 2. Инициализация сканера
        scannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            console.log("QR найден:", result.data);
            setScannedResult(result.data);
            handleSendRequest(result.data);
            scannerRef.current?.stop();
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        // 3. Запуск сканера
        await scannerRef.current.start();
        console.log("Камера запущена");
      } catch (err) {
        console.error("Ошибка доступа к камере", err);
        setError(
          "Не удалось получить доступ к камере. Разрешите доступ в браузере."
        );
      }
    };

    initScanner();

    return () => {
      scannerRef.current?.stop();
    };
  }, []);

  const handleSendRequest = async (qrValue: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/wallets/credit",
        {
          qrCode: qrValue,
          amount: 1000,
        }
      );
      console.log("Ответ сервера:", response.data);
    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Сканер QR</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <video
        ref={videoRef}
        style={{
          width: "100%",
          maxWidth: 400,
          border: "2px solid #ccc",
          borderRadius: 8,
        }}
      />

      {scannedResult && (
        <p>
          <strong>QR найден:</strong> {scannedResult}
        </p>
      )}
    </div>
  );
};

export default CashierPage;
