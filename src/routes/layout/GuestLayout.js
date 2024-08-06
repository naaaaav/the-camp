import { Outlet } from 'react-router-dom'

const GuestLayout = () => {
  return (
    <div>
      <h1>게스트 헤더</h1>
      <Outlet />
      <h1>게스트 푸터</h1>
    </div>
  )
}

export default GuestLayout;