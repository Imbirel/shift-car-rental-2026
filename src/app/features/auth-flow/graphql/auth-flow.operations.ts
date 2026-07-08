import { gql } from 'apollo-angular';

export const CREATE_OTP_MUTATION = gql`
  mutation UpdateProfile($phone: String!) {
    createOtp(phone: $phone) {
      reason
      retryDelay
      success
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation UpdateProfile($code: Float!, $signinPhone2: String!) {
    signin(code: $code, phone: $signinPhone2) {
      reason
      success
      token
      user {
        _id
        city
        phone
        email
        firstname
        lastname
        middlename
      }
    }
  }
`;
