import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
      <h1>유저 헤더</h1>
      <Outlet />
      <h1>유저 푸터</h1>
    </div>
  )
}

export default UserLayout;