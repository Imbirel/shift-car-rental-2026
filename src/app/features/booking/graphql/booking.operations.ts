import { gql } from 'apollo-angular';

export const CREATE_CAR_RENT_MUTATION = gql`
  mutation UpdateProfile(
    $birthDate: String!
    $carId: String!
    $email: String!
    $createCarRentEndDate2: Float!
    $firstName: String!
    $lastName: String!
    $middleName: String!
    $phone: String!
    $pickupLocation: String!
    $returnLocation: String!
    $createCarRentStartDate2: Float!
    $comment: String
  ) {
    createCarRent(
      birthDate: $birthDate
      carId: $carId
      email: $email
      endDate: $createCarRentEndDate2
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      phone: $phone
      pickupLocation: $pickupLocation
      returnLocation: $returnLocation
      startDate: $createCarRentStartDate2
      comment: $comment
    ) {
      reason
      rent {
        _id
        birthDate
        carInfo {
          bodyType
          brand
          color
          id
          location
          media {
            isCover
            url
          }
          name
          price
          steering
          transmission
        }
        comment
        email
        endDate
        firstName
        lastName
        middleName
        phone
        pickupLocation
        returnLocation
        startDate
        status
        totalPrice
      }
      success
    }
  }
`;

export const CANCEL_CAR_RENT_MUTATION = gql`
  mutation UpdateProfile($carRentId: String!) {
    cancelCarRent(carRentId: $carRentId) {
      reason
      success
    }
  }
`;

export const GET_CARS_RENT_QUERY = gql`
  query Media {
    getCarRents {
      reason
      rents {
        _id
        birthDate
        carInfo {
          bodyType
          brand
          color
          id
          location
          media {
            isCover
            url
          }
          name
          price
          steering
          transmission
        }
        comment
        email
        endDate
        firstName
        lastName
        middleName
        phone
        pickupLocation
        returnLocation
        startDate
        status
        totalPrice
      }
      success
    }
  }
`;

export const GET_CAR_RENT_QUERY = gql`
  query Media($carRentId: String!) {
    getCarRent(carRentId: $carRentId) {
      data {
        bodyType
        brand
        color
        id
        location
        media {
          isCover
          url
        }
        name
        price
        rents {
          endDate
          startDate
        }
        steering
        transmission
      }
      reason
      success
    }
  }
`;
