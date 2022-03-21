import { Navigate } from 'react-router-dom'

const AuthGuard = ({ user, children, redirectPath = '/signin' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default AuthGuard
