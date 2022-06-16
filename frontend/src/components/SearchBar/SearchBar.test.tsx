import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { testRenderer } from '../../utils/test-util'
import SearchAppBar from './SearchBar'
import { HeaderType } from '../../types/enums'

describe('Search Bar', () => {
  const renderSearchBar = testRenderer(
    <SearchAppBar type={HeaderType.Patient} />,
  )

  it('Renders Searchbar correctly', () => {
    renderSearchBar()

    const searchBar = screen.getByRole('textbox', {
      name: /search/i,
    })
    expect(searchBar.innerHTML).toBe('')
    expect(searchBar).toContainHTML(
      'class="MuiInputBase-input css-yz9k0d-MuiInputBase-input"',
    )
    expect(searchBar).toContainHTML('Search')
    expect(searchBar).toContainHTML('text')
  })
})
