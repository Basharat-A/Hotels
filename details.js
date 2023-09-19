import React, {useState, useRef, forwardRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
const ImageZoomWithRef = forwardRef(
  (
    props,
    ref, // Wrap ImageZoom with forwardRef
  ) => <ImageZoom ref={ref} {...props} />,
);

export default ({route}) => {
  const {hotel} = route.params;
  const [zoomed, setZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const toggleZoom = () => {
    setZoomed(!zoomed);
  };
  const onPinchGestureEvent = event => {
    setScale(event.nativeEvent.scale);
  };

  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Ensure that the scale doesn't go below 1 or above 3 (for example)
      const newScale = Math.max(
        1,
        Math.min(scale * event.nativeEvent.scale, 3),
      );
      setScale(newScale);
    }
  };
  const imageZoomRef = useRef(null);
  const renderImage = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={zoomed}
        onRequestClose={toggleZoom}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={toggleZoom}>
            <PinchGestureHandler
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}>
              <ImageZoomWithRef
                ref={imageZoomRef}
                source={{uri: hotel.image}}
                style={{width: 350 * scale, height: 300 * scale}}
              />
            </PinchGestureHandler>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={toggleZoom}>
        <Image
          source={{
            uri: hotel.image,
          }}
          style={{
            width: 350,
            height: 300,
            marginLeft: 5,

            marginTop: 10,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: '#000000',
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {hotel.name}
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 15,
          textAlign: 'center',
        }}>
        {hotel.address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
        }}>
        <Text>
          {hotel.rent + '/'}
          <Text
            style={{
              color: '#87ceeb',
            }}>
            Night
          </Text>
        </Text>

        <Text style={{marginRight: 20}}>{hotel.reviews + ' reviews'}</Text>
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 15,
          marginTop: 10,
          color: '#000000',
        }}>
        what we offer
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,

          justifyContent: 'space-between',
          marginRight: 20,
          marginLeft: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assests/images/beds.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{fontSize: 15, color: '#000000'}}>2 Beds</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assests/images/Dinner.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{fontSize: 15, color: '#000000'}}>Dinner</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assests/images/Tub.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{fontSize: 15, color: '#000000'}}>Hot tub</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assests/images/ac.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{fontSize: 15, color: '#000000'}}>AC</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 30,
          borderWidth: 1,
          borderRadius: 20,
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000'}}>
          Book Now
        </Text>
      </View>
      {/* Display other hotel details using `hotel` object */}
      {renderImage()}
    </SafeAreaView>
  );
};
