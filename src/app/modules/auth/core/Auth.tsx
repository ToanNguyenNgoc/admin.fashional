import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import * as authHelper from './AuthHelpers'
import { WithChildren } from '../../../../_metronic/helpers'
import { _auth } from 'app/apis'
import { User, UserRole } from 'app/models'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, TOKEN_EXPERTED_AT } from 'app/constants'

type AuthContextProps = {
  auth: User | undefined
  saveAuth: (auth: User | undefined) => void
  currentUser: User | undefined
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>
  logout: () => void,
  roles: UserRole[]
  setRoles: Dispatch<SetStateAction<UserRole[]>>
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  roles: [],
  setRoles: () => { }
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<User | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [roles, setRoles] = useState<UserRole[]>([])
  const saveAuth = (auth: User | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = async () => {
    await _auth.logout()
    saveAuth(undefined)
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(TOKEN_EXPERTED_AT)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout, roles, setRoles }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { logout, setCurrentUser, setRoles } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { context } = await _auth.profile()
          const { context: contextRoles } = await _auth.roles()
          if (context) {
            setCurrentUser(context)
          }
          if (contextRoles) {
            setRoles(contextRoles.data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
      return () => (didRequest.current = true)
    }

    if (Cookies.get(ACCESS_TOKEN)) {
      // console.log(auth)
      requestUser()
    } else {
      logout()
      setShowSplashScreen(false)
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
