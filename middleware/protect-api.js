export default function ({ route, redirect }) {
  if (route.fullPath.startsWith('/api')) redirect('/')
}
