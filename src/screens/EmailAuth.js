import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const EmailAuth = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserWithEmailAndPassword = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      setAuthenticated(true);
      alert('User created successfully');
      navigation.navigate('Home', {email});
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setAuthenticated(true);
      navigation.navigate('Home', {email});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <View
        style={{
          flexDirection: 'row',
          width: 200,
          justifyContent: 'space-between',
        }}>
        <Button
          title="Sign Up"
          onPress={() => {
            createUserWithEmailAndPassword(email, password);
          }}
        />
        <Button
          title="Sign In"
          onPress={() => {
            signInWithEmailAndPassword(email, password);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default EmailAuth;
