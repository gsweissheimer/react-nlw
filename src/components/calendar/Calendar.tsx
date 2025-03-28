import React, { useState, useEffect } from 'react';
import style from './calendar.module.css';
import Button from 'components/button/button';
import HighlightText from 'components/highlightText/highlightText';
import Text from 'components/text/text';

// Função para gerar os dias do mês
const generateDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate(); // Número de dias no mês
    const firstDay = new Date(year, month - 1, 1).getDay(); // Dia da semana em que o mês começa
    const days = [];

    // Preenche os dias antes do primeiro dia com vazios
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    return days;
};

interface CalendarProps {
    year: number;
    month: number;
    actions: { date: string; description: string }[];
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ year, month, actions, setMonth, setYear }) => {
    const [days, setDays] = useState<(number | null)[]>([]);

    useEffect(() => {
        // Gerar os dias do mês sempre que o ano ou mês mudar
        setDays(generateDays(year, month));
    }, [year, month]);

    const renderEventsForDay = (day: number) => {
        // Filtra as ações que acontecem no dia atual
        const actionsForDay = actions.filter(action => {
            const actionDate = new Date(action.date);
            return actionDate.getDate() === day && actionDate.getMonth() === month - 1 && actionDate.getFullYear() === year;
        });

        return actionsForDay.map((action, index) => (
            <HighlightText key={index} type='headline' >• { action.description }</HighlightText>
        ));
    };

    const goToPreviousMonth = () => {
        if (month === 1) {
            setYear(year - 1); // Se for janeiro, volta para dezembro do ano anterior
            setMonth(12);
        } else {
            setMonth(month - 1);
        }
    };
    
    const goToNextMonth = () => {
        if (month === 12) {
            setYear(year + 1); // Se for dezembro, avança para janeiro do ano seguinte
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
    };
    
    return (
        <div className={style.calendar}>
            <div className={style.calendarHeader}>
            <Button onclick={goToPreviousMonth} type="circle">{"<"}</Button>
            <HighlightText type='secondary' className={style.noMargin}>{`${month} / ${year}`}</HighlightText>
            <Button onclick={goToNextMonth} type="circle">{">"}</Button>
            </div>

            <div className={style.calendarGrid}>
            {days.map((day, index) => (
                <div key={index} className={`${style.calendarDay} ${day ? '' : style.empty} ${actions.some(action => {
                const actionDate = new Date(action.date);
                return actionDate.getDate() === day && actionDate.getMonth() === month - 1 && actionDate.getFullYear() === year;
                }) ? style.hasActions : ''}`}>
                {day && (
                    <>
                    <Text type='primary'>{day}</Text>
                    <div className={style.actionsForDay}>
                        {renderEventsForDay(day)}
                    </div>
                    </>
                )}
                </div>
            ))}
            </div>
        </div>
    );
};

export default Calendar;
