import React from 'react';
import InputLine from './InputLine';
import renderer from 'react-test-renderer';

test('Test input line',()=>{
  const component = renderer.create(
    <InputLine name="testInput" type="text" label="testing"/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})