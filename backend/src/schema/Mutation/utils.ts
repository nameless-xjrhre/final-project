/* eslint-disable no-unused-vars */
import {
  Either,
  left,
  right,
  map,
  getApplicativeValidation,
  mapLeft,
} from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import { sequenceT } from 'fp-ts/Apply'

import { getSemigroup, NonEmptyArray } from 'fp-ts/NonEmptyArray'

const minLength = (s: string): Either<string, string> =>
  s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
  /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('at least one number')

function lift<E, A>(
  check: (a: A) => Either<E, A>,
): (a: A) => Either<NonEmptyArray<E>, A> {
  return (a) =>
    pipe(
      check(a),
      mapLeft((b) => [b]),
    )
}

const minLengthV = lift(minLength)
const oneCapitalV = lift(oneCapital)
const oneNumberV = lift(oneNumber)

export function validatePassword(
  s: string,
): Either<NonEmptyArray<string>, string> {
  return pipe(
    sequenceT(getApplicativeValidation(getSemigroup<string>()))(
      minLengthV(s),
      oneCapitalV(s),
      oneNumberV(s),
    ),
    map(() => s),
  )
}

export function validateUsername(
  s: string,
): Either<NonEmptyArray<string>, string> {
  return pipe(
    sequenceT(getApplicativeValidation(getSemigroup<string>()))(
      minLengthV(s),
      oneCapitalV(s),
    ),
    map(() => s),
  )
}

export function onLeft(errors: NonEmptyArray<string>): Error {
  throw new Error(errors.join(' '))
}
