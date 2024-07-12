import { router, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Pressable, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {login}=useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Please fill all fields");
      return;
    }
    setLoading(true);
    const response=await login(emailRef.current,passwordRef.current);
    setLoading(false);
    if(!response.success){
      Alert.alert('Sign In',response.msg);
    }

  
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#2A2A2A' }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ paddingTop: hp(12), flex: 1, alignItems: 'center' }}>
        <Text style={{ paddingTop: hp(6), fontSize: wp(6), fontWeight: 'bold', color: 'white', letterSpacing: 1.5, textAlign: 'center' }}>
          My App
        </Text>

        <View style={{ width: wp(80), gap: hp(2.5), paddingTop: hp(12.5) }}>
          <TextInput
            style={{
              height: hp(7),
              backgroundColor: '#3D3D3D',
              paddingHorizontal: wp(4),
              borderRadius: wp(3),
              fontSize: wp(4),
              color: 'white',
            }}
            onChangeText={value => emailRef.current = value}
            placeholder="Email"
            placeholderTextColor="#888"
          />

          <TextInput
            style={{
              height: hp(7),
              backgroundColor: '#3D3D3D',
              paddingHorizontal: wp(4),
              borderRadius: wp(3),
              fontSize: wp(4),
              color: 'white',
            }}
            onChangeText={value => passwordRef.current = value}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={{ color: 'white', textAlign: 'right', marginTop: hp(0.5), marginBottom: hp(1.5) }}>Forgot Password?</Text>
          </TouchableOpacity>

          <View>
            {
              loading ? (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Loading size={hp(8)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{
                    height: hp(6),
                    backgroundColor: '#FFD482',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp(3),
                  }}
                >
                  <Text style={{ fontSize: wp(4), fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </View>

      <View  style={{ position: 'absolute', bottom: hp(4),top:hp(95), left: 0, right: 0, alignItems: 'center' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Don't have an account?{' '}
          <Pressable onPress={() => router.push('signUp')}>
            <Text style={{ color: '#FFD482', textDecorationLine: 'underline', fontWeight: 'bold' }}>Signup</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}
