import { gql } from 'apollo-angular';

export const SESSION_QUERY = gql`
  query Media {
    session {
      reason
      success
      user {
        _id
        city
        email
        firstname
        lastname
        middlename
        phone
      }
    }
  }
`;
