import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Movie Library</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-yellow-500">New Movies</a></li>
          <li><a href="#" className="hover:text-yellow-500">TV Series</a></li>
          <li><a href="#" className="hover:text-yellow-500">Search</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;