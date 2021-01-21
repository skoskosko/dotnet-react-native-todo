import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import TodoList from './screens/TodoList'
import NewItem from './screens/NewItem'

function newItem(){
  console.log("newItem")
}

export default function App() {
  const overlayRef = useRef<NewItem>(null);
  const listRef = useRef<TodoList>(null);
  
  function fireToggle() {
    console.log("toggle")
    console.log(overlayRef.current)
    if (null !== overlayRef.current)
      overlayRef.current.toggleOverlay()
  }

  function fireRefresh() {
    console.log("Refresh")
    if (null !== listRef.current)
    listRef.current.getData()
  }

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'TODO demo', style: { color: '#fff' } }}
        rightComponent={ { icon:'add', color: '#fff', onPress: fireToggle } }
      />
      <TodoList ref={listRef}></TodoList>
      <NewItem refreshParent={fireRefresh} ref={overlayRef} ></NewItem>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
