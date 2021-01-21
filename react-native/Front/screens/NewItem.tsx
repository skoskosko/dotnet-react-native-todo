import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements'
import { postTodo } from '../components/Setters';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20
  }
});

interface IProps {
  refreshParent: Function
}

interface IState {
  visible: boolean,
  todo: string
}



class NewItem extends React.Component<IProps, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      todo : ""
    }
    this.toggleOverlay = this.toggleOverlay.bind(this)
  }
  putItem = async () => {
    if (this.state.todo == "")
      return

    postTodo(this.state.todo).then(response => {
      this.props.refreshParent()
      this.toggleOverlay()
    }).catch(err => {
        console.error(err);
    })   
  }

  toggleOverlay = () => {
    console.log("test")
    const state = !this.state.visible
    this.setState({visible: state})
  }; 

  render() {
    return (
      <View>
       <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
         <View style={styles.container}>
         <Input
            placeholder='Todo'
            onChangeText={value => this.setState({ todo: value })}
          />
          <Button title="Save" onPress={ () => { this.putItem() } }/>
         </View>
       </Overlay>
      </View>
    );
  }
}

export default NewItem;
