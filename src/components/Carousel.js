import React from 'react'
import { View, StyleSheet, Dimensions, Image } from "react-native"
import Carousel from 'react-native-snap-carousel'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.externalContainer}>
            <View style={styles.internalContainer} key={index}>
                <Image
                source={{ uri: item.imgUrl }}
                style={styles.image}
                />
            </View>
        </View>
    )
  }

export default function CarouselCards(props) {
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Carousel
        layoutCardOffset={9}
        ref={isCarousel}
        data={props.images}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    externalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 250,
    },
    internalContainer: {
        height: 200,
        borderRadius: 8,
        width: ITEM_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
      width: ITEM_WIDTH,
      height: 200,
      borderRadius: 8,
    }
  })