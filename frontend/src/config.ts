const url =
  import.meta.env.VITE_PROD === 'true'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:4000/graphql'

export default url
