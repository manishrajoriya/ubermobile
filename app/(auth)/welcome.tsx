import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Swiper from 'react-native-swiper'
import { onboarding } from '@/constants'
import CustomButton from '@/components/CustomButton'

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-between ">
      <TouchableOpacity onPress={()=>{router.replace("/(auth)/sign-up")}} 
      className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold ">Skip</Text>
      </TouchableOpacity>

      <Swiper ref={swiperRef}
      loop={false}
      dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
      activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
      onIndexChanged={(index) => setActiveIndex(index)}
      >
      {
        onboarding.map((item)=> (
            <View key={item.id} className="flex-1 items-center p-5">
              <Image source={item.image} className="w-full h-[300px]" 
               resizeMode='contain'
              />

              <View className="flex flex-row  items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-5 text-center">
                {item.title}
                </Text>
              </View>

              <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-5 mt-3">
                {item.description}
                </Text>
            </View>
        ))
      }
      </Swiper>
      <CustomButton
      onPress={()=>{router.replace("/(auth)/sign-up")}}
      title="Next"
      bgVariant="primary"
      textVariant="default"
      
      className=""
      />
    </SafeAreaView>
  )
}

export default Onboarding