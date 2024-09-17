import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import OAuth from '@/components/OAuth'

const SignIn = () => {
  const [form, setForm] = useState({
    
    email: "",
    password: "",
  });

  
  const onSignInPress = async () => {
    console.log(form);
    console.log();
    
  }
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="relative w-full h-[250px]">
          <Image
             source={images.signUpCar}
             className='z-0 w-full h-[250px]'
            />
            <Text className="absolute bottom-5 left-5 text-black text-center text-2xl font-JakartaBold">
              Welcome Back
            </Text>
        </View>

        <View className="p-5">
          
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className='mt-6'
            textVariant='success'
          />

          <OAuth />

          <Link href="/sign-up" className="text-lg items-center text-center justify-center text-general-200 mt-2 ">
            <Text className="text-general-200">
              Don't have an account?
            </Text>
            <Text className=" text-primary-500 ">
              Sign Up
            </Text>
          </Link>
        </View>

        {/* varifivati */}
      </View>
    </ScrollView>

  )
}

export default SignIn