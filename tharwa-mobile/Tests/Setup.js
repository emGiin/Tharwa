import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Mock your external modules here if needed
jest
  .mock('react-native-i18n', () => {
    const french = require('../App/I18n/languages/fr.json')
    const keys = require('ramda')
    const replace = require('ramda')
    const forEach = require('ramda')

    return {
      t: (key, replacements) => {
        let value = french[key]
        if (!value) return key
        if (!replacements) return value

        forEach((r) => {
          value = replace(`{{${r}}}`, replacements[r], value)
        }, keys(replacements))
        return value
      }
    }
  })
  // .mock('react-native-camera', () => {
  //   return {

  //   }
  // })
