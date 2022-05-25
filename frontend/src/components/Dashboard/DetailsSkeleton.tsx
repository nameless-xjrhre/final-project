import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import DetailSkeletonCard from './DetailSkeletonCard'

interface DetailCardProps {
  logo: string
  title: string
  [key: string]: any
}

interface DetailsProps {
  detailCards: DetailCardProps[]
}

export default function DetailsSkeleton({ detailCards }: DetailsProps) {
  return (
    <Box>
      <Grid container spacing={2}>
        {detailCards.map((detailCard) => (
          <Grid item xs={3} key={detailCard.title}>
            <DetailSkeletonCard
              logo={detailCard.logo}
              title={detailCard.title}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
