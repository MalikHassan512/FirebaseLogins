import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {Profile} from 'react-native-fbsdk-next';
import {LoginManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Home = ({route}) => {
  const navigation = useNavigation();
  // const {user} = route?.params;
  console.log('this is route in Home', route);

  const [fbUser, setFbUser] = useState(null);
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);

  const currentProfile = Profile.getCurrentProfile().then(function (
    currentProfile,
  ) {
    if (currentProfile) {
      console.log(
        'The current logged user is: ' +
          currentProfile.name +
          '. His profile id is: ' +
          currentProfile.userID,
      );
      setFbUser(currentProfile.name);
      setId(currentProfile.userID);
    }
  });

  const signOut = async () => {
    try {
      LoginManager.logOut();
      await auth().signOut();
      console.log('User signed out');
      navigation.navigate('Auth');
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

  const logOutWithGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // console.log('User signed out');
      alert('User signed out');
      navigation.navigate('Auth');
    } catch (error) {
      console.error(error);
    }
  };

  const signOutEmail = async () => {
    try {
      await auth().signOut();
      console.log('User signed out');
      navigation.navigate('Auth');
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

  useEffect(() => {
    if (route.params?.user) {
      const {user} = route.params;
      setUser(user);
    }
  }, [route.params?.user]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home</Text> */}

      <Text>You Are Logged In</Text>
      <Button title="Sign Out" onPress={signOutEmail} />

      {fbUser !== null ? (
        <>
          <Text style={styles.text}>{fbUser}</Text>
          <Text style={styles.text}>{id}</Text>

          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {user !== null ? (
        <>
          <Text>{user?.user.displayName}</Text>
          <Text>{user?.user.email}</Text>
          <Text>{user?.user.photoURL}</Text>
          <Image
            source={{uri: user?.user?.photoURL}}
            style={{width: 100, height: 100}}
          />
          <TouchableOpacity
            style={styles.logOutbutton}
            onPress={logOutWithGoogle}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

// console.log('stringify values:::', userData?.user?.email);
//   return (
//     <View style={styles.container}>
//       <Text>Email:{email}</Text>
//       <Text>Name: {displayName}</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logOutbutton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Home;
