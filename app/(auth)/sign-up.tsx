import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import OAuth from '@/components/OAuth'

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    console.log(form);
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
              Create Your Account
            </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            icon={icons.person}
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
            className='mt-6'
            textVariant='success'
          />

          <OAuth />

          <Link href="/sign-in" className="text-lg items-center text-general-200 mt-2 px-3">
            <Text className="text-general-200">
              Already have an account?
            </Text>
            <Text className=" text-primary-500 ">
              Sign In
            </Text>
          </Link>
        </View>

        {/* varifivati */}
      </View>
    </ScrollView>

  )
}

export default SignUp