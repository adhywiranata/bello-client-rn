import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';

import * as colors from '../constants/colors';
import cartIcon from '../images/shopping-cart-blue.png';
import notificationIcon from '../images/bell.png';
import reminderIcon from '../images/hourglass.png';
import buyIcon from '../images/shopping-bag.png';
import analyticsIcon from '../images/bar-chart.png';
import profileIcon from '../images/user.png';

import ActionSuccessInfo from '../components/Core/ActionSuccessInfo';

// redux store
import { updateUserOneSignalId } from '../actions/userdata';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    paddingTop: 100,
  },
  homeList: {
    flex: 1,
    width: '100%',
    height: '50%',
    padding: 0,
    flexDirection: 'row',
  },
  homeCard: {
    margin: 10,
    width: '45%',
    height: '80%',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeCardContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    margin: 5,
  },
  homeTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    color: colors.darkGrey,
  },
};

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onesignalId: '',
    };

    this.onIds = this.onIds.bind(this);
  }

  componentWillMount() {
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('opened', this.onNotificationOpened);
  }

  componentDidMount() {
    OneSignal.configure({});
  }

  onNotificationOpened(message, data, isActive) {
    if (isActive) {
      setTimeout(Actions.notification, 2000);
    } else {
      setTimeout(Actions.notification, 2000);
    }
  }

  onIds(device) {
    const onesignalId = device.userId;
    this.setState({ onesignalId });
    setTimeout(() => {
      this.props.updateUserOneSignalId({
        user_id: this.props.userdata.id,
        onesignal_id: onesignalId,
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeList}>
          <TouchableOpacity style={styles.homeCard} onPress={Actions.chat} activeOpacity={0.8}>
            <View style={styles.homeCardContent}>
              <Image source={buyIcon} style={styles.homeIcon} />
              <Text style={styles.homeTitle}>BELI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeCard} onPress={Actions.cart} activeOpacity={0.8}>
            <View style={styles.homeCardContent}>
              <Image source={cartIcon} style={styles.homeIcon} />
              <Text style={styles.homeTitle}>KERANJANG</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.homeList}>
          <TouchableOpacity style={styles.homeCard} onPress={Actions.analytics} activeOpacity={0.8}>
            <View style={styles.homeCardContent}>
              <Image source={analyticsIcon} style={styles.homeIcon} />
              <Text style={styles.homeTitle}>ANALISA</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeCard} onPress={Actions.request} activeOpacity={0.8}>
            <View style={styles.homeCardContent}>
              <Image source={reminderIcon} style={styles.homeIcon} />
              <Text style={styles.homeTitle}>REQUEST</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.homeList}>
          <TouchableOpacity
            style={styles.homeCard}
            onPress={Actions.notification}
            activeOpacity={0.8}
          >
            <View style={styles.homeCardContent}>
              <Image source={notificationIcon} style={styles.homeIcon} />
              <Text style={styles.homeTitle}>NOTIFIKASI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeCard} onPress={Actions.profile} activeOpacity={0.8}>
            <View style={styles.homeCardContent}>
              <Image source={profileIcon} style={styles.homeIcon} />
              <Text style={styles.homeTitle}>PROFIL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata.result,
  };
};

const mapDispatchToProps = dispatch => ({
  updateUserOneSignalId: data => dispatch(updateUserOneSignalId(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
