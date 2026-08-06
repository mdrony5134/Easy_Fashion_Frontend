import { useGetMyOrdersQuery } from '@/redux/api/orderApi';
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/redux/api/userApi'
import React from 'react'

function Profile() {
    const {data: getMeData} = useGetMyProfileQuery({});
    const {data: myOrderData} = useGetMyOrdersQuery({});
    const [updateProfileFn] = useUpdateProfileMutation();
  return (
    <div>Profile</div>
  )
}

export default Profile