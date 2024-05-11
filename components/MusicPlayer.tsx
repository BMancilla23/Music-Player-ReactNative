import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Song, songs } from '@/model/data'

const { width, height } = Dimensions.get('window')

export default function MusicPlayer() {

  // Crear una referencia mutable para almacenar el valor de desplazamiento horizontal
  const scrollX = useRef(new Animated.Value(0)).current;
  // Estado para almacenar el índice de la canción actual
  const [songIndex, setSongIndex] = useState(0)

  // Referencia para la lista de reproducción de canciones
  const songsSlider = useRef<FlatList<Song>>(null);

  useEffect(() => {
    // Escuchar los cambios en el valor de desplazamiento horizontal
    scrollX.addListener(({ value }) => {
      /* console.log('Scroll X ', scrollX); */
      /*  console.log('Device Width', width) */
      const index = Math.round(value / width); // Calcular el índice de la canción actual
      setSongIndex(index) // Actualizar el índice de la canción actual
      /*  console.log('Index: ', index); */

    })

    // Limpieza: Eliminar el listener cuando el componente se desmonta
    return () => {
      scrollX.removeAllListeners()
    }
  }, [])

  // Función para saltar a la siguiente canción
  const skipToNext = () => {
    songsSlider.current?.scrollToOffset({
      offset: (songIndex + 1) * width
    })
  }

  // Función para saltar a la canción anterior
  const skipToPrevious = () => {
    songsSlider.current?.scrollToOffset({
      offset: (songIndex - 1) * width
    })
  }

  // Renderizar cada elemento de la lista de canciones
  const renderSongs = ({ index, item }: { index: number, item: Song }) => {
    return (
      <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.coverWrapper}>
          <Image style={styles.coverImg} source={{ uri: item.image }} />
        </View>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>

        <View style={{ width: width }}>
          <Animated.FlatList
            ref={songsSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={10} minimumValue={0}
            maximumValue={100}
            thumbTintColor='#FFD369'
            minimumTrackTintColor='#FFD269'
            maximumTrackTintColor='#FFF'
            onSlidingComplete={() => { }}
          >
          </Slider>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}>0:00</Text>
            <Text style={styles.progressLabelText}>3:55</Text>
          </View>
        </View>

        <View style={styles.musicControlls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name='play-skip-back-outline' size={35} color="#FFD369"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='pause-circle' size={70} color="#FFD369"></Ionicons>
          </TouchableOpacity >
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons name='play-skip-forward-outline' size={35} color="#FFD369"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity>
            <Ionicons name='heart-outline' size={30} color="#777777"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='repeat' size={30} color="#777777"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='share-outline' size={30} color="#777777"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='ellipsis-horizontal' size={30} color="#777777"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222833'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  coverWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5
  },
  coverImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE'
  },

  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#EEEEEE'
  },

  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row'
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressLabelText: {
    color: '#fff'
  }
  ,
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center'
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },

})