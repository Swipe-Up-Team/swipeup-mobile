import { Text, Layout, TabView, Tab, List } from '@ui-kitten/components'
import React from 'react'
import Conversation from '../conversation'
import styles from './styles'

const TabTitle = ({ text, ...props }: any) => (
  <Text {...props} style={[props!.style, { marginTop: 10 }]}>
    {text}
  </Text>
)

const renderItem = ({ item, index }: any) => <Conversation />

const TabViewSection = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const data = new Array(18)

  return (
    <TabView
      indicatorStyle={styles.indicator}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab title={<TabTitle text="Direct Message" />}>
        <List data={data} renderItem={renderItem}/>
      </Tab>
      <Tab title={<TabTitle text="Group Chat" />}>
        <List data={data} renderItem={renderItem}/>
      </Tab>
    </TabView>
  )
}

export default TabViewSection
