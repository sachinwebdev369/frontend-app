import React, { useState } from 'react' 
import TopHeader from '../components/admin/Layout/TopHeader'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/Layout/AdminSidebar'

const AdminProtectedRoutes = () => {
      const [currentPage, setCurrentPage] = useState('dashboard')
      const [collapsed, setCollapsed] = useState(true)

  return (
     <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-neutral-200 ms-20 sm:ms-0'>  
    <div className='flex relative overflow-hidden h-screen'>
      <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} collapsed={collapsed} onToggle={()=> setCollapsed(!collapsed)} /> 
      <div className='flex-1 bg-transparent overflow-y-auto'>
        <TopHeader onToggle={()=> setCollapsed(!collapsed)} />
        <main className='overflow-y-auto'>
          <div>
            <Outlet/> 
          </div>
        </main>
      </div>
    </div>
    </div>
  )}

export default AdminProtectedRoutes
