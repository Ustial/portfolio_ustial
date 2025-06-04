// src/pages/index.tsx
import { NextPage } from 'next';
import { PolychromeCard } from '../components/PolychromeCard';

const Home: NextPage = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111', // тёмный фон для контраста
      }}
    >
      <div style={{ width: 300, height: 400 }}>
        <PolychromeCard />
      </div>
    </div>
  );
};

export default Home;
