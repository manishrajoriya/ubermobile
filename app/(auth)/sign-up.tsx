import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp()
  const [verification, setVerification] = useState({
    state: "default",
    code: "",
    error: "",
  })

  const onSignUpPress = async () => {
      
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        firstName: form.fullName,
        
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({...verification, state: "pending"})
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error",err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        // TODO: add user to database
        await setActive({ session: completeSignUp.createdSessionId })
         setVerification({...verification, state: "success"})
      } else {
        setVerification({...verification, state: "failed", error: "verification failed"})
      }
    } catch (err: any) {
      setVerification({...verification, state: "failed", error: err.errors[0].longMessage})
    }
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

        <ReactNativeModal isVisible={verification.state === "pending"}
        onModalHide={() => setVerification({...verification, state: "success"})}
          >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-left text-3xl font-JakartaBold">
              Verification
            </Text>
            <Text className="text-center text-base font-JakartaRegular text-general-900 mt-5">
              We have sent a verification code to - <Text className="font-JakartaBold">{form.email}</Text>
            </Text>
            <InputField
              label="Code"
              placeholder="Enter your code"
              icon={icons.lock}
              value={verification.code}
              keyboardType='numeric'
              onChangeText={(code) => setVerification({...verification, code: code})}
            />
            
            {
              verification.error && (
                <Text className="text-center text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )
            }

            <CustomButton 
              title="Verify"
              onPress={onPressVerify}
              className='mt-5'
              textVariant='primary'
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} 
            className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className="text-center text-3xl font-JakartaBold">
               Verified
            </Text>
            <Text className="text-center text-base text-gray-400 font-Jakarta mt-2">
              You have successfully verified your account
            </Text>
            
            <CustomButton 
              title="Brouse Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className='mt-5'
              textVariant='success'
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>

  )
}

export default SignUp