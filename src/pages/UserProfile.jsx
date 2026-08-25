import React, { useState } from 'react'
import Profile from '../components/profile/Profile';
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ChangePass from '../components/profile/ChangePass';
import OrderList from '../components/profile/OrderList';

const UserProfile = () => {
        const [currentTab, setCurrentTab] = useState('Personal information');
    const [collapsed, setCollapsed] = useState(false);

  return (
  <div class="min-h-screen flex ">
    <ProfileSidebar collapsed = {collapsed} currentTab = {currentTab}  setCurrentTab = {setCurrentTab}  setCollapsed = {setCollapsed} />
    <div className='py-10 flex-1 md:px-6 md:mx-1 sm:ms-0 ms-20 overflow-hidden'>
       {currentTab === 'Personal information' && <Profile />} 
      { currentTab === 'Change password' && <ChangePass /> }
      {currentTab === 'Orders' && <OrderList /> } 
  </div> 
    </div>
  )}

export default UserProfile