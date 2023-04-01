import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

export default function PreparingOrderScreen() {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(()=> {
            navigation.navigate('Delivery')
        })
    },[])
  return (
    <SafeAreaView className=''>
        <Animatable.Image
        source={require('../assets/TPPX.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
        />
        <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-20 text-white font-bold text-center'
        >
        Waiting for Restaurant to accept your order
        </Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color='white' />
    </SafeAreaView>
  )
}