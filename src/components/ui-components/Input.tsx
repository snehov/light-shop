import React from 'react'
enum inputTypes {
  number,
  text,
}
const Input = ({ type }: { type: inputTypes }) => <input type="text" />
export default Input
