import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import DetailCard from './DetailCard'

interface DetailCardProps {
  logo: string
  title: string
  amount: number
}

interface DetailsProps {
  detailCards: DetailCardProps[]
}

export default function DetailsCount({ detailCards }: DetailsProps) {
  return (
    <Box>
      <Grid container spacing={2}>
        {detailCards.map((detailCard) => (
          <Grid item xs={3}>
            <DetailCard
              logo={detailCard.logo}
              title={detailCard.title}
              amount={detailCard.amount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
