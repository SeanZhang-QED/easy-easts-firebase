import React from 'react'
import Header from '../layouts/Header'
import MainBoard from '../layouts/MainBoard'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function MainPage() {
  const { currentUser } = useAuth()

  return (
    <>
      <Header />
      <MainBoard />
    </>
  )
}
