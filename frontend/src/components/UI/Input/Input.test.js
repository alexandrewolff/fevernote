import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import Input from './Input'

configure({ adapter: new Adapter() })

describe('<Input />', () => {
  let errorMessage, fieldProps, wrapper

  beforeEach(() => {
    errorMessage = 'Error message'
    fieldProps = {
      config: {
        tag: 'input',
        type: 'email',
        placeholder: 'Your email',
        errorMessage
      },
      isValid: false,
      isTouched: false,
      value: ''
    }

    wrapper = shallow(<Input { ...fieldProps } />)
  })

  it('should render 1 <div> 1 <input> and 0 <p> at start', () => {
    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(0)
  })

  it('should render 1 <div> 1 <input> and 1 <p> with correct message if touched and NOT valid', () => {
    wrapper.setProps({ isValid: false, isTouched: true })

    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('p').text()).toBe(errorMessage)
  })

  it('should render 1 <div> 1 <input> and 1 <p> if touched and valid', () => {
    wrapper.setProps({ isValid: true, isTouched: true })

    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(0)
  })
})
