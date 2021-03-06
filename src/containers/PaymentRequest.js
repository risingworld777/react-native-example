import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { dynamicSize, getFontSize } from '../helpers/DynamicSize';
import { RequestModal } from '../components/RequestModal';
import { Color } from '../constants';

const { width } = Dimensions.get('window');
const user2 = require('../assets/images/user2.png');
const homeIcon = require('../assets/images/homeIcon.png');

const pendingRequests = [
  {
    id: 1,
    requestAmount: 100,
    requestDate: 'Mar 24, 2018',
    requestStatus: 'Approved',
    payer: {
      avatar: user2,
      name: 'Mother'
    },
    approvalDate: 'Mar 29, 2018',
    fundingDate: 'Mar 29, 2018',
    lastPaymentDate: 'Mar 29, 2018',
    nextPaymentDate: 'Mar 29, 2018',
    nextPaymentAmount: 100,
    remaniningPayments: 80,
    paymentBalane: 80,
    paymentStatus: 'Approved'
  },
  {
    id: 2,
    requestAmount: 100,
    requestDate: 'Mar 24, 2018',
    requestStatus: 'Approved',
    payer: {
      avatar: user2,
      name: 'Mother'
    },
    approvalDate: 'Mar 29, 2018',
    fundingDate: 'Mar 29, 2018',
    lastPaymentDate: 'Mar 29, 2018',
    nextPaymentDate: 'Mar 29, 2018',
    nextPaymentAmount: 100,
    remaniningPayments: 80,
    paymentBalane: 80,
    paymentStatus: 'Approved'
  }
];

const currentRequests = [
  {
    id: 3,
    requestAmount: 1000,
    requestDate: 'Mar 29, 2018',
    requestStatus: 'Waiting',
    payer: {
      avatar: user2,
      name: 'Mother'
    },
    approvalDate: 'Mar 29, 2018',
    fundingDate: 'Mar 29, 2018',
    lastPaymentDate: 'Mar 29, 2018',
    nextPaymentDate: 'Mar 29, 2018',
    nextPaymentAmount: 100,
    remaniningPayments: 80,
    paymentBalane: 80,
    paymentStatus: 'Approved'
  }
];

