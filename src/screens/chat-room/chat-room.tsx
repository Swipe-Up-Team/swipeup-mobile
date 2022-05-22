import { DismissKeyboardView } from '@src/components';
import TopHeader from './components/top-header';
import { ContentView } from './components';
import { View } from 'react-native';
import { useEffect } from 'react';

export const ChatRoomScreen = ({navigation}: any) => {

  return (
    <>
      <TopHeader />
      <ContentView />
    </>
  );
}
