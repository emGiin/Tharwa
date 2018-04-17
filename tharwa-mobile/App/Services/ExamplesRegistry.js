import React from 'react'
import { Text, View } from 'react-native'
import R from 'ramda'
import { ApplicationStyles } from '../Themes'
import DebugConfig from '../Config/DebugConfig'
let globalComponentExamplesRegistry = []
let globalPluginExamplesRegistry = []

export const addComponentExample = /* istanbul ignore next */(title, usage = () => { }) => { if (DebugConfig.includeExamples) globalComponentExamplesRegistry.push({ title, usage }) } // eslint-disable-line

export const addPluginExample = /* istanbul ignore next */(title, usage = () => { }) => { if (DebugConfig.includeExamples) globalPluginExamplesRegistry.push({ title, usage }) } // eslint-disable-line

/* istanbul ignore next */
const renderComponentExample = (example) => {
  return (
    <View key={example.title}>
      <View style={ApplicationStyles.darkLabelContainer}>
        <Text style={ApplicationStyles.darkLabel}>{example.title}</Text>
      </View>
      {example.usage.call()}
    </View>
  )
}

/* istanbul ignore next */
const renderPluginExample = (example) => {
  return (
    <View key={example.title}>
      <View style={ApplicationStyles.darkLabelContainer}>
        <Text style={ApplicationStyles.darkLabel}>{example.title}</Text>
      </View>
      {example.usage.call()}
    </View>
  )
}

export const renderComponentExamples = /* istanbul ignore next */() => R.map(renderComponentExample, globalComponentExamplesRegistry)

export const renderPluginExamples = /* istanbul ignore next */() => R.map(renderPluginExample, globalPluginExamplesRegistry)

// Default for readability
export default {
  renderComponentExamples,
  addComponentExample,
  renderPluginExamples,
  addPluginExample
}
