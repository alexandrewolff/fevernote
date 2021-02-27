import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import App from './App'
import { Route, Switch, Redirect } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('<App />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should return routing to <Authentication /> on start', () => {
    expect(wrapper.find(Switch)).toHaveLength(1)
    expect(wrapper.find(Route)).toHaveLength(1)
    expect(wrapper.find(Route).props().path).toBe('/authentication')
    expect(wrapper.find(Redirect)).toHaveLength(1)
    expect(wrapper.find(Redirect).props().to).toBe('/authentication')
  })
})
