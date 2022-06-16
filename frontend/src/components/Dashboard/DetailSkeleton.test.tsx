import '@testing-library/jest-dom'
import { testRenderer } from '../../utils/test-util'
import DetailCard from './DetailSkeletonCard'
import DetailsSkeleton from './DetailsSkeleton'

describe('DetailCard', () => {
  const renderPage = testRenderer(<DetailCard logo={''} title={''} />)
  it('DetailCard renders correctly', async () => {
    renderPage()
  })
})

describe('DetailsCount', () => {
  const renderPage = testRenderer(<DetailsSkeleton detailCards={[]} />)
  it('DetailsCount renders correctly', async () => {
    renderPage()
  })
})
