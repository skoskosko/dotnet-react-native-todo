import React from 'react';
import { Text, View, Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import {Todo} from '../types'
import { todos } from '../components/Getters';
import { setTodo } from '../components/Setters';
import { delTodo } from '../components/Deleters'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    width: Dimensions.get('window').width - 20
  },
  list: {
  },
  icon: {
    position: 'relative',
    right: '1em'
  },
  centered: {
    textAlign: 'center'
  },
  title: {
    fontSize: 30
  },
  red: {
    backgroundColor: '#B22222'
  },
  green: {
    backgroundColor: '#7CFC00'
  },
  parentView: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    margin: 0
  },
  leftPart: {
    textAlign: 'center',
    width: '100%'
  },
  rightPart: {
    right: 0,
    height: '100%',
    position: 'absolute'
  }
});

function JobStatus(item : Todo){
  if (item.isComplete)
  return "Done"
  else
  return "Waiting"
}

function JobStyle(item: Todo){
  if (item.isComplete)
    return [styles.item, styles.green]
  else
    return [styles.item, styles.red]
}

interface IProps {
}

interface IState {
  refreshing: boolean;
  data: Todo[] | []
}



class TodoList extends React.Component<IProps, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      refreshing: false,
      data: []
    }
    this.getData = this.getData.bind(this)
    this.setItem = this.setItem.bind(this)  
  }

  componentDidMount(){
    this.getData()
  }
  

  getData = async () => {
      this.setState({refreshing: true})
      console.log("Get data")
      todos().then(response => {
          this.setState({data: response})
          this.setState({refreshing: false})
      }).catch(err => {
          console.error(err);
          this.setState({refreshing: false})
      })   
  }

  setItem = async (item: Todo) => {
    item.isComplete = !item.isComplete
    setTodo(item).then(response => {
      this.getData()
    }).catch(err => {
        console.error(err);
    })   
  }

  delItem = async (item: Todo) => {
    item.isComplete = !item.isComplete
    delTodo(item).then(response => {
      this.getData()
    }).catch(err => {
        console.error(err);
    })   
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.data}
        renderItem={({item}) => 
        <TouchableOpacity
         onPress={() => this.setItem(item) }>
           <Card containerStyle={JobStyle(item)} >
          {/* <Card containerStyle={styles.item}>  */}
            <View style={styles.parentView}>
              <View style={styles.leftPart}>
              <Text style={[styles.title, styles.centered]}>{item.name}</Text> 
              <Text style={styles.centered}> {JobStatus( item )} </Text>
              </View>
              
              <View style={styles.rightPart}>

                <Icon onPress={() => this.delItem(item)} name="delete" size={70}/>

              </View>
            </View>
          </Card>
        </TouchableOpacity>
        }
        keyExtractor={(item) => item.id.toString()}
        // onRefresh={() => console.log("test")}
        onRefresh={() => this.getData()}
        refreshing={this.state.refreshing}
        style={styles.list}
        />
      </View>
    );
  }
}

export default TodoList;