class PaymentRequest extends Component {
  static navigationOptions = (props) => {
    return {
      title: 'Payment Request',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2B72BF',
        height: dynamicSize(60),
        borderBottomWidth: 0
      },
      headerLeft: (
        <TouchableOpacity onPress={() => props.navigation.navigate('create_new_amount')}>
          <Icon
            containerStyle={{ marginRight: dynamicSize(10) }}
            iconStyle={{ marginLeft: dynamicSize(10) }}
            name="add"
            type="material"
            color="#fff"
            size={30}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity>
          <Icon
            containerStyle={{ marginRight: dynamicSize(10) }}
            iconStyle={{ marginLeft: dynamicSize(10) }}
            name="notifications"
            type="material"
            color="#fff"
            size={20}
          />
        </TouchableOpacity>
      ),
    };
  }

  state = {
    paymentType: 'pending',
    modalVisible: false
  }

  onCreateNewPayment() {
    this.props.navigation.navigate('create_new_amount');
  }

  onToggle(paymentType) {
    this.setState({ paymentType });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  goPaymentDetail = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('paymentDetail');
  }

  render() {
    const { paymentType, modalVisible } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.buttonView}>
          <View style={styles.toggleButtonView}>
            <TouchableOpacity
              onPress={this.onToggle.bind(this, 'pending')}
              style={[styles.toggleButton, { backgroundColor: paymentType === 'pending' ? Color.blue : 'transparent' }]}
              >
              <Text style={{ color: paymentType === 'pending' ? Color.white : Color.text }}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onToggle.bind(this, 'current')}
              style={[styles.toggleButton, { backgroundColor: paymentType === 'current' ? Color.blue : 'transparent' }]}
              >
              <Text style={{ color: paymentType === 'current' ? Color.white : Color.text }}>Current</Text>
            </TouchableOpacity>
          </View>
          {
            paymentType === 'pending' ?
              <ScrollView contentContainerStyle={styles.listview}>
                {pendingRequests.map((requestItem, index) => (
                  <View key={index} style={styles.requestItem}>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.value}>
                          {requestItem.id}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request Amount:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.amount}>
                          ${requestItem.requestAmount}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request Date:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.date}>
                          {requestItem.requestDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request Status:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.amount}>
                          {requestItem.requestStatus}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Payer:
                        </Text>
                      </View>
                      <View style={styles.payer}>
                        <View>
                          <Image source={requestItem.payer.avatar} style={styles.avatar} />
                        </View>
                        <View>
                          <Text style={styles.value}>
                            {requestItem.payer.name}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.grayView}>
                      <View>
                        <Text style={styles.grayText}>
                          Approval Date:
                        </Text>
                      </View>
                      <View style={styles.approvalView}>
                        <Text style={styles.grayText}>
                          {requestItem.approvalDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.grayView}>
                      <TouchableOpacity style={styles.expandBtn} onPress={this.openModal}>
                        <Text style={styles.blueText}>
                          Expand
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.detailBtn} onPress={this.goPaymentDetail}>
                        <View>
                          <Image source={homeIcon} style={styles.homeIcon} />
                        </View>
                        <Text style={styles.whiteText}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              ))}
              </ScrollView>
            :
              <ScrollView contentContainerStyle={styles.listview}>
                {currentRequests.map((requestItem, index) => (
                  <View key={index} style={styles.requestItem}>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.value}>
                          {requestItem.id}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request Amount:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.amount}>
                          ${requestItem.requestAmount}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request Date:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.date}>
                          {requestItem.requestDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Request Status:
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.amount}>
                          {requestItem.requestStatus}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.contentView}>
                      <View>
                        <Text style={styles.title}>
                          Payer:
                        </Text>
                      </View>
                      <View style={styles.payer}>
                        <View>
                          <Image source={requestItem.payer.avatar} style={styles.avatar} />
                        </View>
                        <View>
                          <Text style={styles.value}>
                            {requestItem.payer.name}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.grayView}>
                      <View>
                        <Text style={styles.grayText}>
                          Approval Date:
                        </Text>
                      </View>
                      <View style={styles.approvalView}>
                        <Text style={styles.grayText}>
                          {requestItem.approvalDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.grayView}>
                      <TouchableOpacity style={styles.expandBtn} onPress={this.openModal}>
                        <Text style={styles.blueText}>
                          Expand
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.detailBtn} onPress={this.goPaymentDetail}>
                        <View>
                          <Image source={homeIcon} style={styles.homeIcon} />
                        </View>
                        <Text style={styles.whiteText}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              ))}
              </ScrollView>
          }
        </View>
        <RequestModal
          isVisible={modalVisible}
          onClose={this.closeModal}
          goPaymentDetail={this.goPaymentDetail}
          requestDetail={pendingRequests}
          style={styles.modalView}
        />
      </View>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    backgroundColor: 'white'
  },
  listview: {
    width: width - dynamicSize(20),
    marginLeft: dynamicSize(10),
    marginTop: dynamicSize(10)
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    marginTop: dynamicSize(20)
  },
  toggleButtonView: {
    backgroundColor: Color.light,
    padding: 4,
    flexDirection: 'row',
    width: dynamicSize(198),
    height: dynamicSize(40)
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  authButton: {
    marginTop: dynamicSize(15)
  },
  requestItem: {
    backgroundColor: '#F9FBFD',
    borderColor: '#E9EFF4',
    borderRadius: dynamicSize(6),
    marginTop: dynamicSize(10),
    paddingBottom: dynamicSize(10)
  },
  contentView: {
    width: width - dynamicSize(40),
    marginLeft: dynamicSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F4',
    flexDirection: 'row',
    height: dynamicSize(60),
    alignItems: 'center'
  },
  title: {
    fontSize: getFontSize(14),
    color: '#000000'
  },
  value: {
    fontSize: getFontSize(16),
    color: '#2B72BF',
    paddingLeft: dynamicSize(10)
  },
  amount: {
    fontSize: getFontSize(14),
    color: '#417505',
    paddingLeft: dynamicSize(10)
  },
  date: {
    fontSize: getFontSize(14),
    color: '#5F5F5F',
    paddingLeft: dynamicSize(10)
  },
  payer: {
    flexDirection: 'row',
    paddingLeft: dynamicSize(10),
    alignItems: 'center'
  },
  avatar: {
    width: dynamicSize(30),
    height: dynamicSize(30),
    borderRadius: dynamicSize(15)
  },
  grayView: {
    width: width - dynamicSize(40),
    marginLeft: dynamicSize(10),
    borderBottomWidth: 0,
    borderBottomColor: '#F1F2F4',
    flexDirection: 'row',
    height: dynamicSize(60),
    alignItems: 'center'
  },
  grayText: {
    fontSize: getFontSize(14),
    color: 'rgba(0, 0, 0, 0.2)',
  },
  approvalView: {
    paddingLeft: dynamicSize(10)
  },
  expandBtn: {
    width: (width - dynamicSize(40)) / 2,
    height: dynamicSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEDEF',
    borderRadius: dynamicSize(6)
  },
  detailBtn: {
    width: (width - dynamicSize(40)) / 2,
    height: dynamicSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1890FF',
    borderRadius: dynamicSize(6),
    marginLeft: dynamicSize(5),
    flexDirection: 'row',
  },
  blueText: {
    fontSize: getFontSize(15),
    color: '#1890FF',
  },
  whiteText: {
    fontSize: getFontSize(15),
    color: '#FFFFFF',
    marginLeft: dynamicSize(10)
  },
  homeIcon: {
    width: dynamicSize(15),
    height: dynamicSize(18)
  }
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, undefined)(PaymentRequest);
