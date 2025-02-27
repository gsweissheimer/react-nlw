import HighlightText from 'components/highlightText/highlightText';

const Event = () => {
  return (

    <div className="dash-box quarter">
        <HighlightText type='secondary'>Lembretes</HighlightText>
        {(() => {
          const today = new Date();
          today.setDate(today.getDate() + 3);
          return <p>{today.toLocaleDateString()} Exame</p>;
        })()}
        {(() => {
          const today = new Date();
          today.setDate(today.getDate() + 10);
          return <p>{today.toLocaleDateString()} Reconsulta</p>;
        })()}
    </div>
  );
};

export default Event;
