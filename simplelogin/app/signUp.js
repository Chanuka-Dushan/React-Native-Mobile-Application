import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Pressable, KeyboardAvoidingView, ScrollView, Alert, Platform, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';
import { router } from 'expo-router';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const confirmPasswordRef = useRef("");
  const { register } = useAuth();

  const handleRegister = async () => {
    setLoading(true);

    // Validate fields
    const isValidUsername = validateUsername();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (!isValidUsername || !isValidEmail || !isValidPassword || !isValidConfirmPassword) {
      setLoading(false);
      return;
    }

    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current);

    setLoading(false);
    console.log(response);
    
    if (!response.success) {
      Alert.alert('Signup', response.msg);
    }
  };

  const validateUsername = () => {
    if (!usernameRef.current) {
      setUsernameError('Username is required');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRef.current || !emailPattern.test(emailRef.current)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const value = passwordRef.current;

    if (!value) {
      setPasswordError('Password is required');
    } else if (!/(?=.*[a-z])/.test(value)) {
      setPasswordError('Must have at least one lowercase letter');
    } else if (!/(?=.*[A-Z])/.test(value)) {
      setPasswordError('Must have at least one uppercase letter');
    } else if (!/(?=.*\d)/.test(value)) {
      setPasswordError('Must have at least one number');
    } else if (value.length < 8) {
      setPasswordError('Must have at least 8 characters');
    } else {
      setPasswordError('');
    }

    // Clear confirm password error when password changes
    setConfirmPasswordError('');
    return !passwordError; // Return true if no errors
  };

  const validateConfirmPassword = () => {
    if (passwordRef.current !== confirmPasswordRef.current) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const showAllConditions = () => {
    validatePassword();
    validateConfirmPassword();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#2A2A2A' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust the offset as needed
    >
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ paddingTop: hp(4), fontSize: wp(6), fontWeight: 'bold', color: 'white', letterSpacing: 1.5, textAlign: 'center' }}>
            My App
          </Text>

          <View style={{ width: wp(80), gap: hp(2.5), paddingTop: hp(5) }}>
            <TextInput
              style={{
                height: hp(7),
                backgroundColor: '#3D3D3D',
                paddingHorizontal: wp(4),
                borderRadius: wp(3),
                fontSize: wp(4),
                color: 'white',
              }}
              onChangeText={value => usernameRef.current = value}
              placeholder="Username"
              placeholderTextColor="#888"
            />
            {usernameError ? <Text style={{ color: 'red' }}>{usernameError}</Text> : null}

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
            {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

            <TextInput
              style={{
                height: hp(7),
                backgroundColor: '#3D3D3D',
                paddingHorizontal: wp(4),
                borderRadius: wp(3),
                fontSize: wp(4),
                color: 'white',
              }}
              onChangeText={value => {
                passwordRef.current = value;
                showAllConditions(); // Validate and show password conditions on each change
              }}
              onFocus={showAllConditions} // Show conditions when password field is focused
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
            {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}

            <TextInput
              style={{
                height: hp(7),
                backgroundColor: '#3D3D3D',
                paddingHorizontal: wp(4),
                borderRadius: wp(3),
                fontSize: wp(4),
                color: 'white',
              }}
              onChangeText={value => {
                confirmPasswordRef.current = value;
                setConfirmPasswordError(''); // Clear error when typing in confirm password
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
            {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError}</Text> : null}

            <View>
              {
                loading ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Loading size={hp(8)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                      height: hp(6),
                      backgroundColor: '#FFD482',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp(3),
                    }}
                  >
                    <Text style={{ fontSize: wp(4), fontWeight: 'bold' }}>Signup</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
        </View>
      </ScrollView>

      <View  style={{ position: 'absolute', bottom: hp(4),top:hp(95), left: 0, right: 0, alignItems: 'center' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Already have an account?{' '}
          <Pressable onPress={() => router.push('signIn')}>
            <Text style={{ color: '#FFD482', textDecorationLine: 'underline', fontWeight: 'bold' }}>Login</Text>
          </Pressable>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
