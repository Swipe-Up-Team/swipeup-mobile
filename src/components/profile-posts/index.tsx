/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
// import ProfilePostItem from './ProfilePostItem'

interface Props {
  profilePosts: any[]
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginVertical: 15,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  }
})

export default function index({ profilePosts }: Props) {
  if (profilePosts === undefined || profilePosts.length === 0)
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          This profile doesn't have any posts.
        </Text>
      </View>
    )
}

// export class index1 extends Component {
//     render() {
//         const { profilePosts } = this.props
//         if (profilePosts === undefined || profilePosts.length == 0) return (

//         )
//         return (
//             <View style={{ ...styles.container, paddingVertical: 0 }}>
//                 {profilePosts.map((post, index) => (
//                     <ProfilePostItem key={index} item={post} />
//                 ))}

//             </View>
//         )
//     }
// }
