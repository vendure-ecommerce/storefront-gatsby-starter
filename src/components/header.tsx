import * as React from "react"
import { Link } from "gatsby"
import { SearchBar } from './search-bar';

const Header = ({ siteTitle }) => (
  <header>
    <div className='max-w-6xl mx-auto p-6 flex items-center space-x-4'>
      <h1>
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
        <SearchBar></SearchBar>
    </div>
  </header>
)

export default Header
