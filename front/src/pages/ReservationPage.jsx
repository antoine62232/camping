import ReservationForm from '../components/ReservationForm';

export default function ReservationPage() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Réservez votre hébergement</h1>
      <ReservationForm />
    </div>
  );
}