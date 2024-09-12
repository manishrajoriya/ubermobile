import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const OAuth = () => {
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-2 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton 
      title="Continue with Google"
      className='mt-4 w-full shadow-none'
      bgVariant='outline'
      
      IconLeft={()=>(
        <Image source={icons.google}
        className='w-5 h-5 mx-2'
        />
        
      )}
      />
    </View>
  )
}

export default OAuth