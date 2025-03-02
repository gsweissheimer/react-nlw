import HighlightText from 'components/highlightText/highlightText';

const Event = () => {
  return (
        <>
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
        </>
  );
};

export default Event;
