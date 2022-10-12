import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const Auth = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  GoogleSignin.configure({
    webClientId:
      '967213349603-i5jrkbk6bi3se4usg6qu72r1vn424p0a.apps.googleusercontent.com',
    // offlineAccess: true,
  });

  const signInWithGoogle = async () => {
    console.log('signInWithGoogle');

    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in
      .then(userData => {
        setUser(userData);
        console.log('userData in Auth', userData);
        navigation.navigate('Home', {user: userData});
      })
      .catch(error => {
        console.log('error in Auth', error);
      });
  };

  const signInWithFaceBook = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const fbuser_sign_in = await auth().signInWithCredential(
        facebookCredential,
      );

      console.log('fbuser_sign_in', fbuser_sign_in);

      // setFbUser(fbuser_sign_in);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => navigation.navigate('EmailAuth')}>
        <Text style={styles.fbText}>Sign In with Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Text style={styles.googleText}>Sign in with google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fbButton} onPress={signInWithFaceBook}>
        <Text style={styles.fbText}>Sign in with FaceBook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbButton: {
    backgroundColor: '#3B5998',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  fbText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#EA4335',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  googleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Auth;
