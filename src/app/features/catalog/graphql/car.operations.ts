import { gql } from 'apollo-angular';

export const GET_CARS_QUERY = gql`
  query Media(
    $startDate: Float
    $endDate: Float
    $search: String
    $brand: [Brand!]
    $bodyType: [BodyType!]
    $steering: [Steering!]
    $transmission: [Transmission!]
    $minPrice: Float
    $maxPrice: Float
    $color: [Color!]
  ) {
    getCars(
      startDate: $startDate
      endDate: $endDate
      search: $search
      brand: $brand
      bodyType: $bodyType
      steering: $steering
      transmission: $transmission
      minPrice: $minPrice
      maxPrice: $maxPrice
      color: $color
    ) {
      data {
        id
        name
        transmission
        price
        media {
          url
        }
        brand
        bodyType
        steering
        color
      }
    }
  }
`;

export const GET_CAR_QUERY = gql`
  query Media($carId: String!) {
    getCar(carId: $carId) {
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
