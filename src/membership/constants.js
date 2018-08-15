import { Map } from 'immutable'

export const fields = [
  'membership',
  'legal_name',
  'email',
  'public_first_name',
  'public_last_name',
  'country',
  'state',
  'city',
  'paper_pubs'
]

export const membershipTypes = [
  'NonMember',
  'Exhibitor',
  'Helper',
  'Supporter',
  'KidInTow',
  'Child',
  'YoungAdult',
  'Unwaged',
  'Adult'
]

export const emptyPaperPubsMap = Map({ name: '', address: '', country: '' })

export const isAttendingMember = member => {
  const types = [
    'Exhibitor',
    'KidInTow',
    'Child',
    'YoungAdult',
    'Unwaged',
    'Adult'
  ]
  const membership =
    typeof member === 'string' ? member : member.get('membership')
  return types.indexOf(membership) !== -1
}

export const isWSFSMember = member => {
  const types = ['Supporter', 'YoungAdult', 'Unwaged', 'Adult']
  const membership =
    typeof member === 'string' ? member : member.get('membership')
  return types.indexOf(membership) !== -1
}
