import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
  Avatar,
  Tooltip,
  MenuItem,
  Divider
} from '@mui/material'
import { deepOrange } from '@mui/material/colors';
import { useRouter } from 'next/router'
import { logoutService } from '@frontend/services/authService'
import { getProfileService } from '@frontend/services/userService'

type CurrentUser = {
  email: string
  name?: string
}

const Header = () => {
  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [currentUser, setCurrentUser] = useState<null | CurrentUser>(null)

  useEffect(() => {
    getProfileService()
      .then(resp => {
        setCurrentUser(resp.data)
      }).catch(err => {
        console.log({ err })
      })
  }, [])

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onHandleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    logoutService()
      .then(() => {
        router.push('/login')
      }).catch(err => {
        if (err.response.status >= 400) {
          localStorage.removeItem('accessToken')
          router.push('/login')
        }
      })
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { lg: 'flex' } }}
          >
            Trello clone
          </Typography>
          <Box sx={{ flexGrow: 1, display: { lg: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={handleOpenUserMenu}>
              <Avatar alt={'currentUser'} sx={{ width: 40, height: 40, bgcolor: deepOrange[500] }}>
                {currentUser?.name?.[0] || currentUser?.email?.[0]}
              </Avatar>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <Typography style={{padding: "6px 16px"}} textAlign='center'>{currentUser?.email || currentUser?.name}</Typography>

              <Divider />

              <MenuItem onClick={() => router.push('/boards')}>
                <Typography textAlign='center' variant="body2">Boards management</Typography>
              </MenuItem>
              <MenuItem onClick={onHandleLogout}>
                <Typography textAlign='center'  variant="body2">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
