import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <h1>관리자 헤더</h1>
      <Outlet />
      <h1>관리자 푸터</h1>
    </div>
  )
}

export default AdminLayout;