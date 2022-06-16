import '@testing-library/jest-dom'
import { testRenderer } from '../../utils/test-util'
import DetailCard from './DetailCard'
import DetailsCount from './DetailsCount'

describe('DetailCard', () => {
  const renderPage = testRenderer(
    <DetailCard logo={''} title={''} amount={''} />,
  )
  it(' Checks if DetailCard renders correctly', async () => {
    renderPage()
  })
})

describe('DetailsCount', () => {
  const renderPage = testRenderer(<DetailsCount detailCards={[]} />)
  it('Checks if DetailsCount renders correctly', async () => {
    renderPage()
  })
})
