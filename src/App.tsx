import DateRow from './components/DateRow';

function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#111827' }}>
        Roadmap
      </h1>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
        <DateRow days={90} />
      </div>
    </div>
  );
}

export default App;
