import React from 'react'
import { useEffect } from 'react'
import {useSelector} from "react-redux"
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedUserRoute = () => {
    const {isAuthenticated, loading} = useSelector(state => state.user) 
    const navigate = useNavigate()

    useEffect(()=> {
        if(loading === false) {
            if(!isAuthenticated) {
                return navigate("/login")
            }
        }
    }, [])
  return (
    <div>
      <Outlet/>
    </div>
  )}

export default ProtectedUserRoute
