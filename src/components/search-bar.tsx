import * as React from "react"
import { SyntheticEvent, useEffect, useState } from "react"
import * as queryString from "query-string"
import { navigate } from "gatsby"

export function SearchBar() {
  const [query, setQuery] = useState("")
    const onInput = (value: string) => {
      setQuery(value);
      if (value === '') {
          navigate("/search", {})
      }
    }
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    navigate("/search?q=" + query, {})
  }
  return (
    <form onSubmit={onSubmit}>
      <input type='search' onInput={e => onInput((e.target as HTMLInputElement).value)}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </form>
  )
}
