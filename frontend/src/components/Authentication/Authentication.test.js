import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import Authentication from './Authentication'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

configure({ adapter: new Adapter() })

describe('<Authentication />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Authentication />)
  })

  it('should return basic fields at start', () => {
    expect(wrapper.find(Input)).toHaveLength(2)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(4)
    expect(wrapper.find('a')).toHaveLength(2)
  })

  it('should return 1 more <Input /> field when switching to signup', () => {
    wrapper.find('a').first().simulate('click')

    expect(wrapper.find(Input)).toHaveLength(3)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(4)
    expect(wrapper.find('a')).toHaveLength(2)
  })
})
