import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import Warning from './Warning'

configure({ adapter: new Adapter() })

describe('<Warning />', () => {
  it('should render the component with the right text', () => {
    const content = 'Warning text'
    const wrapper = shallow(<Warning>{content}</Warning>)

    expect(wrapper.find('p').text()).toBe(content)
  })
})
