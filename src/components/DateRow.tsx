import React from 'react';

interface Holiday {
  date: string; // 'YYYY-MM-DD'
  name: string;
}

interface DateCellProps {
  date: Date;
  today: Date;
  holidays: Holiday[];
}

const HOLIDAYS_KR_2025: Holiday[] = [
  { date: '2025-01-01', name: '신정' },
  { date: '2025-01-28', name: '설날 연휴' },
  { date: '2025-01-29', name: '설날' },
  { date: '2025-01-30', name: '설날 연휴' },
  { date: '2025-03-01', name: '삼일절' },
  { date: '2025-05-05', name: '어린이날' },
  { date: '2025-05-25', name: '부처님 오신 날' },
  { date: '2025-06-06', name: '현충일' },
  { date: '2025-08-15', name: '광복절' },
  { date: '2025-10-03', name: '개천절' },
  { date: '2025-10-05', name: '추석 연휴' },
  { date: '2025-10-06', name: '추석' },
  { date: '2025-10-07', name: '추석 연휴' },
  { date: '2025-10-09', name: '한글날' },
  { date: '2025-12-25', name: '크리스마스' },
];

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const DateCell: React.FC<DateCellProps> = ({ date, today, holidays }) => {
  const ymd = toYMD(date);
  const holiday = holidays.find(h => h.date === ymd);
  const isToday = isSameDay(date, today);
  const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isHoliday = !!holiday;

  let bg = '';
  let textColor = '#374151';
  let fontWeight: React.CSSProperties['fontWeight'] = 'normal';

  if (isToday) {
    bg = '#dbeafe';
    textColor = '#1d4ed8';
    fontWeight = 600;
  } else if (isHoliday) {
    bg = '#fee2e2';
    textColor = '#dc2626';
    fontWeight = 600;
  } else if (isWeekend) {
    bg = '#fef2f2';
    textColor = '#dc2626';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: 30,
        minWidth: 30,
        height: 42.664,
        backgroundColor: bg || undefined,
        borderRight: '1px solid #e5e7eb',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 9,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          fontWeight,
          lineHeight: '16px',
          color: textColor,
          whiteSpace: 'nowrap',
        }}
      >
        {date.getDate()}
      </span>
      {holiday && (
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 0,
            width: 29,
            height: 10.664,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0.5,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Inter, "Noto Sans KR", sans-serif',
              fontSize: 8,
              fontWeight: 'normal',
              lineHeight: '10.667px',
              color: '#dc2626',
              whiteSpace: 'nowrap',
              letterSpacing: '0.2057px',
            }}
          >
            {holiday.name}
          </span>
        </div>
      )}
    </div>
  );
};

interface DateRowProps {
  startDate?: Date;
  days?: number;
  holidays?: Holiday[];
}

const DateRow: React.FC<DateRowProps> = ({
  startDate,
  days = 90,
  holidays = HOLIDAYS_KR_2025,
}) => {
  const today = new Date();
  const start = startDate ?? (() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 7);
    return d;
  })();

  const dates: Date[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        width: '100%',
      }}
    >
      {dates.map((date) => (
        <DateCell
          key={toYMD(date)}
          date={date}
          today={today}
          holidays={holidays}
        />
      ))}
    </div>
  );
};

export default DateRow;
export type { Holiday, DateRowProps };
