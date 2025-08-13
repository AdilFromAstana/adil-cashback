import React, { useState, useEffect } from "react";
import BottomSheet from "../../component/BottomSheet";
import Arrow from "../../component/Arrow";

function formatDateToDayMonth(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("ru-RU", { day: "numeric", month: "long" });
}

// Форматирует диапазон дат в "1 августа — 9 августа"
function formatRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDayMonth = startDate.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
  });
  const endDayMonth = endDate.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  // Если месяц совпадает — выводим "1 — 9 августа"
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDate.getDate()} — ${endDayMonth}`;
  }

  // Иначе полный формат "1 августа — 10 сентября"
  return `${startDayMonth} — ${endDayMonth}`;
}

interface Props {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const presets = [
  { label: "1 неделя", days: 7 },
  { label: "1 месяц", days: 30 },
  { label: "2 месяца", days: 60 },
  { label: "3 месяца", days: 90 },
  { label: "Полгода", days: 182 },
  { label: "Год", days: 365 },
];

// Вспомогательная функция для получения даты назад от today
const getDateDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};

const DateRangePicker: React.FC<Props> = ({ startDate, endDate, onChange }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // При выборе пресета обновляем даты и selectedPreset
  const applyPreset = (presetLabel: string, days: number) => {
    const newEnd = new Date().toISOString().slice(0, 10);
    const newStart = getDateDaysAgo(days);
    setLocalStart(newStart);
    setLocalEnd(newEnd);
    setSelectedPreset(presetLabel);
  };

  const applyDates = () => {
    setIsPickerOpen(false);
    onChange(localStart, localEnd);
  };

  // Если снаружи меняются даты, синхронизируем локальный стейт
  useEffect(() => {
    setLocalStart(startDate);
    setLocalEnd(endDate);
    // Проверяем, соответствует ли текущий диапазон одному из пресетов,
    // чтобы выставить selectedPreset или сбросить
    const today = new Date().toISOString().slice(0, 10);
    if (endDate !== today) {
      setSelectedPreset(null);
      return;
    }
    const diffDays =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    const matchedPreset = presets.find(({ days }) => days === diffDays);
    setSelectedPreset(matchedPreset ? matchedPreset.label : null);
  }, [startDate, endDate]);

  return (
    <div>
      <button
        style={{
          padding: "8px 12px",
          border: "2px solid #d4af37",
          borderRadius: "10px",
          background: "transparent",
          cursor: "pointer",
          width: "100%",
          color: "#d4af37",
          fontSize: 20,
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => setIsPickerOpen(true)}
      >
        <span>
          {startDate && endDate
            ? formatRange(startDate, endDate)
            : "Выбрать даты"}
        </span>
        <Arrow color="#d4af37" />
      </button>

      {isPickerOpen && (
        <BottomSheet
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          height="80svh"
        >
          <div
            style={{
              lineHeight: 1,
              fontSize: "24px",
              borderBottom: "2px solid #d4af37",
              paddingBottom: 10,
            }}
          >
            Выберите период
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {presets.map(({ label, days }) => (
              <label
                key={label}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                <input
                  type="radio"
                  name="date-preset"
                  value={label}
                  checked={selectedPreset === label}
                  onChange={() => applyPreset(label, days)}
                  style={{
                    width: 24,
                    height: 24,
                    accentColor: "#d4af37",
                    cursor: "pointer",
                    margin: 0,
                  }}
                />
                {label}
              </label>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <button
              onClick={() => setIsPickerOpen(false)}
              style={{
                flex: 1,
                padding: "10px",
                background: "#ccc",
                border: "none",
                borderRadius: "10px",
                fontSize: 16,
              }}
            >
              Отмена
            </button>
            <button
              onClick={applyDates}
              style={{
                flex: 1,
                padding: "10px",
                background: "#d4af37",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Применить
            </button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default DateRangePicker;
