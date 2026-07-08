import { gql } from 'apollo-angular';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($phone: String!, $profile: UpdateProfileProfileDto!) {
    updateProfile(phone: $phone, profile: $profile) {
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
