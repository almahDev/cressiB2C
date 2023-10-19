/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from 'apollo-client'
import React from 'react'
import { useQuery } from 'react-apollo'
import {
  Session,
  ExtensionPoint,
  SessionResponse,
  SessionUnauthorized,
  SessionForbidden,
} from 'vtex.render-runtime'

import Loading from './Loading'
import useSessionResponse from '../hooks/useSessionResponse'
import PROFILE_QUERY from '../graphql/profile.graphql'

const isSessionUnauthorized = (
  session: SessionResponse | undefined
): session is SessionUnauthorized =>
  (session as SessionUnauthorized)?.type?.toLowerCase() === 'unauthorized'

const isSessionForbidden = (
  session: SessionResponse | undefined
): session is SessionForbidden =>
  (session as SessionForbidden)?.type?.toLowerCase() === 'forbidden'

const isProfileAllowed = (sessionResponse: SessionResponse | undefined) => {
  if (sessionResponse == null) {
    return null
  }

  const hasAccessToTradePolicy = (sessionResponse as Session).namespaces?.store
    ?.channel

  const isLoggedIn = (sessionResponse as Session).namespaces?.profile?.email

  if (isLoggedIn && hasAccessToTradePolicy) {
    return 'authorized'
  }

  if (isLoggedIn) {
    return 'forbidden'
  }

  return 'unauthorized'
}

const isProfileApproved = (
  profileData: any,
  profileLoading: boolean,
  profileError: ApolloError | undefined
) => {
  if (profileLoading || profileError) {
    return false
  }

  const customFields = profileData?.profile?.customFields

  if (!customFields || !customFields.length) {
    return false
  }

  const isApproved = !!customFields.filter(
    (field: any) =>
      field.key === 'approved' &&
      (field.value === 'true' || field.value === true)
  )[0]

  return isApproved
}

type BlockChallengeProps = {
  showLoading?: boolean
}

const BlockChallenge = ({ showLoading = true }: BlockChallengeProps) => {
  const sessionResponse = useSessionResponse()
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery(PROFILE_QUERY)

  const isUnauthorized = isSessionUnauthorized(sessionResponse)
  const isForbidden = isSessionForbidden(sessionResponse)
  const profileCondition = isProfileAllowed(sessionResponse)
  const profileApproved = isProfileApproved(
    profileData,
    profileLoading,
    profileError
  )

  if (!sessionResponse) {
    return null
  }

  if ((profileLoading || profileError) && showLoading) {
    return <Loading />
  }

  const defaultHidden = sessionResponse == null

  if (
    defaultHidden ||
    isUnauthorized === true ||
    isForbidden === true ||
    profileCondition === 'unauthorized' ||
    profileCondition === 'forbidden' ||
    !profileApproved
  ) {
    return <ExtensionPoint id="challenge-fallback" />
  }

  return <ExtensionPoint id="challenge-content" />
}

export default BlockChallenge
