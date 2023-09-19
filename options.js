import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Hotels from '../screens/Hotels.json'; // Update the path accordingly

import {useNavigation} from '@react-navigation/native';

export default ({usenavigation}) => {
  const [text, onChangeText] = React.useState('Type here');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          color: '#000000',
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Hotels
      </Text>
      <TouchableOpacity
        onPress={() => {
          // const navigation = useNavigation();
          console.log('details');
        }}>
        {/* ...your button content */}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginTop: 10,
          marginBottom: 10,
          marginRight: 15,
          borderRadius: 20,

          paddingHorizontal: 10,
          borderWidth: 1,
        }}>
        <Image
          source={require('../assests/images/icon.jpg')}
          style={{width: 20, height: 20, marginLeft: 20}}
        />
        <TextInput onChangeText={onChangeText} value={text} />
      </View>
      <FlatList
        style={{paddingTop: 10}}
        data={Hotels}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('details', {hotel: item})}
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={{
                uri: item.image,
              }}
              style={{
                width: 100,
                height: 100,
                marginLeft: 20,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000000',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                  }}>
                  {item.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>
                  {item.rent + '/'}
                  <Text
                    style={{
                      color: '#87ceeb',
                    }}>
                    Night
                  </Text>
                </Text>

                <Text
                  style={{
                    marginLeft: 40,
                  }}>
                  {item.reviews + ' reviews'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
