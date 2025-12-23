import { useState } from 'react';
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern'/>

      <div className="wrapper">
        <header>
          <img src="./images/favicon.png" alt="logo" />
          <h1 className='self-edited'>Marquee Movies</h1>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h2>{searchTerm}</h2>
      </div>
    </main>
  )
}

export default App 